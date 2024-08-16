---
layout: ../../layouts/BlogLayout.astro
title: Blog | Surviving the upgrade to Dart 3.5.0
description: Troubleshooting when upgrading to Dart 3.5.0
date: August 16, 2024
---

# Dart 3.5.0

One of the big features of [Flutter
3.24.0](https://medium.com/flutter/whats-new-in-flutter-3-24-6c040f87d1e4) is an
upgrade to Dart 3.5.0, which comes with a whole bunch of [nice
changes](https://medium.com/dartlang/dart-3-5-6ca36259fa2f). Unfortunately, like
all software releases, it also came with some bugs.

We encountered some bugs when upgrading our projects at Shorebird and have
listed the problems and workarounds we found here:

## Error (Xcode): ../.pub-cache/hosted/pub.dev/win32-5.5.0/lib/src/guid.dart:32:9: Error: Type 'UnmodifiableUint8ListView' not found.

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

## None of your analysis warnings show up in Visual Studio Code.

If:

1. Your `pubspec.yaml` file is not at the root of your repo (or "workspace")
2. Your `analysis_options.yaml` file uses an "import" to pull in rules from
   another file (the default Flutter and Dart templates include `package:lints`
   or `package:flutter_lints`).

This can be worked around by adding a `pubspec.yaml` at the root of your
checkout/workspace. This is what we've used:

```yaml
# This file is a workaround for https://github.com/dart-lang/sdk/issues/56047
name: your_project_name_here
environment:
  sdk: ^3.5.0
dev_dependencies:
  very_good_analysis: ^6.0.0
```

The above example uses
[very_good_analysis](https://pub.dev/packages/very_good_analysis) (which is the
lints package we use at [Shorebird](https://shorebird.dev)), but you can easily
change the above to use [package:lints](https://pub.dev/packages/lints) or
[package:flutter_lints](https://pub.dev/packages/flutter_lints) or whatever
analysis imports you depend on.

You can test that this is working by introducing an error in one of your
packages not at the root of your repo and you should once again see that error
in the "Problems" tab of Visual Studio Code.

## Conclusion

Did you have trouble with Dart 3.5.0? Did we miss something? We'd love to hear
from you. Reach out via [email](mailto:contact@shorebird.dev) or
[Discord](https://discord.gg/shorebird) anytime.
