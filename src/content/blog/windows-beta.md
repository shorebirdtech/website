---
title: Windows Desktop Support (beta)
author: eseidel
description: Announcing the beta release of Windows desktop support
date: 2025-01-09
---

Shorebird now supports updating Flutter apps built for Windows desktop.

This support is in beta and only supports Windows x64 at this time. We intend
to add support for Windows arm64 as well once we receive a request for such.

The release and patch flow is the same as iOS, Android and Mac:

```sh
# Creates a new windows release
shorebird release windows
```

```sh
# Patches a windows release
shorebird patch windows --release-version=1.2.3+4
```

As always, we want your feedback! We'd love for you to try this out and let us
know what you think. Let us know if you run into any issues or have ideas for
new features by [creating a new GitHub
issue](https://github.com/shorebirdtech/shorebird/issues/new/choose)
