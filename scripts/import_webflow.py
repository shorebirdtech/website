#!/usr/bin/env python3
"""Import the Webflow CMS export (webflow-export/cms/*.json) into the Astro site.

Python 3 stdlib only. Run from anywhere:

    python3 scripts/import_webflow.py [--only blog,stories,data] [--no-download]

What it does (idempotent; safe to re-run):

* Blog posts  -> src/content/blog/<slug>.md
    - Webflow slugs are canonical; drifted repo files are `git mv`-ed.
    - Posts that already exist in the repo keep their hand-written Markdown
      body and local cover; only the frontmatter is regenerated from the CMS.
    - New posts get their HTML body converted to Markdown, body images
      downloaded to src/assets/blog/<slug>/, cover to src/assets/blog/covers/,
      and the share (OG) image to public/blog/og/<slug>.png.
* Success stories -> src/content/success-stories/<slug>.md (same rules).
* Site data -> src/data/{reviews,logos,team}.json with images downloaded to
  src/assets/{testimonials,brands,team}/.
* Author headshots -> src/assets/blog/headshots/ (the `authors` record lives
  in src/layouts/blog.astro and is maintained by hand).

Downloads use `curl -sfL` (urllib fails TLS verification on some machines)
and are skipped when the destination file already exists.
"""

# cSpell:ignore adress campany charrefs ncol srcs allprojects xcodegen xcrun youtu
# cSpell:ignore delated shorbird mutli specifc wasorganizational appy turaround witih miun

from __future__ import annotations

import argparse
import html
import json
import os
import re
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
from urllib.parse import unquote, urlparse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EXPORT = os.path.join(ROOT, 'webflow-export', 'cms')
CONTENT = os.path.join(ROOT, 'src', 'content')
ASSETS = os.path.join(ROOT, 'src', 'assets')
DATA = os.path.join(ROOT, 'src', 'data')
PUBLIC = os.path.join(ROOT, 'public')

WEBFLOW_CDN = 'cdn.prod.website-files.com'

# First line of every body this script converted from CMS HTML. Bodies without
# it are hand-written and are never overwritten.
GENERATED_MARKER = '<!-- Converted from the Webflow CMS export by scripts/import_webflow.py -->'

# Repo slug -> Webflow slug. Webflow is canonical.
BLOG_RENAMES = {
    '1.0': '1',
    'dart-3.5.0': 'dart-3-5-0',
    'flutter-3.32-release': 'flutter-3-32-release',
    'growing': 'shorebird-is-growing',
    'building-great-developer-tools': 'building-good-software',
}

# Webflow author item id -> author key in src/layouts/blog.astro.
AUTHOR_KEYS = {
    '6972466eac5a1d06ea9c83ca': 'eseidel',
    '6972463cc2f76698a24b9d46': 'felangel',
    '6972467e88db469ca8db20d7': 'bryanoltman',
    '6972467768e3644cd83dedda': 'tomarra',
    '697246301f0f668fa84d1f95': 'dawn-ducky',
    '6972462829d7f195142da6f4': 'shorebirdtech',
    '6a8897db2c2e04bcc17a61ab': 'wesleypeck',
    '6a34415cd8e1d6745dc4ee16': 'abhishekdoshi',
    '69fe27888a585749b3957bf6': 'nickweatherley',
    '69af068a6d5ba5dd0ba0f2e5': 'maccarrithers',
    '69a1c652e7477a1536e075e7': 'brandonderosier',
}

# Authors whose headshot already lives in the repo under a different name.
EXISTING_HEADSHOTS = {
    'eseidel': 'eric-headshot.jpeg',
    'felangel': 'felix-headshot.jpeg',
    'bryanoltman': 'bryan-headshot.png',
    'tomarra': 'tom-headshot.jpg',
    'dawn-ducky': 'dawn-headshot.jpg',
    'shorebirdtech': 'shorebird-headshot.png',
}

# The CMS has no `highlights` field for success stories; these are derived
# from the story text for the stories that were authored on Webflow.
STORY_HIGHLIGHTS = {
    'scapia': [
        'Early adopter of Code Push since the 2023 beta, now patching both Android and iOS',
        'Targets patches to specific user cohorts with the Code Push package and Firebase Remote Config',
        'Saved a flash sale by patching a critical stock-availability bug without an app store release',
    ],
    'vetc': [
        "Vietnam's electronic toll collection platform, serving a large user base with financial transactions",
        'Hotfix release times reduced from several days to a few hours',
        'Ships urgent Flutter fixes with Code Push instead of waiting for app store approval',
    ],
}

# Typos that exist in the CMS content itself. They are left as-is (the live
# site has them) and hidden from cspell with an inline directive.
CSPELL_IGNORE = {
    'code-push-makes-your-app-more-secure-not-less': ['delated'],
    'the-next-phase-of-shorebird-ci': ['shorbird'],
    'portability-is-the-new-productivity': ['mutli'],
    'making-the-shorebird-cli-agentic': ['specifc'],
    'portable-software-ai-era': ['wasorganizational'],
    'flutter-web-is-misunderstood': ['appy'],
    'wagus': ['turaround'],
    'solides': ['witih'],
}

# CMS logo names that don't match how the brand is written on the live site.
LOGO_NAME_FIXES = {
    'Jundlegames': 'Junglee Games',
    'DeliveryHero': 'Delivery Hero',
}

