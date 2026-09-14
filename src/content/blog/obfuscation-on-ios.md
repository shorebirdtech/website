---
title: Obfuscation on iOS now available in Shorebird
author: brandonderosier
description:
  Whether you're targeting iOS, Android, or any other platform Shorebird
  supports, obfuscation works consistently across the board.
date: 2026-02-27
cover: obfuscation-on-ios.png
intro: Protect your Flutter apps across all platforms with the --obfuscate flag.
readingTime: 2 min read
ogImage: '/blog/og/obfuscation-on-ios.png'
seoTitle: Protect your Flutter iOS apps with Shorebird Obfuscation
seoDescription:
  Shorebird now supports code obfuscation for iOS. Protect your Flutter apps
  across platforms with the --obfuscate flag on Code Push.
---

<!-- Converted from the Webflow CMS export by scripts/import_webflow.py -->

Obfuscation has always been supported for non-iOS platforms in Shorebird and
supporting it in iOS has long been one of the
[most requested features](https://github.com/shorebirdtech/shorebird/issues/1619)
from our community. As of Flutter 3.41.2,**--obfuscate**is now a first-class CLI
flag in Shorebird. Code Push has revolutionized how you update your Flutter
apps, letting you fix bugs and ship features without the delays of app store
review processes. But shipping fast isn’t enough, you also need the protection
of obfuscation.

Starting today, you can use the **`--obfuscate`** flag during release commands
across all platforms. The tool will remember if you used **`–-obfuscate`**
during release and automatically do so during patch.

## Why Obfuscation Matters

Obfuscation transforms your readable, well-structured code into something that
looks like alphabet soup to anyone trying to reverse-engineer it. Variable names
become meaningless strings, class structures get reorganized, and the logic that
took you weeks to perfect becomes nearly impossible for bad actors to decipher.

No obfuscation can ever fully hide your code, but it does make it much harder
for someone to understand the code without the original source or the
obfuscation map. Some regions and regulated industries even require developers
to use obfuscation.

It’s important to call out that obfuscation does not hide API keys and sensitive
data, it hides the function/class names from your source code. Obfuscation is
not a replacement for strong security practices, it should be used in addition
to existing security practices like storing keys in environment variables and
using dedicated secret management services.

## How It Works

To use obfuscation in Shorebird add the **`--obfuscate`** flag to `release`
command. Shorebird remembers that you used **--obfuscate** for the release and
will automatically obfuscate patches:

- When releasing: **`shorebird release --obfuscate`**
- When patching: **`shorebird patch`**

That's it. Whether you're targeting iOS, Android, or any other platform
Shorebird supports, obfuscation works consistently across the board.

## The Bottom Line

Your code represents your competitive advantage and your hard work. With
obfuscation now built directly into Shorebird's CLI, you get enterprise-grade
security without sacrificing the developer experience.

Ready to start obfuscating? Check out our
[documentation](https://docs.shorebird.dev/code-push/guides/security-tools/) for
more information.
