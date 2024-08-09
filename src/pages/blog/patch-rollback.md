---
layout: ../../layouts/BlogLayout.astro
title: Blog | Patch Rollbacks
description: Announcing Patch Rollback Support.
date: August 9, 2024
---

# Patch Rollbacks

_Shorebird Code Push allows developers to deploy fixes to Flutter apps
instantly, over the air, to end users’ devices. It takes less than 5 minutes to
integrate and requires no changes to your code or dev workflows. Updating
through Shorebird can change any amount of Dart code in your app and is designed
to help you fix your app quickly and safely, while still complying with Apple
and Google store policies._

Shorebird already has many systems in place to make sure your patches are always
improving your app for users. This includes providing you with
[staging](https://docs.shorebird.dev/guides/staging-patches/) and testing
facilities for your own QA, [on-device
automatic-rollback](https://docs.shorebird.dev/architecture/) if a patch fails
to load, and patch-install failure reporting. Until now, it has been possible to
disable new installs of patches, or send new patches to users. Today, it’s now
possible to issue global roll-backs of patches to all users.

Patches made with Shorebird Flutter 3.22.3 or later support global rollback.
Rollbacks can be initiated from the [Shorebird
Console](https://console.shorebird.dev/). See our [rollback
docs](https://docs.shorebird.dev/code-push/rollback/) for more info.

There is no charge for the use of the rollback service, since a rollback is a
patch removal rather than install. When rolling back from one patch to another,
if devices do not still contain the older patch, downloads and installs of that
older patch will count against monthly patch installs.

As always, we’re available every day on Discord and happy to answer any
questions you may have.

See you on [Discord](https://discord.gg/shorebird) 👋

Thanks,

The Shorebird Team (Eric, Bryan, and Felix)