# ---------------------------------------------------------------------------
# Small helpers
# ---------------------------------------------------------------------------


def log(*args):
    print(*args, file=sys.stderr)


def load_items(name):
    with open(os.path.join(EXPORT, name + '.json'), encoding='utf-8') as f:
        data = json.load(f)
    return [it for it in data['items'] if not it.get('isArchived')]


def slugify(text):
    text = unquote(text)
    text = re.sub(r'[^A-Za-z0-9]+', '-', text).strip('-').lower()
    return text or 'file'


def url_filename(url, strip_hash=True):
    """Return a clean local filename for a Webflow CDN url."""
    name = unquote(urlparse(url).path.rsplit('/', 1)[-1])
    if strip_hash:
        # Webflow prefixes uploads with a 24-char hex id.
        name = re.sub(r'^[0-9a-f]{24}_', '', name)
    stem, dot, ext = name.rpartition('.')
    if not dot:
        stem, ext = name, ''
    ext = ext.lower()
    if ext == 'jpeg':
        ext = 'jpg'
    return slugify(stem) + ('.' + ext if ext else '')


def url_ext(url):
    ext = urlparse(url).path.rsplit('.', 1)[-1].lower()
    return 'jpg' if ext == 'jpeg' else ext


DOWNLOADS = {}  # dest path -> url


def queue_download(url, dest):
    """Register a download; the file is fetched later in run_downloads()."""
    if os.path.exists(dest):
        return
    existing = DOWNLOADS.get(dest)
    if existing and existing != url:
        raise SystemExit(f'conflicting downloads for {dest}: {existing} vs {url}')
    DOWNLOADS[dest] = url


def run_downloads(enabled=True):
    if not DOWNLOADS:
        return
    if not enabled:
        log(f'skipping {len(DOWNLOADS)} downloads (--no-download)')
        return
    log(f'downloading {len(DOWNLOADS)} files...')

    def fetch(item):
        dest, url = item
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        tmp = dest + '.part'
        r = subprocess.run(['curl', '-sfL', '-o', tmp, url])
        if r.returncode != 0 or not os.path.exists(tmp):
            log(f'  FAILED {url}')
            if os.path.exists(tmp):
                os.remove(tmp)
            return False
        os.replace(tmp, dest)
        return True

    with ThreadPoolExecutor(max_workers=8) as ex:
        results = list(ex.map(fetch, sorted(DOWNLOADS.items())))
    failed = results.count(False)
    log(f'  downloaded {len(results) - failed}, failed {failed}')
    DOWNLOADS.clear()


def git_mv(src, dst):
    subprocess.run(['git', 'mv', src, dst], cwd=ROOT, check=True)


# ---------------------------------------------------------------------------
# YAML frontmatter emission (prettier reformats it afterwards)
# ---------------------------------------------------------------------------

_PLAIN_OK = re.compile(r'^[A-Za-z0-9][A-Za-z0-9 ,.!?()/&+\'’“”‘–—%$-]*$')
_YAML_RESERVED = re.compile(
    r'^(true|false|yes|no|null|~|on|off|[-+]?\d[\d_.]*|0x[0-9a-f]+)$', re.I
)


def yaml_scalar(value):
    if isinstance(value, bool):
        return 'true' if value else 'false'
    if isinstance(value, (int, float)):
        return str(value)
    s = str(value)
    if (
        _PLAIN_OK.match(s)
        and not _YAML_RESERVED.match(s)
        and ': ' not in s
        and ' #' not in s
        and not s.endswith(':')
        and s == s.strip()
    ):
        return s
    return json.dumps(s, ensure_ascii=False)


def frontmatter(fields, raw_blocks=None):
    """fields: list of (key, value); value None/'' is skipped. raw_blocks: list
    of preformatted YAML snippets appended verbatim."""
    lines = ['---']
    for key, value in fields:
        if value is None or value == '':
            continue
        if isinstance(value, list):
            if not value:
                lines.append(f'{key}: []')
            else:
                lines.append(f'{key}:')
                for v in value:
                    lines.append(f'  - {yaml_scalar(v)}')
        else:
            lines.append(f'{key}: {yaml_scalar(value)}')
    for block in raw_blocks or []:
        lines.append(block.rstrip('\n'))
    lines.append('---')
    return '\n'.join(lines) + '\n'


def split_frontmatter(text):
    m = re.match(r'---\n(.*?)\n---\n?', text, re.S)
    if not m:
        raise ValueError('no frontmatter')
    return m.group(1), text[m.end():]


def fm_value(fm, key):
    m = re.search(rf'^{key}:[ \t]*(.*)$', fm, re.M)
    if not m:
        return None
    v = m.group(1).strip()
    if len(v) >= 2 and v[0] == v[-1] and v[0] in '\'"':
        v = v[1:-1]
    return v


def fm_block(fm, key):
    """Return the raw YAML text for `key:` up to the next top-level key."""
    m = re.search(rf'^{key}:.*?(?=^\S|\Z)', fm + '\n', re.M | re.S)
    return m.group(0).rstrip('\n') if m else None


# ---------------------------------------------------------------------------
# HTML -> tree
# ---------------------------------------------------------------------------

