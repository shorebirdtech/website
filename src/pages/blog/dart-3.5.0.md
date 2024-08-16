---
layout: ../../layouts/BlogLayout.astro
title: Blog | Upgrading to Dart 3.5.0
description: Troubleshooting when upgrading to Dart 3.5.0
date: August 16, 2024
---

# Upgrading your project to Dart 3.5.0

One of the big features of Flutter 3.22.4 is an upgrade to Dart 3.5.0. The
[official announcement](https://medium.com/dartlang/dart-3-5-6ca36259fa2f) from
the Dart team provides a thorough rundown of all the new features, so we won't
be covering that here. Instead, we'll talk about some of the issues we and our
users have seen with the upgrade and provide solutions to them.

# ../.pub-cache/hosted/pub.dev/win32-5.2.0/lib/src/guid.dart:32:9: Error: Type 'UnmodifiableVint8ListView' not found.

We were [not](https://github.com/jonataslaw/get_cli/issues/263)
[alone](https://github.com/orgs/codemagic-ci-cd/discussions/2678) in seeing this
issue. Fortunately, the fix is fairly straightforward:

```sh
flutter pub cache clean
flutter pub upgrade
```

If you track your `pubspec.lock` file in source control (tip: you should!), you
should see that the `win32` dependency has been upgraded, and you should now be
able to build.
