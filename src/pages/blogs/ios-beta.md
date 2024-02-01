---
layout: ../../layouts/MarkdownLayout.astro
title: Blog | iOS Beta
description: Shorebird Code Push for iOS beta announcement
---

# Announcing Code Push iOS beta 🥳

We're very excited to announce that Code Push for Flutter is now in beta for iOS!

**Note: iOS beta requires the latest version of Shorebird CLI (0.25.0) with the latest stable version of Flutter (3.16.9).**

Shorebird Code Push is a tool that allows you to update your Flutter app instantly over the air. This allows you to directly deploy fixes to your end users' devices.

## What this means

Code Push for Android has been production ready for over a year and is battle-tested and used by thousands of apps already.

Code Push for iOS is newly in beta. We believe that iOS is now stable and safe for use in production so if you've been waiting to try Shorebird until there was stable iOS support, now is the time!

We've fixed all known crashers in iOS, but as with any beta, there may be bugs. If you encounter any problems, [please file an issue](https://github.com/shorebirdtech/shorebird/issues/new/choose) and we will address it as quickly as possible.

### Performance

This beta release dramatically improves performance on iOS.

iOS releases that include Shorebird now run at full speed meaning releasing with Shorebird will not affect app performance.

At the moment, iOS patches may run slower. Patches on iOS run approximately 2x faster than they previously did and we are hard at work improving patch performance, with the goal of achieveing identical performance between releases and patches in the coming weeks.

As a result, we recommend only pushing patches on iOS for critical bug fixes. In addition, we recommend [staging patches](https://docs.shorebird.dev/guides/staging-patches) and validating the patches locally before deploying the patch to end users.

### Patch sizes

We've reduced iOS patch sizes by 10x which means faster patch installs and less data used per patch install by end users. Patches are now diffed against the release, so a patch only include things that have changed since the release.

### CLI updates

We have removed the alpha suffix from all iOS CLI commands. We've kept the old aliases for backward compatibility and plan to remove them in a future release.

## Get Started

Get started now with our [Quick Start Guide](https://docs.shorebird.dev/guides/code_push_quickstart).

Join the Shorebird community on [Discord](https://discord.gg/shorebird)!