VOID = {'img', 'br', 'hr', 'meta', 'link', 'input', 'source', 'wbr'}
BLOCK = {
    'p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'pre',
    'blockquote', 'figure', 'figcaption', 'table', 'thead', 'tbody', 'tr',
    'hr', 'iframe', 'script', 'style', 'section', 'article', 'video',
}


class Node:
    __slots__ = ('tag', 'attrs', 'children')

    def __init__(self, tag, attrs=None):
        self.tag = tag
        self.attrs = attrs or {}
        self.children = []

    def elements(self, tag=None):
        return [c for c in self.children if isinstance(c, Node) and (tag is None or c.tag == tag)]

    def find_all(self, tag):
        out = []
        for c in self.children:
            if isinstance(c, Node):
                if c.tag == tag:
                    out.append(c)
                out.extend(c.find_all(tag))
        return out

    def find(self, tag):
        found = self.find_all(tag)
        return found[0] if found else None

    def text(self):
        out = []
        for c in self.children:
            if isinstance(c, str):
                out.append(c)
            elif c.tag == 'br':
                out.append('\n')
            else:
                out.append(c.text())
        return ''.join(out)

    def classes(self):
        return self.attrs.get('class', '').split()


class TreeBuilder(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node('root')
        self.stack = [self.root]

    def handle_starttag(self, tag, attrs):
        node = Node(tag, {k: (v if v is not None else '') for k, v in attrs})
        self.stack[-1].children.append(node)
        if tag not in VOID:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.stack[-1].children.append(Node(tag, {k: (v if v is not None else '') for k, v in attrs}))

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]
                return

    def handle_data(self, data):
        self.stack[-1].children.append(data)


def parse_html(text):
    p = TreeBuilder()
    p.feed(text)
    p.close()
    return p.root


def to_html(node):
    """Serialize a subtree back to HTML (used for embeds we keep verbatim)."""
    if isinstance(node, str):
        return html.escape(node, quote=False)
    attrs = ''.join(
        f' {k}' if v == '' and k in ('allowfullscreen', 'async', 'defer') else f' {k}="{html.escape(v, quote=True)}"'
        for k, v in node.attrs.items()
    )
    if node.tag in VOID:
        return f'<{node.tag}{attrs}>'
    if node.tag in ('script', 'style'):
        inner = ''.join(c for c in node.children if isinstance(c, str))
    else:
        inner = ''.join(to_html(c) for c in node.children)
    return f'<{node.tag}{attrs}>{inner}</{node.tag}>'


# ---------------------------------------------------------------------------
# Tree -> Markdown
# ---------------------------------------------------------------------------

SHELL_CMDS = (
    'shorebird', 'flutter', 'dart', 'npm', 'npx', 'git', 'curl', 'brew', 'cd',
    'ls', 'pod', 'xcodebuild', 'gradle', 'export', 'sudo', 'yarn', 'pip',
    'mkdir', 'rm', 'cp', 'mv', 'cat', 'echo', 'adb', 'xcrun', 'open', 'claude',
    'codex', 'gemini', 'copilot', 'cargo', 'make', 'sh', 'bash', 'shorebird_ci',
    'gradlew', 'xcodegen', 'fastlane', 'ruby', 'python', 'python3', 'node', 'deno',
)


def guess_language(code):
    s = code.strip()
    first = s.splitlines()[0] if s else ''
    if re.match(r'^(\$ |> )?(' + '|'.join(SHELL_CMDS) + r')\b', first) or re.match(r'^(\$ )?(\./|~/)', first):
        return 'sh'
    lines = [l for l in s.splitlines() if l.strip()]
    if lines and all(re.match(r'^\s*(-\s+)?[\w.-]+:(\s.*)?$', l) or re.match(r'^\s*(-\s+\S|#)', l) for l in lines):
        return 'yaml'
    if re.search(r'^\s*(import \'package:|void main\(|class \w+ extends|Widget build\(|@override|final \w+ = |await |Future<)', s, re.M):
        return 'dart'
    if s.startswith('{') and s.endswith('}') and '":' in s:
        return 'json'
    if re.search(r'^(android|dependencies|plugins|allprojects|dependencyLocking)\s*\{', s, re.M) or 'compileSdk' in s:
        return 'groovy'
    if re.search(r'^\[?[\w-]+\]?\s*=\s*', s, re.M) and not re.search(r'^\s*[\w-]+:\s', s, re.M):
        return 'toml' if re.search(r'^\[', s, re.M) else ''
    if re.search(r'^[\w-]+:\s*(\S.*)?$', first) and re.search(r'^\s+[\w-]+:', s, re.M):
        return 'yaml'
    if re.search(r'<[a-zA-Z][^>]*>', s) and re.search(r'</[a-zA-Z]+>', s):
        return 'xml' if s.lstrip().startswith('<?xml') or '<manifest' in s or '<key>' in s else 'html'
    if s.startswith('[') and s.endswith(']'):
        return 'json'
    if re.match(r'^\[(WARN|INFO|ERROR|DEBUG)\]', s):
        return ''
    return ''


def collapse_ws(text):
    return re.sub(r'[ \t\r\n\f\v\xa0]+', ' ', text.replace('‍', '').replace('​', ''))


_ESCAPE_INLINE = re.compile(r'([\\*_`\[\]])')
_ESCAPE_LT = re.compile(r'<(?=[A-Za-z/!])')
_ESCAPE_ENTITY = re.compile(r'&(?=[A-Za-z#][\w]*;)')


