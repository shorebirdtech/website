---
title: Custom Update Tracks
author: bryanoltman
description: Announcing the ability to create custom tracks
date: 2025-05-30
---

Shorebird now supports custom update tracks!

While it has been possible to deploy a patch to a specific group of users for a
while, groups were limited to `stable`, `staging`, and `beta`. Now, with the
release of `shorebird_code_push` 2.0.4, you can create unlimited custom tracks.

This is supported in every version of Flutter that Shorebird supports, and
because this update only includes Dart changes, it's even possible to update to
`shorebird_code_push` 2.0.4 by patching an existing release!
