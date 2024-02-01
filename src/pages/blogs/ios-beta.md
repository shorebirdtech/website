---
layout: ../../layouts/MarkdownLayout.astro
title: Blog | iOS Beta
description: Shorebird Code Push for iOS beta announcement
---

# Announcing Code Push iOS beta 🥳

We're very excited to announce that Code Push for Flutter is now in beta for iOS!

**Note: iOS beta requires the latest version of Shorebird CLI (0.25.0) with the latest stable version of Flutter (3.16.9).**

## What this means

We believe that iOS is now stable and safe for use in production. If you've been waiting to try Shorebird until there was stable iOS support, now is the time!

We've fixed all known crashers, but as with any beta, there may be bugs. If you encounter any problems, [please file an issue](https://github.com/shorebirdtech/shorebird/issues/new/choose) and we will address it as quickly as possible.

### Performance

This beta release dramatically improves performance on iOS.

iOS releases that include Shorebird now run at 100% native speeds. This means releasing with Shorebird will not reduce app performance.

At the moment, iOS patches may run slower. We are still hard at work improving patch performance, with the goal of achieveing near-native performance for patches in the near future.

### Patch sizes

We've dramatically reduced iOS patch sizes, which means faster patch installs and less data used per patch install. Patches are now diffed against the release, so your users only download the changes.

### CLI updates

We have removed the alpha suffix from all iOS CLI commands. We've kept the old commands for backward compatibility and plan to remove them in a future release.

## Get Started

Get started now with our [Quick Start Guide](https://docs.shorebird.dev/guides/code_push_quickstart).

Join the Shorebird community on [Discord](https://discord.gg/shorebird)!