def escape_text(text):
    text = _ESCAPE_INLINE.sub(r'\\\1', text)
    text = _ESCAPE_LT.sub(r'\\<', text)
    text = _ESCAPE_ENTITY.sub('&amp;', text)
    return text


def escape_block_start(text):
    """Escape characters that would turn a paragraph into a heading/list/quote."""
    return re.sub(r'^(\s*)([#>+-]|\d+[.)])(?=\s)', lambda m: m.group(1) + '\\' + m.group(2), text)


def wrap_inline(inner, marker):
    m = re.match(r'^(\s*)(.*?)(\s*)$', inner, re.S)
    lead, core, trail = m.groups()
    if not core:
        return inner
    if core.startswith(marker) and core.endswith(marker) and len(core) > 2 * len(marker):
        return inner  # already wrapped (nested strong in strong etc.)
    return f'{lead}{marker}{core}{marker}{trail}'


def code_span(text):
    text = text.replace('‍', '').strip().replace('\n', ' ')
    if not text:
        return ''
    fence = '`'
    while fence in text:
        fence += '`'
    pad = ' ' if (text.startswith('`') or text.endswith('`')) else ''
    return f'{fence}{pad}{text}{pad}{fence}'


class MarkdownRenderer:
    def __init__(self, resolve_image, code_fallback=None):
        # resolve_image(url) -> local/markdown path for the image src.
        self.resolve_image = resolve_image
        # (language, code) pairs used to fill empty <pre> elements in order.
        self.code_fallback = list(code_fallback or [])
        self.warnings = []

    # -- entry -------------------------------------------------------------
    def render(self, root):
        blocks = [b.strip('\n') for b in self.blocks(root) if b and b.strip()]
        # Webflow sometimes leaves a text-only copy of a table right after the
        # table embed (cells concatenated into one paragraph). Drop those.
        cleaned = []
        for b in blocks:
            if cleaned and cleaned[-1].startswith('| ') and not b.startswith(('|', '#', '<', '```', '![', '- ')):
                header = cleaned[-1].split('\n', 1)[0]
                key = re.sub(r'\s+', '', ''.join(header.strip('|').split('|'))).lower()
                if key and re.sub(r'\s+', '', b).lower().startswith(key):
                    self.warnings.append('dropped pasted table text: ' + b[:40])
                    continue
            cleaned.append(b)
        if self.code_fallback:
            self.warnings.append(f'{len(self.code_fallback)} unused live code blocks')
        out = '\n\n'.join(cleaned)
        out = re.sub(r'\n{3,}', '\n\n', out)
        return out.strip() + '\n'

    # -- block level -------------------------------------------------------
    def blocks(self, node):
        out = []
        inline_buf = []

        def flush():
            if inline_buf:
                text = self.inline_nodes(inline_buf).strip()
                if text:
                    out.append(escape_block_start(text))
                inline_buf.clear()

        for child in node.children:
            if isinstance(child, Node) and child.tag in BLOCK:
                flush()
                out.extend(self.block(child))
            else:
                inline_buf.append(child)
        flush()
        return out

    def block(self, node):
        tag = node.tag
        if tag == 'p':
            imgs = node.elements('img')
            if imgs and not collapse_ws(node.text()).strip() and len(node.elements()) == len(imgs):
                return [self.image(img) for img in imgs]
            kids = node.elements()
            if len(kids) == 1 and kids[0].tag == 'code' and not collapse_ws(
                ''.join(c for c in node.children if isinstance(c, str))
            ).strip():
                code = kids[0].text().replace('‍', '').strip()
                if '\n' in code:
                    return [self.code_block(kids[0])]
            text = self.inline(node).strip()
            return [escape_block_start(text)] if text else []
        if tag in ('h1', 'h2', 'h3', 'h4', 'h5', 'h6'):
            text = self.inline(node, plain=True).strip()
            return [f'{"#" * int(tag[1])} {text}'] if text else []
        if tag == 'pre':
            return [self.code_block(node)]
        if tag in ('ul', 'ol'):
            return [self.list_block(node)]
        if tag == 'blockquote':
            if 'twitter-tweet' in node.classes():
                return [to_html(node)]
            inner = '\n\n'.join(self.blocks(node))
            return ['\n'.join(('> ' + line) if line else '>' for line in inner.split('\n'))]
        if tag == 'figure':
            return self.figure(node)
        if tag == 'hr':
            return ['---']
        if tag == 'table':
            return [self.table(node)]
        if tag == 'iframe':
            return [self.iframe(node)]
        if tag == 'script':
            return [to_html(node)]
        if tag == 'style':
            return []
        if tag == 'div':
            if node.attrs.get('data-rt-embed-type'):
                return self.embed(node)
            return self.blocks(node)
        if tag in ('figcaption', 'li', 'thead', 'tbody', 'tr', 'section', 'article', 'video'):
            return self.blocks(node)
        return self.blocks(node)

    def embed(self, node):
        out = []
        for child in node.children:
            if isinstance(child, str):
                if child.strip():
                    out.append(escape_text(collapse_ws(child)).strip())
                continue
            table = child if child.tag == 'table' else None
            if table is None and child.tag == 'div':
                inner = child.elements()
                if len(inner) == 1 and inner[0].tag == 'table':
                    table = inner[0]
            if table is not None:
                out.append(self.table(table))
            elif child.tag == 'iframe':
                out.append(self.iframe(child))
            elif child.tag == 'style':
                continue
            else:
                out.append(to_html(child))
        return out

    def figure(self, node):
        out = []
        img = node.find('img')
        iframe = node.find('iframe')
        if img is not None:
            out.append(self.image(img))
        elif iframe is not None:
            out.append(self.iframe(iframe))
        cap = node.find('figcaption')
        if cap is not None:
            text = self.inline(cap).strip()
            if text:
                out.append(f'_{text}_')
        return out

    def iframe(self, node):
        src = node.attrs.get('src', '')
        title = node.attrs.get('title', '')
        if 'youtube.com' in src or 'youtu.be' in src:
            # Match the convention used by hand-written posts in this repo.
            title = title or 'YouTube video player'
            return (
                '<div style="display:flex;justify-content:center">\n'
                f'  <iframe style="aspect-ratio:16/9;width:100%;margin-inline:auto;margin-bottom:1em" '
                f'src="{html.escape(src, quote=True)}" title="{html.escape(title, quote=True)}" '
                'frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; '
                'gyroscope; picture-in-picture; web-share" '
                'referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>\n'
                '</div>'
            )
        return to_html(node)

    def image(self, node):
        src = node.attrs.get('src', '')
        alt = node.attrs.get('alt', '')
        if alt.startswith('__wf_'):
            alt = ''
        alt = escape_text(collapse_ws(alt)).strip()
        return f'![{alt}]({self.resolve_image(src)})'

    def code_block(self, node):
        code = node.find('code') if node.tag != 'code' else node
        text = (code if code is not None else node).text()
        text = text.replace('‍', '').replace('\xa0', ' ').strip('\n')
        hint = ''
        cls = (code.classes() if code is not None else []) + node.classes()
        for c in cls:
            if c.startswith('language-'):
                hint = c[len('language-'):]
        if not text.strip():
            # The CMS API drops the contents of rich-text code blocks; fill
            # them from the rendered live page when we have it.
            if self.code_fallback:
                hint, text = self.code_fallback.pop(0)
            else:
                self.warnings.append('empty code block with no fallback')
                return ''
        lang = guess_language(text) or hint
        fence = '```'
        while fence in text:
            fence += '`'
        return f'{fence}{lang}\n{text}\n{fence}'

    def list_block(self, node, depth=0):
        ordered = node.tag == 'ol'
        try:
            start = int(node.attrs.get('start', '1'))
        except ValueError:
            start = 1
        lines = []
        for i, li in enumerate(node.elements('li')):
            marker = f'{start + i}.' if ordered else '-'
            pad = ' ' * (len(marker) + 1)
            inline_buf = []
            parts = []  # list of (kind, text)

            def flush():
                if inline_buf:
                    text = self.inline_nodes(inline_buf).strip()
                    if text:
                        parts.append(text)
                    inline_buf.clear()

            for c in li.children:
                if isinstance(c, Node) and c.tag in ('ul', 'ol'):
                    flush()
                    parts.append(self.list_block(c, depth + 1))
                elif isinstance(c, Node) and c.tag in BLOCK:
                    flush()
                    parts.extend(self.block(c))
                else:
                    inline_buf.append(c)
            flush()
            if not parts:
                parts = ['']
            # Nested lists directly follow their parent item without a blank line.
            body = '\n'.join(parts)
            first, _, rest = body.partition('\n')
            item = f'{marker} {first}'
            if rest:
                item += '\n' + '\n'.join((pad + l) if l else '' for l in rest.split('\n'))
            lines.append(item)
        return '\n'.join(lines)

    def table(self, node):
        rows = []
        for tr in node.find_all('tr'):
            cells = [c for c in tr.elements() if c.tag in ('td', 'th')]
            if not cells:
                continue
            rows.append([self.cell(c) for c in cells])
        if not rows:
            return ''
        ncol = max(len(r) for r in rows)
        rows = [r + [''] * (ncol - len(r)) for r in rows]
        header, body = rows[0], rows[1:]
        lines = ['| ' + ' | '.join(header) + ' |', '| ' + ' | '.join(['---'] * ncol) + ' |']
        for r in body:
            lines.append('| ' + ' | '.join(r) + ' |')
        return '\n'.join(lines)

    def cell(self, node):
        text = self.inline(node).replace('\n', ' ')
        text = re.sub(r' {2,}', ' ', text).strip()
        return text.replace('|', '\\|')

    # -- inline level ------------------------------------------------------
    def inline(self, node, plain=False):
        return self.inline_nodes(node.children, plain)

    def inline_nodes(self, nodes, plain=False):
        parts = []
        for c in nodes:
            parts.append(self.inline_node(c, plain))
        text = ''.join(parts)
        # Collapse runs of spaces created by joining adjacent text nodes.
        text = re.sub(r'(?<! ) {2,}', ' ', text)
        # <br> is rendered as a hard break ("\\\n"). Two or more in a row are
        # really a paragraph break, and breaks at the edges are noise.
        text = re.sub(r'(?: *\\\n *){2,}', '\n\n', text)
        text = re.sub(r'^(?:\s*\\\n)+|(?:\\\n\s*)+$', '', text)
        text = re.sub(r'\\\n *\n', '\n\n', text)
        text = re.sub(r'\n *\\\n', '\n\n', text)
        if plain:
            text = text.replace('\\\n', ' ').replace('\n', ' ')
        # A continuation line must not look like a list item or heading.
        lines = text.split('\n')
        text = '\n'.join(lines[:1] + [escape_block_start(l) for l in lines[1:]])
        return text.strip(' ')

    def inline_node(self, c, plain=False):
        if isinstance(c, str):
            return escape_text(collapse_ws(c))
        tag = c.tag
        if tag in ('strong', 'b'):
            inner = self.inline(c, plain)
            return inner if plain else wrap_inline(inner, '**')
        if tag in ('em', 'i'):
            inner = self.inline(c, plain)
            return inner if plain else wrap_inline(inner, '_')
        if tag == 'code':
            return code_span(c.text())
        if tag == 'a':
            href = c.attrs.get('href', '').strip()
            inner = self.inline(c, plain)
            if not inner.strip():
                return ''
            if not href:
                return inner
            m = re.match(r'^(\s*)(.*?)(\s*)$', inner, re.S)
            lead, core, trail = m.groups()
            href = href.replace(' ', '%20').replace(')', '%29')
            return f'{lead}[{core}]({href}){trail}'
        if tag == 'br':
            return '\\\n'
        if tag == 'img':
            return self.image(c)
        if tag in ('script', 'style'):
            return ''
        if tag in ('p', 'div') or tag in BLOCK:
            # Block element inside an inline context (e.g. <p> inside <a>).
            inner = self.inline(c, plain)
            return '\n' + inner.strip() + '\n'
        return self.inline(c, plain)


