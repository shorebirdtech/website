---
title: Flutter 3.32 Support and Review
author: shorebirdtech
description:
  Updating Shorebird for the latest Flutter release and highlighting our
  favorite updates.
date: 2025-05-28
cover: flutter-3.32-cover.png
---

We’re excited to announce that Shorebird now fully supports Flutter 3.32.0 and
Dart 3.8! If you’re looking to update your Flutter apps with Shorebird, just
upgrade to Shorebird v1.6.39 and you’ll be good to go. All it takes is a quick
`shorebird upgrade` to ensure you’re running the latest version.

We also wanted to take a moment to share our thoughts on these new releases.
They bring significant enhancements that streamline cross-platform development
and improve performance — not just for our customers, but for the entire Flutter
community. While we won’t rehash everything (you can read the official
[Flutter](https://medium.com/flutter/whats-new-in-flutter-3-32-40c1086bab6e) and
[Dart](https://medium.com/dartlang/announcing-dart-3-8-724eaaec9f47) posts for
the full details), we’d like to highlight a few of our favorite changes.

## Look and Feel Improvements

Google has introduced support for Apple “squircles” and made numerous
enhancements to the Cupertino library, improving the iOS look and feel for
Flutter apps. While some of these changes are subtle, they’re crucial for apps
to look and feel their best. If you’re targeting iOS, your apps should feel even
more polished for your users.

Similarly, the Flutter team has made a wide range of improvements to Material
components, ensuring your apps shine on Android as well. Flutter was created to
help developers bring any design to life, and seeing the team continue to refine
its visual fidelity is always music to our ears.

## Enhanced Formatting

Dart 3.8 includes updates to the code formatter, which now intelligently manages
trailing commas and line breaks. This results in cleaner diffs and more
consistent code formatting across all of your projects. Developers can opt into
these changes by updating their pubspec.yaml to specify the new language
version. To opt in, simply update your environment SDK constraints:

```yaml
environment:
  sdk: ^3.8.0
```

While Dart 3.7 also included some of these changes, they were not configurable,
prompting some developers to skip the upgrade. With Dart 3.8, you now have full
control.

We’ve navigated these formatting changes internally as well. It’s great to see
the Dart team improving tooling while giving developers the flexibility to adopt
changes on their own timeline.

## Cross-Compilation

This one may only apply to a subset of Dart and Flutter developers, but it’s
_extremely_ exciting for those it does. Dart 3.8 introduces cross-compilation
capabilities, allowing you to compile native Linux binaries from Windows, macOS,
or Linux machines. If you’re working with embedded devices this is a huge leap
forward. You no longer need to compile directly on the target device.

This is just the beginning of Dart’s cross-compilation journey. While this
release focuses on Dart-level capabilities, we’re excited about the potential
for Flutter-level cross-compilation, such as building iOS apps from Windows.
Thanks to Shorebird and our partners at [Codemagic](https://codemagic.io/),
Flutter developers are already simulating aspects of this today.

One of our customers,
[EasySpend](https://shorebird.dev/success-stories/easyspend/), specifically
mentioned that acquiring Apple hardware was cost-prohibitive for their team, yet
their users expect iOS apps. Cross-compilation opens the door to multi-platform
development without changing your host OS.

## Merging UI and Platform Threads

While this last one is mostly under the hood and unlikely to affect your app,
you should be aware that there has been a large internal change in how Flutter
operates. Flutter 3.32.0 merges the UI (Dart) and Platform (Swift/Kotlin)
threads to reduce latency and improve performance. This internal re-architecture
minimizes thread communication overhead, enabling future capabilities like
direct calls from Dart into native platform APIs.

Historically, these threads were separated to protect Dart code from being
blocked by long-running platform operations, a common issue in web development.
But with today’s faster mobile devices and the trend of unified threading in
native frameworks like SwiftUI, Flutter is following suit.

You likely won’t notice any changes. But if your app does start to stutter
unexpectedly after upgrading, it’s worth checking whether your platform code is
taking too long to execute.

## Our Commitment

At Shorebird, we’re committed to supporting the latest advancements in Flutter
and Dart. Our tools and services are fully compatible with Flutter 3.32.0 and
Dart 3.8, enabling you to build fast, reliable, cross-platform apps with
confidence.

This particular release took us a bit of extra time to support as there were a
lot of changes (kudos to the Google team for moving fast!). Generally, you can
expect Shorebird updates to follow quickly after Flutter hits the stable
channel.
