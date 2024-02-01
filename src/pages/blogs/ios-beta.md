---
layout: ../../layouts/MarkdownLayout.astro
title: Blog | iOS Beta
description: Shorebird Code Push for iOS beta announcement
---

# Announcing Code Push iOS beta 🥳

Shorebird Code Push allows you to update your Flutter app instantly over the air
and deploy fixes directly to end users' devices.

Shorebird's Android support has been production ready for nearly a year and is
used by thousands of apps. Hundreds of early adopters have tried our iOS support
during alpha these last 7 months.

We're excited to announce that Code Push for Flutter is now in beta for iOS!

iOS beta requires the latest version of Shorebird CLI (`0.25.0`) and the latest
stable version of Flutter (`3.16.9`).

## 🚀 Get Started

Get started now with our [Quick Start
Guide](https://docs.shorebird.dev/guides/code_push_quickstart) and join the
Shorebird community on [Discord](https://discord.gg/shorebird)!

## 🚦 Status

Code Push for iOS is now beta and safe for production apps. If you've been
waiting to try Shorebird until there was stable iOS support, now is the time!

If you encounter any problems, [please file an
issue](https://github.com/shorebirdtech/shorebird/issues/new/choose) or reach
out over [Discord](https://discord.gg/shorebird) we will work with you to
address it immediately!

## 🔥 iOS improvements from alpha

- 🚀 Apps run 100x faster before patching.
- 🏎️ Apps run 2x faster after patching.
- 📦 Patch sizes are 10x smaller
- 🔨 Hundreds of other issues resolved.

Thank you again to the thousands of developers who have supported Shorebird and
provided feedback thus far.

## 🚏 Road to 1.0

This release is marked "beta" rather than 1.0 due to a couple oustanding issues:

- `--obfuscate` is not currently supported on iOS
  ([#1619](https://github.com/shorebirdtech/shorebird/issues/1619)).
- Apps run slower after patching on iOS (unpatched apps run at full speed)
  ([#674](https://github.com/shorebirdtech/shorebird/issues/674))

Both of these will be addressed in the coming weeks. There is no change to app
speed before patches have been applied. Android builds run at full speed both
patched and unpatched. iOS beta is most suitable for patching critical bug fixes
until they can update from a store.

## 🐦 Try Shorebird

Please [try adding Shorebird to your
app](https://docs.shorebird.dev/guides/code_push_quickstart) on iOS and let us
know what you think!

See you on [Discord](https://discord.gg/shorebird) 👋

Thanks,

The Shorebird Team (Eric, Bryan, and Felix)