def html_to_markdown(html_text, resolve_image, code_fallback=None, name=''):
    renderer = MarkdownRenderer(resolve_image, code_fallback)
    md = renderer.render(parse_html(html_text))
    for w in renderer.warnings:
        log(f'  {name}: {w}')
    return md


def live_code_blocks(kind, slug):
    """Code blocks from the rendered live page saved as
    webflow-export/pages/<kind>__<slug>.html (the CMS API exports rich-text
    code blocks as empty <pre></pre>). Returns [(language, code), ...]."""
    path = os.path.join(ROOT, 'webflow-export', 'pages', f'{kind}__{slug}.html')
    if not os.path.exists(path):
        return []
    with open(path, encoding='utf-8') as f:
        page = f.read()
    out = []
    for m in re.finditer(r'<pre[^>]*class="w-code-block"[^>]*>(.*?)</pre>', page, re.S):
        lang = re.search(r'language-([\w+-]+)', m.group(1))
        code = html.unescape(re.sub(r'<[^>]+>', '', m.group(1)))
        out.append((lang.group(1) if lang else '', code))
    return out


def make_image_resolver(slug, asset_dir, md_prefix):
    """Download CDN images into asset_dir and rewrite srcs to relative paths."""
    used = {}

    def resolve(url):
        if WEBFLOW_CDN not in url:
            return url
        name = url_filename(url)
        if used.get(name, url) != url:
            # Two different files with the same clean name: keep them apart.
            stem, dot, ext = name.rpartition('.')
            suffix = re.sub(r'[^0-9a-f]', '', urlparse(url).path.rsplit('/', 1)[-1][:24])[-6:]
            name = f'{stem}-{suffix}.{ext}' if dot else f'{name}-{suffix}'
        used[name] = url
        queue_download(url, os.path.join(asset_dir, name))
        return f'{md_prefix}/{name}'

    return resolve


