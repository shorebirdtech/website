---
title: Rolling Back Patches - Why It Matters More Than You Think
author: tomarra
description: test
date: 2025-07-07
cover: patch-rollback-cover.png
---

At Fluttercon USA this year, I had a bunch of great conversations with Flutter
developers. The amount of folks building serious apps, doing CI/CD, thinking
about stability, performance, analytics, etc. was amazing.

But there was one topic that caught a lot of people off guard: rollbacks.

When I mentioned that Shorebird lets you instantly roll back a patch — as in,
undo a buggy update and return your app to a previous working version in minutes
— most people just blinked. Not because it wasn’t useful, but because they
hadn’t even considered it as a possibility.

And that makes sense. Rolling back just isn’t a thing in traditional mobile
development. The app stores are a one-way street. You push a new version, and
the only way to fix a problem is to push another version and then wait for the
rollout to happen.

That’s the status quo. But it doesn’t have to be.

## App Development Shouldn’t Be The Rollback Exception

If you’ve ever worked on a web app or backend system, rollbacks are second
nature. You deploy, monitor, and if something goes sideways, you revert. It’s
part of how modern software teams operate.

Shorebird brings that same model to app development. We’ve built our patch
system so that not only can you push updates instantly, you can also roll back
just as easily.

Let's look at some examples that we have seen and heard from our customers.

### Crashing Fix

Let’s say you release a fix on Friday afternoon. It fixes a small bug,
everything looks good until reports start coming in that it crashes on a
specific Android version. Normally, you’d scramble to build a new fix, test it,
and get it through review.

But if that fix was built and released as a Shorebird patch, you don’t need a
new fix at all. You just hit “roll back”, and your users will get the previous
stable patch the next time they open the app. Problem solved, stress avoided,
weekend saved.

### Testing Something

Let’s say you’re A/B testing a new onboarding flow using Shorebird. After a few
hours, your data shows that it’s clearly underperforming. Rather than scrambling
to come up with a new patch right away, just roll back to what was working.

Take your time, rethink the flow, and try again when you’re ready.

### API/Platform Dependency Changes

We’ve seen teams run into issues when updating third-party SDKs or integrating
with platform-specific APIs. A patch that works fine in dev starts causing
issues on older devices in production.

With rollbacks, you’re not stuck. You can hit pause, go back to the last
known-good state, and investigate without your users bearing the brunt of the
problem.

## This Isn’t How Mobile’s Been Done — But It Should Be

What I’ve realized from talking to teams is that mobile developers expect a
certain amount of pain. They’re used to the delays, the limitations, the lack of
control once something is out in the wild.

But it doesn’t have to be that way anymore.

With Shorebird, you get the same kind of control and flexibility you expect from
any modern deployment workflow — including the ability to undo.

So the next time you ship a patch, know this: if something breaks, you don’t
have to fix it right away. You can roll back. Instantly.

And that changes the game.
