---
title: Introducing Shorebird CI (Beta)
author: shorebirdtech
description:
  Announcing a new service from Shorebird, zero config CI for Flutter and Dart
  applications.
date: 2025-09-09
cover: 'introducing-shorebird-ci-cover.png'
---

We’re thrilled to announce our newest product:
[Shorebird CI](https://docs.shorebird.dev/ci/) — a zero-config continuous
integration system built exclusively for Flutter and Dart by the very people who
created Flutter. We opened this up for a small developer preview in
[early August](https://x.com/shorebirddev/status/1950593850965459226) and are
officially launching an open beta today 🥳

As app developers, you’ve got a product to deliver. No one likes spending hours
fiddling with fragile CI setups or wrestling with YAML and bash scripts.

At Shorebird, we also got tired of configuring and maintaining our own CI
pipelines so we finally decided to build a CI solution specifically designed for
Flutter & Dart 💙

<div style="display:flex;justify-content:center">
  <iframe style="aspect-ratio:16/9;width:100%;margin-inline:auto;margin-bottom:1em" src="https://www.youtube.com/embed/ZMMV418Dt80?si=Ec4cphd4vm1WFBEI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## Why We Built Shorebird CI

From countless conversations with customers, we kept hearing the same story.
Code Push made deploying instant updates effortless, but their CI pipelines were
still slow, clunky, and expensive. Some companies even had entire teams
dedicated to maintaining CI.

At Shorebird, we believe CI should be reliable, invisible, and performant.
Developers should be spending their time building features and adding customer
value, not fighting with CI pipelines and workflows.

## Our Focus

Shorebird CI focuses on several key points:

- **✨ Zero-Config** - Forget giant YAML files and bash scripts. By statically
  analyzing your project, Shorebird CI can infer your config automatically. Say
  goodbye to writing and maintaining complex YAML and bash scripts.
- **🎯 Dart-Native** - Works with any Dart or Flutter project. It's always up to
  date with the latest Dart and Flutter changes so you’re never blocked from
  adopting new features.
- **📦 Monorepo Aware** - Growing into a monorepo? We handle it out of the box,
  so you can start small and scale without painful migrations.
- **✅ Production Quality** - Our growing list of checks are designed to enforce
  best practices and catch bugs and inconsistencies during development to help
  you ship with confidence.
- **🚀 Performant** — Thanks to quick startup times and reliable change
  detection, we only run checks on affected code and automatically parallelize
  builds for maximum speed.

From indie apps to Fortune 500 enterprises moving to Flutter, Shorebird CI aims
to provide continuous integration that is simpler, faster, and more reliable for
all Flutter & Dart developers.

## Pricing

Much like our pricing for Code Push, we want to be able to serve the community
and open source needs while allowing for larger customers with more extensive
needs. While we are in this Beta period we have 2 tiers.

- **Hobby** - Free during for public repositories. This includes all Shorebird
  CI features so you can run fast, zero-config pipelines for your community
  projects.
- **Pro** — A simple $20 per month. This includes 100 hours of compute per month
  in a secure, private tenant to keep your code safe. This plan is required to
  use private repositories.

Pricing may change after this beta period as we learn more about customer usage
and move toward general availability. Our goal will always be pricing that is
simple, transparent, and scales with your needs.

## Getting Started

Zero-config really means no configuration. With just a few quick steps, you’ll
have your account linked and be up and running. Check out our
[quick start guide](https://docs.shorebird.dev/ci) to get up and running in less
than a minute.

![Showing Shorebird CI in GitHub Checks in a PR](../../assets/blog/introducing-shorebird-ci/shorebird_ci_in_github_checks.png)

Once integrated, Shorebird CI automatically detects analysis warnings,
inconsistent formatting, failing tests, misspelled words, and more!

![Output of Shorebird CI](../../assets/blog/introducing-shorebird-ci/shorebird_ci_output.png)

If you want to learn more about the built in checks, head over to our
[documentation](https://docs.shorebird.dev/ci/checks). Already have other checks
you depend on? Let us know — we’re adding more soon and prioritizing the ones
our customers rely on most.

## What's Next

We’re just getting started with Shorebird CI. This beta is our chance to learn
from you and find out what works well, what’s missing, and how we can make CI
even faster and simpler for teams of all sizes.

Over the coming months we plan to add to our growing list of automated checks,
deliver smarter scaling for even better performance, and refine our pricing
model based on real world usage. We want your feedback so please don't hesitate
to provide input to help shape the future of Shorebird CI.

This beta is just the beginning and we’re very excited to build with you.

[Get started today](https://docs.shorebird.dev/ci) and let us know what you
think 💙