def strip_leading_title(md, title):
    """Drop a leading `# Title` heading; the layouts render the title."""
    m = re.match(r'# (.+)\n\n', md)
    if m and re.sub(r'\W+', '', m.group(1)).lower() == re.sub(r'\W+', '', title).lower():
        return md[m.end():]
    return md


def normalize_reading_time(value):
    """CMS values look like "6 min read" / "2 minute read" / "5 miun"."""
    m = re.search(r'\d+', value or '')
    return f'{m.group(0)} min read' if m else None


def with_cspell_ignore(slug, body):
    words = CSPELL_IGNORE.get(slug)
    if not words:
        return body
    directive = f'<!-- cSpell:ignore {" ".join(words)} -->'
    if directive in body:
        return body
    body = re.sub(r'<!-- cSpell:ignore [^>]*-->\n\n?', '', body, count=1)
    return directive + '\n\n' + body.lstrip('\n')


def date_only(value):
    return (value or '')[:10] or None


# ---------------------------------------------------------------------------
# Blog
# ---------------------------------------------------------------------------


def import_blog():
    blog_dir = os.path.join(CONTENT, 'blog')
    covers_dir = os.path.join(ASSETS, 'blog', 'covers')
    og_dir = os.path.join(PUBLIC, 'blog', 'og')

    # Rename drifted repo files to the Webflow slug (idempotent).
    for old, new in BLOG_RENAMES.items():
        old_path = os.path.join(blog_dir, old + '.md')
        new_path = os.path.join(blog_dir, new + '.md')
        if os.path.exists(old_path) and not os.path.exists(new_path):
            log(f'git mv blog/{old}.md -> blog/{new}.md')
            git_mv(old_path, new_path)

    items = load_items('blogs')
    stats = {'kept': 0, 'converted': 0}
    for it in items:
        fd = it['fieldData']
        slug = fd['slug']
        path = os.path.join(blog_dir, slug + '.md')
        author = AUTHOR_KEYS.get(fd.get('author-2'))
        if not author:
            raise SystemExit(f'unknown author id {fd.get("author-2")} on {slug}')

        existing_body = None
        cover = None
        if os.path.exists(path):
            with open(path, encoding='utf-8') as f:
                fm, body = split_frontmatter(f.read())
            cover = fm_value(fm, 'cover')
            if GENERATED_MARKER not in body:
                existing_body = body

        cover_url = (fd.get('featured-image') or {}).get('url')
        if not cover or not os.path.exists(os.path.join(covers_dir, cover)):
            if cover_url:
                cover = f'{slug}.{url_ext(cover_url)}'
                queue_download(cover_url, os.path.join(covers_dir, cover))

        og_url = (fd.get('shared-image') or {}).get('url')
        og_image = None
        if og_url:
            og_name = f'{slug}.{url_ext(og_url)}'
            queue_download(og_url, os.path.join(og_dir, og_name))
            og_image = f'/blog/og/{og_name}'

        generated = existing_body is None
        if generated:
            resolver = make_image_resolver(
                slug, os.path.join(ASSETS, 'blog', slug), f'../../assets/blog/{slug}'
            )
            body = html_to_markdown(
                fd.get('content') or '', resolver, live_code_blocks('blog', slug), name=slug
            )
            body = GENERATED_MARKER + '\n\n' + strip_leading_title(body, fd['name'])
            stats['converted'] += 1
        else:
            body = existing_body
            stats['kept'] += 1

        fields = [
            ('title', fd['name'].strip()),
            ('author', author),
            ('description', (fd.get('excerpt') or fd.get('article-intro') or '').strip()),
            ('date', date_only(fd.get('publish-date'))),
            ('cover', cover),
            ('intro', (fd.get('article-intro') or '').strip()),
            ('readingTime', normalize_reading_time(fd.get('reading-time'))),
            ('ogImage', og_image),
            ('seoTitle', (fd.get('seo---title') or '').strip()),
            ('seoDescription', (fd.get('seo---meta-description') or '').strip()),
            ('highlight', True if fd.get('highlight-article') else None),
        ]
        body = with_cspell_ignore(slug, body)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(frontmatter(fields) + '\n' + body.lstrip('\n'))
    log(f'blog: {len(items)} posts ({stats["kept"]} kept bodies, {stats["converted"]} converted)')


