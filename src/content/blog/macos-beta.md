---
title: macOS Desktop Support (beta)
author: bryanoltman
description: Announcing the beta release of macOS desktop support
date: 2024-12-16
cover: macos-beta-cover.png
---

Shorebird now supports updating Flutter apps built for Mac desktop.

This support is in beta and only supports Arm (Apple Silicon) macs at this time.
We intend to support Intel macs in the future, but that may still be several
weeks away. We're beginning Windows desktop support next and you can follow our
progress [on GitHub](https://github.com/shorebirdtech/shorebird/issues/397).

The release and patch flow is the same as you’re used to with iOS and Android:

```sh
# Creates a new macOS release
shorebird release macos
```

```sh
# Patches a macOS release
shorebird patch macos --release-version=1.2.3+4
```

As always, we want your feedback! We'd love for you to try this out and let us
know what you think. Let us know if you run into any issues or have ideas for
new features by
[creating a new GitHub issue](https://github.com/shorebirdtech/shorebird/issues/new/choose)
