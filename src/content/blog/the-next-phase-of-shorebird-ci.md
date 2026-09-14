---
title: The next phase of Shorebird CI
author: shorebirdtech
description:
  Shorebird CI is evolving from a hosted service into an open-source Dart
  package that makes GitHub Actions fully Flutter and Dart aware.
date: 2026-05-20
cover: the-next-phase-of-shorebird-ci.png
intro:
  Shorebird CI is evolving from a hosted service into an open-source Dart
  package that makes GitHub Actions fully Flutter and Dart aware.
readingTime: 5 min read
ogImage: '/blog/og/the-next-phase-of-shorebird-ci.png'
seoTitle: 'ShoThe Next Phase of Shorebird CI: Now Open Source'
seoDescription:
  Shorebird CI is becoming an open-source Dart package that makes GitHub Actions
  fully Flutter-aware, with smart dependency graphs built in.
---

<!-- cSpell:ignore shorbird -->

<!-- Converted from the Webflow CMS export by scripts/import_webflow.py -->

Shorebird CI is evolving into an open-source Dart package designed to make
GitHub Actions fully Dart and Flutter aware in the rapidly evolving age of AI.
We will be sunsetting the CI product on August 8, 2026.

Last September, we [introduced Shorebird CI](about:blank) with a simple premise:
CI for Flutter and Dart shouldn't require a weekend of YAML archaeology.
Hundreds of teams gave it a try during the beta. We used it ourselves, on every
PR to every Shorebird repo. For nine months, it worked exactly as intended.

But the world changed faster than we expected.

## LLMs changed the math

When we built Shorebird CI, the zero-config value proposition was significant.
Install our GitHub App, and we'd figure out the rest: discover your packages,
compute your dependency graph, generate the right workflows, and run them on our
infrastructure. Zero config, under a minute to set up.

As LLMs have advanced the value proposition has decreased. Today, you can hand
an AI agent your repo and ask it to set up your CI. You no longer need to figure
out the YAML, the LLMs tack that for you.

So we asked ourselves: what if we gave the LLM the tools it's missing?

While the LLMs can set things up they don’t inherently know your dependency
graph or detect when path filters have drifted leading us to find a way to give
the LLMs the tools it was missing.

## Re-introducing Shorebird CI

We're open sourcing the intelligence behind
[Shorebird CI as a standalone Dart package](https://github.com/shorebirdtech/shorebird/tree/main/packages/shorebird_ci).
Instead of replacing GitHub Actions, it makes GitHub Actions better for Dart and
Flutter projects. The hosted version did everything on our infrastructure. The
new version puts the same intelligence in your hands with tighter integration
with your LLM. You have full control over your runners, secrets, and
customization with no vendor lock-in for CI execution.

With a single command shorbird_ci scans your repository, discovers every Dart
and Flutter package, computes the dependency graph, and writes a
`.github/workflows/shorebird_ci.yaml`that:

- **Only tests what changed.** A setup job dynamically computes which packages
  are affected by your PR — including transitive dependents through `path:`
  dependencies and Dart workspaces. No static path filters to maintain.
- **Knows Flutter from Dart.** Flutter packages get `flutter-action` and
  `flutter test`. Dart packages get `setup-dart` and `dart test`. No manual
  sorting.
- **Sets up coverage automatically.** If you have a `codecov.yml`, coverage is
  wired up with per-package flags.
- **Handles monorepos natively.** Whether you have 3 packages or 40, the
  workflow is the same length — matrix jobs fan out dynamically.

The generated file is yours. Edit it, extend it, customize it however you want.
It's a normal GitHub Actions workflow, not a locked artifact.

### Set up CI in one command

To start using shorebird_ciI run:

```sh
dart pub global activate shorebird_ci
```

Once shorebird_ci is activated the Flutter aware yaml file can be generated.

```sh
shorebird_ci generate
```

That’s it!

At least until things change, and we know monorepos change, dependencies shift
and new packages appear.

The verify command catches drift, checking that every package in your repo has
CI coverage and your dependency graph is correctly reflected.

```sh
shorebird_ci verify
```

When something's off, it tells you exactly what's wrong and what to fix. Run it
to catch problems at PR time, or run it locally when you're making changes.

## For our beta testers

If you've been using Shorebird CI through the GitHub App, thank you. We will be
sunsetting Shorebird CI on August 8, 2026. We are here to help you transition
over the next 3 months.

Transitioning is straightforward:

1. Install the tool: `dart pub global activate shorebird_ci`
2. Generate your workflow: `shorebird_ci generate`
3. Commit and push the generated `.github/workflows/shorebird_ci.yaml`
4. Uninstall the Shorebird CI GitHub App

Or, if you use an AI agent, just tell it:

“I'm migrating from Shorebird CI (hosted) to GitHub Actions. Run
`dart pub global activate shorebird_ci`, then `shorebird_ci generate --dry-run`
to review. Write the workflow, check for conflicts with my existing CI, and help
me resolve them.”

AI agents can read the README in the `shorebird_ci` package for detailed
guidance on both fresh setup and migration scenarios.

## What's next

This isn't the end of our Flutter and CI investment, we laid the foundation and
will be building upon it.

Migrating from a product to an open-source package gives us the ability to focus
on additional tools and services to improve the Flutter ecosystem. We have a lot
of ideas about what developer tooling should look like for Flutter teams: build
analysis, size tracking, performance insights, and more. Most of those are
things CI-as-a-service can't meaningfully differentiate on, but they are things
we can build uniquely from being deep in the Flutter toolchain. We'll have more
to share soon. For now, we're focused on making the transition smooth and making
sure the tooling is solid.

When we launched Shorebird CI last September, we said that teams should focus on
building features, not managing CI infrastructure. We still believe that. We
just found a better way to deliver on it.

If you have questions or run into anything during the transition, find us on
[Discord](https://discord.gg/shorebird) or open an issue on GitHub.