# ---------------------------------------------------------------------------
# Success stories
# ---------------------------------------------------------------------------


def import_success_stories():
    dir_ = os.path.join(CONTENT, 'success-stories')
    covers_dir = os.path.join(ASSETS, 'success-stories', 'covers')
    items = load_items('success-stories')
    stats = {'kept': 0, 'converted': 0}
    for it in items:
        fd = it['fieldData']
        slug = fd['slug']
        path = os.path.join(dir_, slug + '.md')
        if not os.path.exists(path) and os.path.exists(os.path.join(dir_, slug + '.mdx')):
            path = os.path.join(dir_, slug + '.mdx')

        existing_body = None
        cover = None
        highlights_block = None
        if os.path.exists(path):
            with open(path, encoding='utf-8') as f:
                fm, body = split_frontmatter(f.read())
            cover = fm_value(fm, 'cover')
            highlights_block = fm_block(fm, 'highlights')
            if GENERATED_MARKER not in body:
                existing_body = body

        cover_url = (fd.get('featured-image') or {}).get('url')
        if not cover or not os.path.exists(os.path.join(covers_dir, cover)):
            if cover_url:
                cover = f'{slug}-cover.{url_ext(cover_url)}'
                queue_download(cover_url, os.path.join(covers_dir, cover))

        generated = existing_body is None
        if generated:
            resolver = make_image_resolver(
                slug,
                os.path.join(ASSETS, 'success-stories', slug),
                f'../../assets/success-stories/{slug}',
            )
            body = html_to_markdown(
                fd.get('content') or '', resolver, live_code_blocks('success-stories', slug), name=slug
            )
            body = GENERATED_MARKER + '\n\n' + strip_leading_title(body, fd['name'])
            stats['converted'] += 1
        else:
            body = existing_body
            stats['kept'] += 1

        website = (fd.get('website-url-adress') or '').strip()
        if not website:
            raw = (fd.get('website-url') or '').strip()
            website = raw if raw.startswith('http') else ''

        fields = [
            ('title', fd['name'].strip()),
            ('description', (fd.get('summary') or fd.get('customer-story-intro') or '').strip()),
            ('date', date_only(fd.get('publish-date'))),
            ('cover', cover),
            ('industry', (fd.get('industry') or '').strip()),
            ('companySize', (fd.get('company-size') or '').strip()),
            ('website', website),
            ('intro', (fd.get('customer-story-intro') or '').strip()),
            ('seoTitle', (fd.get('seo---title') or '').strip()),
            ('seoDescription', (fd.get('seo---meta-description') or '').strip()),
        ]
        raw_blocks = []
        if highlights_block and not generated:
            raw_blocks.append(highlights_block)
        else:
            fields.append(('highlights', STORY_HIGHLIGHTS.get(slug, [])))
        body = with_cspell_ignore(slug, body)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(frontmatter(fields, raw_blocks) + '\n' + body.lstrip('\n'))
    log(f'success stories: {len(items)} ({stats["kept"]} kept bodies, {stats["converted"]} converted)')


