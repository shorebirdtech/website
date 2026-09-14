---
title:
  'Exploring Shorebird Samples: Real-world use cases for over-the-air updates'
author: abhishekdoshi
description:
  'A tour of the Shorebird Samples repository: real-world examples for flavors,
  progressive rollouts, add-to-app, and patchable business logic.'
date: 2026-08-04
cover: exploring-shorebird-samples.png
intro:
  'A tour of the Shorebird Samples repository: real-world examples for flavors,
  progressive rollouts, add-to-app, and patchable business logic.'
readingTime: 4 min read
ogImage: '/blog/og/exploring-shorebird-samples.png'
seoTitle: 'Shorebird Samples: Real-world OTA update examples'
seoDescription:
  'Explore the Shorebird Samples repo: working examples for Flutter flavors,
  progressive rollouts, add-to-app, and patchable business logic.'
---

<!-- Converted from the Webflow CMS export by scripts/import_webflow.py -->

When you integrate Shorebird into an application, you need practical,
architectural examples to bridge the gap between theory and implementation.
That's why we maintain the
[Shorebird Samples repository](https://github.com/shorebirdtech/samples): a
public collection of working apps that shows you how to implement Shorebird
across various complex architectures.

Let's look at the key samples, their specific use cases, and how they solve real
deployment challenges.

## 1. Complex app architectures: flavors

Enterprise apps rarely exist as a single target. You might need development,
staging, and production environments, or you might build white-labeled versions
of the same core app for different clients. Flutter handles these variations
using [flavors](https://docs.shorebird.dev/code-push/guides/flavors/android/).

If you use flavors, Shorebird needs to know exactly which flavor is receiving
the update so you avoid pushing a staging patch to production users. We provide
two dedicated examples to show you how this routing works:

- [**Flavors Sample**](https://github.com/shorebirdtech/samples/tree/main/flavors)**:**
  Shows you how to configure Shorebird alongside standard Flutter flavors. It
  gives you a straightforward baseline for apps that only need distinct bundle
  identifiers and API endpoints.
- [**Multi-Dimensional Flavors**](https://github.com/shorebirdtech/samples/tree/main/multi_dimensional_flavors)**:**
  Demonstrates how Shorebird handles multiple flavor dimensions on Android. If
  you separate environments and tenants, this sample shows you that Shorebird
  can target the correct patch regardless of how complex your build variants
  become.

## 2. Mitigating risk: progressive rollout

Pushing an update instantly to all your users carries inherent risk. If a new
patch introduces an unexpected edge case, you want to limit the blast radius.

The
[Progressive Rollout Demo](https://github.com/shorebirdtech/samples/tree/main/progressive_rollout_demo)
shows you how to implement percentage-based rollouts. By integrating
[Shorebird tracks](https://docs.shorebird.dev/code-push/guides/staging-patches/),
you can release a patch to a small fraction of your user base first.

This approach lets you monitor crash analytics and user feedback safely. Once
you confirm the patch is stable, you can confidently dial the rollout up to
100%. This demo gives you a complete blueprint for prioritizing stability and
demanding fine-grained release control.

## 3. Integrating with existing native apps: add-to-app

Many organizations don't rewrite their entire application in Flutter on day one.
Instead, you can adopt Flutter incrementally by embedding Flutter modules into
your existing native iOS or Android applications. This architecture is known as
add-to-app.

The
[Add-to-App Sample](https://github.com/shorebirdtech/samples/tree/main/add_to_app)
shows you that Shorebird works seamlessly in these hybrid environments. You
don't have to rebuild your entire native app to benefit from OTA updates.
Shorebird lets you push patches specifically to your embedded Flutter module,
which significantly reduces the friction of maintaining hybrid apps and gives
your Flutter team autonomy over its release cycle.

## 4. Fixing business logic: the fintech wallet

The
[Shorebird Fintech Wallet](https://github.com/shorebirdtech/samples/tree/main/shorebird_fintech_wallet)
serves as a masterclass in clean, patchable app architecture.

When you deploy hotfixes, a logic-level hotfix is the ideal scenario: you want
to fix a bug without destroying the user's current session or requiring an app
update.

The Fintech Wallet sample uses a decoupled reactive store and BLoC architecture,
so business logic lives entirely separately from the UI presentation layer. The
sample includes a deliberate, critical bug: the system incorrectly charges a 5%
fee on all transfers instead of making internal transfers free.

Because the app is architected cleanly, you can use a Shorebird patch to
instantly swap the faulty logic layer in the background. The next time your user
initiates a transfer, the correct logic applies seamlessly. This sample shows
you how structuring your app correctly makes OTA updates infinitely more
powerful and invisible to your end user.

## Get started

The [Shorebird Samples repository](https://github.com/shorebirdtech/samples) is
completely open-source. Whether you're migrating a legacy application, managing
complex flavors, or architecting logic for safe hot-patching, these examples
will guide your implementation.

Take a look, clone a sample, and take full control of your release cycle today.
