---
title: Production Desktop Support
author: bryanoltman
description: Announcing that desktop platforms are now production-ready
date: 2025-02-07
cover: stable-desktop-cover.png
---

We’re excited to announce that, as of today, our desktop (Windows, Linux, and
macOS) support is moving out of beta. Shorebird now goes everywhere Flutter
goes.

If you’re familiar with Shorebird, creating releases and patches for these new
platforms will look very familiar:

```sh
shorebird release linux
shorebird release macos
shorebird release windows
```

```sh
shorebird patch linux
shorebird patch macos
shorebird patch windows
```

The patching mechanism for each of these platforms does not use a simulator, so
there is no performance penalty when running patched code.

If you’re using Flutter on desktop, we’d love to hear from you! Let us know if
you run into any issues or have ideas for new features by creating a [new GitHub
issue](https://github.com/shorebirdtech/shorebird/issues/new?template=Blank+issue).
You can also reach us on [Discord](https://discord.gg/shorebird).