# ---------------------------------------------------------------------------
# Site data (reviews, logos, team) + author headshots
# ---------------------------------------------------------------------------


def asset_path(dir_name, filename):
    return f'/src/assets/{dir_name}/{filename}'


def find_existing(dir_, stem):
    if not os.path.isdir(dir_):
        return None
    for name in sorted(os.listdir(dir_)):
        if name.rsplit('.', 1)[0] == stem:
            return name
    return None


def write_json(name, data):
    os.makedirs(DATA, exist_ok=True)
    path = os.path.join(DATA, name)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write('\n')
    log(f'wrote src/data/{name} ({len(data)} entries)')


def image_asset(image, dir_name, stem):
    """Queue a CMS image for download into src/assets/<dir_name>/<stem>.<ext>
    (skipped if already present) and return its /src path."""
    dir_ = os.path.join(ASSETS, dir_name)
    url = (image or {}).get('url')
    if not url:
        return None
    name = f'{stem}.{url_ext(url)}'
    queue_download(url, os.path.join(dir_, name))
    return asset_path(dir_name, name)


def import_reviews():
    out = []
    for it in load_items('reviews'):
        fd = it['fieldData']
        role = (fd.get('role') or '').strip()
        # "Head of Engineering, Mobile at Kijiji" / "Engineer, Codemagic" -> company.
        company = None
        m = re.search(r'\bat\s+([^,]+)$', role) or re.search(r',\s*([^,]+)$', role)
        if m:
            company = m.group(1).strip()
        else:
            # Fall back to the company logo name ("chai.svg" is a placeholder).
            logo_stem = url_filename((fd.get('campany-logo') or {}).get('url', '')).rsplit('.', 1)[0]
            company = {'flame': 'Flame', 'pushpress': 'PushPress'}.get(logo_stem)
        out.append(
            {
                'slug': fd['slug'],
                'name': fd['name'].strip(),
                'role': role,
                'company': company,
                'quote': (fd.get('review') or '').strip(),
                'avatar': image_asset(fd.get('profile-picture'), 'testimonials', fd['slug']),
                'logo': image_asset(fd.get('campany-logo'), 'testimonials/logos', url_filename((fd.get('campany-logo') or {}).get('url', '')).rsplit('.', 1)[0]),
            }
        )
    write_json('reviews.json', out)


def import_logos():
    out = []
    for it in load_items('logos'):
        fd = it['fieldData']
        name = LOGO_NAME_FIXES.get(fd['name'].strip(), fd['name'].strip())
        out.append(
            {
                'slug': fd['slug'],
                'name': name,
                'logo': image_asset(fd.get('logo'), 'brands', fd['slug']),
            }
        )
    # The live homepage marquee also shows PushPress, which is not in the CMS
    # logo collection; reuse the logo that already lives in the repo.
    if not any(l['slug'] == 'pushpress' for l in out):
        existing = find_existing(os.path.join(ASSETS, 'brands'), 'pushpress')
        if existing:
            out.append({'slug': 'pushpress', 'name': 'PushPress', 'logo': asset_path('brands', existing)})
    write_json('logos.json', out)


def import_team():
    out = []
    for it in load_items('teams'):
        fd = it['fieldData']
        if fd['slug'] == 'you':
            continue  # placeholder "join us" card; the about page renders its own
        out.append(
            {
                'slug': fd['slug'],
                'name': fd['name'].strip(),
                'role': (fd.get('role') or '').strip(),
                'headshot': image_asset(fd.get('profile-photo'), 'team', fd['slug']),
                'linkedin': fd.get('linkedin-url') or None,
                'linkedinLabel': (fd.get('linkedin-aria-label') or '').strip() or None,
                'order': fd.get('order'),
                'draft': bool(it.get('isDraft')),
            }
        )
    out.sort(key=lambda t: (t['order'] is None, t['order'] or 0, t['name']))
    write_json('team.json', out)


def import_author_headshots():
    dir_ = os.path.join(ASSETS, 'blog', 'headshots')
    for it in load_items('authors'):
        fd = it['fieldData']
        key = AUTHOR_KEYS.get(it['id'])
        if not key:
            log(f'  unmapped author {it["id"]} ({fd.get("name")})')
            continue
        if key in EXISTING_HEADSHOTS or find_existing(dir_, key):
            continue
        url = (fd.get('image') or {}).get('url')
        if url:
            queue_download(url, os.path.join(dir_, f'{key}.{url_ext(url)}'))
    log('author headshots queued; author records live in src/layouts/blog.astro')


# ---------------------------------------------------------------------------


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--only', default='blog,stories,data', help='comma list of: blog, stories, data')
    ap.add_argument('--no-download', action='store_true', help='skip image downloads')
    args = ap.parse_args()
    only = set(args.only.split(','))

    if 'blog' in only:
        import_blog()
        import_author_headshots()
    if 'stories' in only:
        import_success_stories()
    if 'data' in only:
        import_reviews()
        import_logos()
        import_team()
    run_downloads(enabled=not args.no_download)


if __name__ == '__main__':
    main()
