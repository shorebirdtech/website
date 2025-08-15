---
title: Looking at Flutter 3.35 & Dart 3.9 and Shorebird Support
author: eseidel
description:
  Our take on Flutter 3.35 and Dart 3.9. What’s new, why it matters, and how
  Shorebird is getting ready for it.
date: 2025-08-15
cover: flutter-3.35-cover.png
---

Flutter turns 11 next month! Over the past decade plus of development, it’s gone
from an ambitious experiment to one of the most widely used cross-platform
frameworks in the world. Today, Flutter is well established in the industry,
seeing strong adoption across startups and enterprise teams alike. Earlier this
year, Google shared that Flutter now powers nearly 30% of all free iOS app
submissions and monthly active Flutter developers passed 1 million long ago.

## The scale of Flutter

At the end of 2024, the Flutter team declared they were entering their
[“production era”](https://medium.com/flutter/flutter-in-production-f9418261d8e1).
A stage where stability, performance, and long-term reliability take center
stage.

With that scale comes responsibility. The Google Flutter and Dart teams now
support one of the largest developer ecosystems in the world, carrying the
weight of keeping it stable, fast, and dependable.

The latest release, Flutter 3.35 and Dart 3.9, continues that focus. While it
may be another “polish” release, doubling down on performance, stability, and
quality, I suspect we’ll keep seeing this “we polish so you can perform”
approach. I can’t say for certain, of course. I no longer lead the Google team
🙂

Here are some of the updates that stood out to us:

- **Framework polish across the board** — Improvements to both Material and
  Cupertino design languages, plus better accessibility for iOS and Android.
  Android also gains sensitive content protection, a big win for fintech and
  other security-conscious apps.
- **AI-first development support** — Google has released an official
  Dart/Flutter MCP server, making it easier to integrate with AI-powered tools
  and workflows. While we haven’t played with this much yet, it’s great to see
  the team moving quickly to stay ahead of the community’s needs.
- **Faster developer tools** — The Dart SDK now uses `dart compile` internally,
  so commands like `dart format` and `dart analyze` run significantly faster.
  That means fewer cycles wasted on your local machine and in your build
  pipelines.
- **Ongoing Impeller GPU improvements** — You might not notice them, but your
  app should “just work” more smoothly.
- **Material and Cupertino split from `package:flutter`** — This is a big shift,
  but one that could be great in the long term. It allows these design systems
  to evolve independently, and a new “base layer” will make it easier to build
  platform-neutral components.
- **Improved web accessibility** — Further refinements make it easier to create
  inclusive web experiences.
- **Web hot reload by default** — If you’re building for the web, you no longer
  need to spin up a desktop build just to get hot reload working. It’s a big win
  for having the same development workflow across every platform Flutter
  supports.

Of course, there’s plenty more, and we recommend reading Google’s official
[Flutter 3.35](https://medium.com/flutter/whats-new-in-flutter-3-35-c58ef72e3766)
and [Dart 3.9](https://medium.com/dartlang/announcing-dart-3-9-ba49e8f38298)
announcements for the full details.

## Shorebird + Flutter 3.35

We’re excited about this release, and we’ve been working closely with Google to
make sure Shorebird’s Code Push product is ready for it. In fact, some of our
changes have been pulled up into the Dart VM itself. That does mean a bit of
extra work on our side to reapply our changes on top of the new release, but we
expect full Flutter 3.35 + Dart 3.9 support in Shorebird during the week of
August 18th.

Follow us on [X](https://twitter.com/shorebirddev),
[BlueSky](https://bsky.app/profile/shorebird.dev), or
[LinkedIn](https://www.linkedin.com/company/shorebirddev) to know when that new
release is ready. Then all it takes is a quick `shorebird upgrade` to ensure
you’re up to date.
