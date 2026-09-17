#!/usr/bin/env python3
"""Crawl the built site in `dist/` for broken internal links and assets.

Usage: `npm run build && python3 scripts/check_links.py [dist]`

Walks every `*.html` file, extracts `href`/`src`/`srcset` from `a`, `img`,
`source`, `link`, `script`, `iframe`, `video` and `meta` (og:image) tags,
and reports any same-site URL that does not resolve to a file in `dist/`.
Trailing slashes, `index.html`, query strings and fragments are handled.
Exits non-zero if anything is broken. Stdlib only.
"""

import os
import re
import sys
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote

SITE_HOSTS = {"shorebird.dev", "www.shorebird.dev"}
TAGS = {"a", "img", "source", "link", "script", "iframe", "video", "meta"}


class RefParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []  # (tag, attr, value)

    def handle_starttag(self, tag, attrs):
        if tag not in TAGS:
            return
        attrs = dict(attrs)
        if tag == "meta":
            prop = attrs.get("property") or attrs.get("name") or ""
            if prop in ("og:image", "twitter:image") and attrs.get("content"):
                self.refs.append((tag, prop, attrs["content"]))
            return
        for attr in ("href", "src"):
            if attrs.get(attr):
                self.refs.append((tag, attr, attrs[attr]))
        if attrs.get("srcset"):
            for part in attrs["srcset"].split(","):
                url = part.strip().split(" ")[0]
                if url:
                    self.refs.append((tag, "srcset", url))


def resolve(dist, page_dir, url):
    """Return the filesystem path a URL resolves to, or None if external."""
    parts = urlsplit(url)
    if parts.scheme in ("mailto", "tel", "javascript", "data"):
        return None
    if parts.scheme or parts.netloc:
        if parts.netloc not in SITE_HOSTS:
            return None
    path = unquote(parts.path)
    if not path:
        return None  # pure fragment / query on the same page
    if path.startswith("/"):
        fs = os.path.join(dist, path.lstrip("/"))
    else:
        fs = os.path.normpath(os.path.join(page_dir, path))
    return fs


def exists(fs):
    if os.path.isfile(fs):
        return True
    if os.path.isdir(fs) and os.path.isfile(os.path.join(fs, "index.html")):
        return True
    # `/foo` served as `/foo/index.html` or `/foo.html`
    if os.path.isfile(fs.rstrip("/") + ".html"):
        return True
    return False


def main(dist="dist"):
    if not os.path.isdir(dist):
        print(f"{dist}/ not found; run `npm run build` first", file=sys.stderr)
        return 2
    broken = {}
    pages = 0
    for root, _dirs, files in os.walk(dist):
        for name in files:
            if not name.endswith(".html"):
                continue
            pages += 1
            page = os.path.join(root, name)
            with open(page, encoding="utf-8", errors="replace") as f:
                html = f.read()
            parser = RefParser()
            parser.feed(html)
            for tag, attr, url in parser.refs:
                fs = resolve(dist, root, url)
                if fs is None or exists(fs):
                    continue
                rel = os.path.relpath(page, dist)
                broken.setdefault(url, set()).add(f"{rel} <{tag} {attr}>")
    if broken:
        print(f"Checked {pages} pages; {len(broken)} broken internal reference(s):")
        for url in sorted(broken):
            print(f"  {url}")
            for where in sorted(broken[url])[:5]:
                print(f"      in {where}")
            if len(broken[url]) > 5:
                print(f"      ... and {len(broken[url]) - 5} more")
        return 1
    print(f"Checked {pages} pages; no broken internal references.")
    return 0


if __name__ == "__main__":
    sys.exit(main(*sys.argv[1:2]))
