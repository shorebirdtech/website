---
title: Making the Shorebird CLI agentic
author: nickweatherley
description:
  'Shorebird CLI Is now agent-friendly: JSON Output, Read Commands &
  Non-Interactive Mode'
date: 2026-05-08
cover: making-the-shorebird-cli-agentic.png
intro:
  'Shorebird CLI Is now agent-friendly: JSON Output, Read Commands &
  Non-Interactive Mode'
readingTime: 3 min read
ogImage: '/blog/og/making-the-shorebird-cli-agentic.png'
seoTitle: The Shorebird CLI Is Now Built for AI Coding Agents
seoDescription:
  The Shorebird CLI now supports JSON output, read commands, and non-interactive
  mode, built to work with Claude Code, Cursor, and Codex.
---

<!-- cSpell:ignore specifc -->

<!-- Converted from the Webflow CMS export by scripts/import_webflow.py -->

We handed an agent the Shorebird CLI and watched it struggle. Then we got to
work closing the gap between what the Shorebird CLI does and what an agent could
actually drive end-to-end. The build-and-ship commands already worked. What was
missing was the layer around them: read commands so an agent can observe state,
structured output so it doesn't have to scrape tables, and non-interactive mode
so it doesn't hang on a prompt that's never coming. Whatever your preferred
agent: Claude Code, Cursor, Codex, a CI script, or something else the Shorebird
CLI is now more agent-friendly.

## Why we cared

Shorebird's whole reason to exist is shortening the loop between code change and
shipped change. Increasingly, the hands closing that loop belong to an agent. A
CLI those agents can't drive is friction in the part of the loop we're supposed
to be making faster. We wanted to know how Shorebird felt from inside an agent
so we ran a smoke test. We handed an agent nothing but `shorebird` on PATH,
asked it to ship a Flutter app, patch it and looked for where the friction was.

A few things became obvious fast.

**Agents reach for the CLI, not the API.** Given a choice between
`shorebird release` and crafting authenticated HTTP calls, agents picked the CLI
every time. When a CLI command was missing they fell back to `curl`, then got
stuck on auth and wandered off.

**The CLI was a build-and-deploy tool, nothing else.** You could create a
release, but you couldn't list releases. You could push a patch, but you
couldn't see your patches. You could log in, but you couldn't ask who you were
logged in as. Humans had been working around this by alt-tabbing to the console.
Hand the same CLI to an agent and the gaps light up in five minutes. An agent
that can't observe state, it can't reason about it. The honest read on this work
is that it's CLI hygiene we should have done anyway. The agentic exercise made
it obvious which gaps to fill first.

**Output was for humans only.** Zero commands had `--json`. Progress spinners
and ANSI escapes leaked into captured output. Errors came back as prose. Agents
burned valuable context parsing tables and guessing at field names.

**Prompts hung forever.** TTY detection was implicit and inconsistent. An agent
invoking `shorebird patches set-track` in a non-interactive shell would just sit
there waiting for a keystroke that was never coming.

## What we shipped

Our initial thought was to make Shorebird more agent friendly via the OpenAPI
spec. We quickly realized that only covered the fallback and scripting use cases
and not the agents preference of working with the CLI. We decided to take a
two-pronged approach. CLI for agents, API for scripts and clients that don't
want a Dart toolchain. Both surfaces matter. Eric landed bearer auth in the
spec, header docs, and unblocked `/openapi.{yaml,json}` for unauthenticated
discovery. We simultaneously worked on shipping a bunch of small, focused PRs on
the CLI.

**Non-interactive mode that actually fails fast.** The CLI now detects when
stdin is not a TTY and refuses to prompt. It errors with a clear hint instead of
hanging. Static progress, ANSI suppression, and clean stdout/stderr routing fall
out of the same code path. If you're piping into `jq`, only the JSON ends up on
stdout.

**`--json` on the agentic critical path.** It’s now straightforward for agents
to consume Shorebird commands without parsing human-readable text.
`releases list`, `releases info`, `patches list`, `patches info`,
`patches set-track`, `account`, and `account apps` all support `--json` with a
consistent envelope. Errors in `--json` mode come back as JSON error envelopes
too, including parse-time failures, so an agent never has to choose between two
output shapes.

**Read commands that didn't exist before.** There are questions an agent needs
to answer before it does anything destructive. New read commands provide those
answers.

| **Command**             | **What it answers**                    |
| ----------------------- | -------------------------------------- |
| shorebird account       | Who am I and what orgs do I belong to  |
| shorebird account apps  | What apps does my org own              |
| shorebird releases list | What have we shipped                   |
| shorebird releases info | Details on a specific release          |
| shorebird patches list  | What patches has this release received |
| shorebird patches info  | Details on a specifc patch             |

**Help text and input validation tuned for agents.** The PR title says it best:
"improve help text and add input validation for agentic use." Agents reading
`--help`output need accurate, complete descriptions to invoke commands
correctly. We fixed what was vague, missing or incorrect making it obvious what
to fix from the error message rather than from a stack trace.

## How it feels now

We re-ran the smoke tests and end-to-end the agent could create an app, ship a
release, promote between tracks, run a preview, check the account, log in, log
out all without friction or hangs.

That's the bar we wanted to hit. The CLI is better for everyone, and an agent
can drive it without anyone holding its hand. The loop stays short whether a
human or an agent is closing it helping you deliver Flutter apps faster.

## What's next

This first pass covered the critical path, but there’s more work to be done to
improve the agentic workflow. Adjacent work we want to pick up:

- Filling in the remaining read gaps include org members, usage, audit logs, app
  insights, so agents stop bouncing between CLI and console.
- More CLI commands for the workflow that's console-only today such as API key
  management, patch rollback and roll-forward, app rename/delete/transfer, and
  channel management.
- `--dry-run` on mutating commands so agents and CI pipelines can preview a
  destructive change before it lands.

If you've been holding off on letting an agent touch your release pipeline, give
it a try. We'd love to hear where it still trips.
