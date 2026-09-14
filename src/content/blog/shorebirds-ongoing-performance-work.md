---
title: Shorebird's ongoing iOS performance work
author: eseidel
description:
  How Shorebird improved patch linking for Flutter 3.44+, cutting worst-case iOS
  slowdowns while keeping full native speed.
date: 2026-07-23
cover: shorebirds-ongoing-performance-work.png
intro:
  How Shorebird improved patch linking for Flutter 3.44+, cutting worst-case iOS
  slowdowns while keeping full native speed.
readingTime: 4 min read
ogImage: '/blog/og/shorebirds-ongoing-performance-work.jpg'
seoTitle: Shorebird's Ongoing Performance Work for Flutter 3.44+
seoDescription:
  Shorebird cut worst-case iOS patch slowdowns in Flutter 3.44+ by improving
  Dart AOT linking, while keeping every release at 100% native speed.
---

<!-- Converted from the Webflow CMS export by scripts/import_webflow.py -->

The promise we hold ourselves to is that using Shorebird should never make your
app worse than _not_ using it. That's the bar every release is measured against.
A lot of quiet work goes into keeping that promise. We've recently spent a lot
of time making concrete improvements to improve performance for Flutter 3.44 and
later.

## Performance, platform by platform

A Shorebird release and every patch on top of it run at **100% native speed**,
identical machine code you'd ship without us. iOS is the one caveat. While
releases always run at 100% speed, patches on iOS can slow down at times.

The only allowed mechanism by iOS for running dynamic code is an interpreter.
Interpreters are slow (relative to hardware). Shorebird accounts for this, by
running _as little_ code on the interpreter as possible. When creating a
Shorebird patch for iOS, we are careful to figure out exactly which functions
your patch changed, interpret only those, and let the rest of your app keep
running as the original native snapshot. We call this **linking**.

This creates a pay-as-you-go profile unique to iOS. The further a release drifts
from where it started with more patches or bigger changes, the more code can
land on the interpreter. Large patches gradually cause unexpected slowdowns.
Shrinking this effect has been a long-running focus for us, and it's where the
3.44 work comes in.

## Linking, and why it's hard

Dart's AOT compiler is a whole-program optimizer. To make your app fast, it
inlines and merges code across the entire program, deliberately blurring the
boundaries between functions. Great for native speed, but it makes "linking"
(and thus patching) hard. We measure the success of "linking" by "link
percentage". Higher is better, with 99.9% being ideal, and generally anything
above 90% being great.

When boundaries are smeared, a small source change sometimes doesn't map cleanly
to "one changed function." Its effects bleed into a larger region of compiled
output, and everything in that region falls back to the interpreter. Details on
this are covered in the Code Push Performance article in our docs.

Most of the time patching works great on iOS, even with this "blurring" the Dart
compiler does. But occasionally a small change can have an outsized blast
radius, dragging a big chunk of otherwise-untouched code onto the interpreter.
If an important code path (e.g. startup, scrolling) happened to sit in that
region, a single patch could make the app feel noticeably slower. The end result
is a "bad-luck patch."

To reduce the number of bad-luck patches we worked closely with a few enterprise
customers with very large applications to change the Dart compiler. In the 3.44
branch, Dart's compiler has **bounds to how far the effects of any one change
can spread**. Whole-program performance is fully preserved. What's different is
that a change now stays contained instead of rippling across your app, so we can
isolate what actually changed and keep far more of your code running natively.

The typical patch already linked well and is essentially unchanged. The win in
3.44+ is **consistency**. We significantly cut the chance of a bad patch: the
worst-linking cases improved dramatically, the outcome is far more predictable
patch-to-patch, and the pathological "small change, huge slowdown" cases largely
went away. In short, we raised the floor without touching the ceiling.

## Staying current matters

We continuously are making improvements to both Shorebird's tooling and
services, as well as our Flutter fork. To take advantage of all the latest
features we recommend using the latest version of `shorebird` cli, and to keep
your Flutter version current. If you can't run on the latest version we
recommend using a
[n+1 strategy](https://shorebird.dev/blog/keep-your-flutter-version-current).

Adoption tracks that recommendation, and the linking floor keeps climbing with
each train:

| Flutter | % of customers | Link % of typical patch | Link % of worst 10% |
| ------- | -------------- | ----------------------- | ------------------- |
| 3.44    | 43%            | 95%                     | 77%                 |
| 3.41    | 32%            | 96%                     | 58%                 |
| 3.38    | 11%            | 96%                     | 67%                 |
| other   | 14%            | -                       | -                   |

_Link % is the share of a patch that runs as native code; higher is better.
"Worst 10%" is the 10th-percentile patch AKA "the bad-luck patches."_

We'll keep you updated as we ship improvements. Our promise stays the same:
Shorebird should always be better than not using Shorebird. On iOS, we're going
to keep making "better" mean _faster_.
