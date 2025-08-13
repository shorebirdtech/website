---
title: Introducing Shorebird CI
author: shorebirdtech
description:
  Announcing a new service from Shorebird, zero config CI for Flutter and Dart
  applications.
date: 2025-08-15
cover: 'introducing-shorebird-ci-cover.png'
---

We’re thrilled to announce our newest product:
[Shorebird CI](https://ci.shorebird.dev) — a zero-config continuous integration
system built exclusively for Flutter and Dart by the very people who created
Flutter.

You’ve got an app to ship. Who wants to wrestle with YAML? Or spend hours
fiddling with CI pipelines that weren’t built with Flutter in mind? Why isn’t
there a CI solution that just works out of the box and enforces best practices?

There wasn’t one, so we built it.

<iframe width="560" height="315" src="https://www.youtube.com/embed/ZMMV418Dt80?si=Ec4cphd4vm1WFBEI" style="display:block;margin: 0 auto;" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Why We Built Shorebird CI

From countless conversations with customers, we kept hearing the same story.
Code Push made deploying instant updates effortless, but their CI pipelines were
still slow, clunky, and expensive. Some teams even had entire roles dedicated to
maintaining CI.

That’s not how it should be. CI should be fast, invisible, and effortless. You
should be spending your time building features and customer value, not
pipelines.

## Our Focus

In building Shorebird CI we focused on 5 key points.

- **Blazingly Fast** - In our tests, moving to Shorebird CI delivered up to 5×
  faster pipelines compared to typical Flutter builds.
- **Zero-Config Setup** - Forget giant YAML files and bash scripts. By
  statically analyzing your project, Shorebird CI can infer most of your config
  automatically.
- **Dart-Native** - Works with any Dart or Flutter project. Always up to date
  with the latest Dart and Flutter changes so you’re never blocked from adopting
  new features.
- **Mono-repo Aware** - Growing into a mono-repo? We handle it out of the box,
  so you can start small and scale without painful migrations.
- **Truly Multi-Platform** - Build for any platform Flutter supports. Your
  customers aren’t on one device, and your CI shouldn’t be either.

From indie apps to Fortune 500 enterprises moving to Flutter, these principles
make CI faster, simpler, and more reliable for everyone.

## Pricing

- Open Source — Free to use for public repos.
- Private Repos — $20/month for all features, plus a secure, private tenant to
  keep your code safe.

Simple. Transparent. Scales with you.

## Getting Started

Zero-config really means zero-config. You’ll be up and running in three quick
steps:

1. Install the [Shorebird CI GitHub app](https://github.com/apps/shorebird-ci).
2. Select the repositories you'd like to connect.
3. Open a pull request.

Yep, that's really it.

SCREENSHOT GOES HERE

From there, Shorebird CI automatically runs checks for:

- Formatting
- Analyzer
- Unit tests
- Widget tests
- Spell check
- Code coverage

Already have other checks you depend on? Let us know — we’re adding more soon
and prioritizing the ones our customers rely on most.
