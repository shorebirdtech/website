---
title: Manually control your Shorebird updates
author: abhishekdoshi
description:
  Learn how to disable Shorebird's automatic updates and take full manual
  control over when and how patches roll out to your users.
date: 2026-07-30
cover: manual-control-of-your-shorebird-updates.png
intro:
  Learn how to disable Shorebird's automatic updates and take full manual
  control over when and how patches roll out to your users.
readingTime: 5 min read
ogImage: '/blog/og/manual-control-of-your-shorebird-updates.png'
seoTitle: Taking Manual Control of Your Shorebird Updates
seoDescription:
  Learn how to disable automatic patching in Shorebird and control rollout
  timing, gate access, and trigger updates via push notifications.
---

<!-- Converted from the Webflow CMS export by scripts/import_webflow.py -->

Shorebird's default behavior is fully automatic: patches get downloaded
automatically. You can also take full manual control over when and how updates
roll out, if your team needs that level of precision. This post covers how to do
that, and when you'd actually want to.

## How automatic updates work by default

Out of the box, Shorebird checks for a new patch in a background thread on every
app launch, so it never slows down your app's startup. If a patch is available,
it downloads and installs silently.

For most teams, this default is exactly right: users stay on the latest code
without ever having to think about it. Manual control is for the teams that need
more precision than that.

## When to choose manual over automatic

A few scenarios come up again and again where teams need to turn off automatic
updates:

- **Gating access on the latest patch.** Force an update check before a user can
  use the rest of the app, useful for a compliance requirement, a breaking API
  change, or a critical fix.
- **Controlling rollout, not just timing.** Publish to a specific track first,
  watch your crash reporting and analytics, then promote to everyone once you're
  confident.
- **Triggering updates via push notification.** Push a patch to a specific
  device or user segment on demand, rather than waiting for their next natural
  app launch.
- **Coordinating with `in_app_update`on Android.** Avoid prompting users to
  update through the Play Store when a Shorebird patch already fixed the issue.

The rest of this post walks through how to set up manual control, then how to
apply it to each of these.

## Turning on manual control

The switch is a single line in your `shorebird.yaml`:

```yaml
auto_update: false
```

With automatic updates disabled, Shorebird will no longer check for or download
patches on its own. Instead, you decide when that happens, using the
[shorebird_code_push](https://pub.dev/packages/shorebird_code_push) package.

## The ShorebirdUpdater API

`shorebird_code_push` gives you a small, focused API centered on a single class:
`ShorebirdUpdater`.

```dart
import 'package:shorebird_code_push/shorebird_code_push.dart';
final updater = ShorebirdUpdater();
```

From there, you have three things you'll use constantly:

**Check what's currently installed.**

```dart
final currentPatch = await updater.readCurrentPatch();
print('Current patch: ${currentPatch?.number ?? "none"}');
```

`readCurrentPatch()` returns `null` if no patch is installed yet, which is
expected right after a fresh release.

**Check whether an update is available.**

```dart
final status = await updater.checkForUpdate();
if (status == UpdateStatus.outdated) {
// A new patch is waiting.
}
```

**Download and install it, on your terms.**

```dart
try {
	await updater.update();  
    // Prompt the user to restart, or handle it however fits your UX.
} on UpdateException catch (error) {  
  	// error.reason is an UpdateFailureReason (noUpdate, downloadFailed,  
    // installFailed, etc.), and error.message is human-readable.
}
```

`checkForUpdate()` and `update()` both make network calls, so avoid awaiting
them somewhere that blocks your UI, like a raw `initState()` on your home
screen. Use `.then()`, or put the check on a screen that's designed to wait,
like a splash or login screen. See the
[package documentation](https://pub.dev/packages/shorebird_code_push) for the
full API reference.

## Putting manual control into practice

### Gating access on the latest patch

If your business requires that users are always on the latest code before they
can do anything, you can check for and download the update as part of your login
flow or an initial launch gate. Because this screen is expected to take a
moment, it's a safe place to await `checkForUpdate()` and `update()` without
hurting perceived performance elsewhere in your app. The one thing to build in
deliberately: a downloaded patch doesn't take effect until the app restarts, so
downloading it isn't enough on its own. Pair the download with a forced restart
(a package like [restart_app](https://pub.dev/packages/restart_app) can do this)
or a clear prompt asking the user to relaunch, so that by the time they reach
the rest of your app, they're actually running the new patch, not just holding
one they haven't booted into yet.

### Controlling rollout, not just timing

Shorebird supports publishing patches to specific
[tracks](https://docs.shorebird.dev/code-push/guides/staging-patches/), so
you're not limited to "everyone gets it or no one does." You can check for
updates on a specific track:

```dart
final status = await updater.checkForUpdate(track: UpdateTrack.staging);
```

This is the foundation for staged and percentage-based rollouts: publish a patch
to a smaller audience first, watch your crash reporting and analytics, then
promote it to everyone once you're confident. If you want fine-grained,
percentage-based control specifically, see our
[percentage-based rollouts guide](https://docs.shorebird.dev/code-push/guides/percentage-based-rollouts/).

### Triggering updates via push notification

Shorebird doesn't ship its own notification service, but it composes cleanly
with the one you're probably already using, like Firebase Cloud Messaging (FCM).
Since FCM (or any Dart-based notification handler) already wakes up the Flutter
engine when a notification arrives, you can use that moment to trigger
`checkForUpdate()` and `update()` directly in your notification handler. Because
most push services let you target specific devices or user segments, this gives
you a way to push an update to a specific set of users on demand, rather than
waiting for their next natural app launch.

### Coordinating with in_app_update on Android

If you already use Android's `in_app_update` to keep users on the latest store
release, you'll want the two systems to cooperate rather than compete. A patched
app doesn't change its version number (patches apply to a release, they aren't
new releases), so `in_app_update` has no way of knowing a Shorebird patch
already fixed the issue it's about to nag the user about. Use
`readCurrentPatch()` to check whether the relevant patch is already applied, and
skip the `in_app_update` prompt if so. In general, patches are dramatically
smaller than a full store download (a few KB on Android, a few hundred KB on
iOS), so where you have the choice, delivering a fix via Shorebird is the
lighter-weight option for your users.

## Where to go next

If you want to go deeper, the full reference lives in our
[Update Strategies](https://docs.shorebird.dev/code-push/update-strategies/)
docs, and the
[shorebird_code_push package documentation](https://pub.dev/packages/shorebird_code_push)
has the complete API surface with more examples. And if you run into something
these docs don't cover, our [Discord](https://discord.gg/shorebird) is the
fastest way to get an answer directly from the team.
