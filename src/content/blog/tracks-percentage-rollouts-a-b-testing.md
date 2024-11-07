---
title: Tracks, Percentage Rollouts and A/B testing, oh my.
author: bryanoltman
description: Announcing Tracks, Percentage Rollouts and A/B testing
date: 2024-11-07
cover: /blog/shorebird-code-push-v2-cover.png
coverAlt: Improved Patch Delivery Cover Image
---

Building on the success of our brand-new [`shorebird_code_push`
package](https://pub.dev/packages/shorebird_code_push/versions/2.0.0-dev.2). 2.0
today we're announcing support for release tracks, percentage rollouts and
A/B testing within Shorebird.

The `shorebird_code_push` package is a completely optional package that allows
developers to customize the user experience of downloading and installing over
the air updates with Shorebird. By default, Shorebird auto updates in the
background but teams that want more control over when updates are downloaded and
installed can use the `shorebird_code_push` package to programmatically interact
with Shorebird's updater.

With new "tracks" support in `shorebird_code_push` it is now possible to roll
out a single patch to sets of users.  Be that for QA testing, a public beta,
or even for controlled percentage-based rollout across your user-base.

Shorebird strongly believes in user privacy.  As such, we never collect any
information from our customer's customers.  This means that we can't tell one
of your customer's apart from another.  This has previously prevented us from
being able to offer group-based patch rollout.

However now with the updated package:shorebird_code_push, we've provided
the API tools to make it easy for you to provide your own group-based control
over who gets what updates when.

`ShorebirdUpdater` methods `checkForUpdate` and `update` now take an optional
`track` parameter which affords you powerful control over app updates in the field.

Examples of features it is now possible for you to add to your process:

### Group based update distribution.

The `shorebird` command line now takes a `--track` parameter which allows
you to specify the track to send a patch to.  For example, you can use
`shorebird patch ios --track staging` to submit a patch to your iOS builds
which is only available when requesting updates to the `staging` track.

This can be used for example to distribute updates only to your QA team for
testing, which you can then later promote to the `stable` track for distribution
to all users.

### Percentage Rollouts

Similar to groups, it is now possible to implement percentage rollouts of
patches with Shorebird.  Currently we do not provide UI for controlling
rollouts, but rather the tools to allow sophisticated customers to do so on
their own.  For example, if I wanted to add percentage rollout support to
my application I would:

1. Disable automatic updates with Shorebird.  By default, Shorebird will
check for updates every time your app launches.  To perform more advanced
update controls, we will want to disable this behavior and make updating
of the app only happen when explicitly trigger through code.  Adding `auto_update: false` to
your `shorebird.yaml` will tell the Shorebird updater not to automatically
download patches, and only do so when you instruct it to with
`package:shorebird_code_push`.

2. Add a bit of code somewhere in your app (typically as a non-blocking part
of app launch, or during login, etc.) to check for updates conditionally
based on user group.

To support percentage based rollouts, you will need to bring your own
local storage (typically something like package:shared_preferences) and
network storage (could be any URL, key value store, or feature flag system
you might wish to use to control rollout percentage).

For example:
```dart
Future<int> _getGroupNumber() {
    // Read this user's group number from local storage, or initialize it
    // if it doesn't exist.  (e.g. by picking a number between 1-100).
}

Future<int> _getBetaPercentage() {
    // Read the current rollout percentage for the beta channel.
    // 50 means 50% of users should get this.
    // Commonly this would be done via a feature flags system, or a call to
    // a network data store (e.g. firestore) or even just reading from
    // a url.
}

```dart
// Initialize the ShorebirdUpdater
final updater = ShorebirdUpdater();
// Get the group number and beta rollout percentage
final (groupNumber, betaPercentage) = await (_getGroupNumber(), _getBetaPercentage()).wait;
// Decide which track this user is on.
final track = groupNumber >= betaPercentage ? Track.stable : Track.beta;
// Check to see if there are any patches on that track.
final status = await updater.checkForUpdate(track: track);
// Actually do the update if needed.
if (status == UpdateStatus.outdated) await updater.update(track: track);
```

### A/B Testing

These same track APIs are also able to support A/B testing.

The logic is very similar to a percentage based rollout above, just determining
whether to use patch A or B based on some other criteria.

## Get Started

You can try out the new version now by adjusting your `pubspec.yaml` to use the
pre-release and re-releasing a new version of your application using the
revision of Flutter 3.24.4.

```yaml
dependencies:
  shorebird_code_push: ^2.0.0-dev.3
```

### Further work

For now we've decided to expose these lower-level APIs to allow sophisticated
customers to implement their own custom rollout flows.  We may eventually
decide to also add GUIs for controlling rollout percentages, A/B testing, etc.

We'd love to hear your feedback! If there's anything you'd like to see adjusted
or improved, please [let us know by filing an
issue](https://github.com/shorebirdtech/updater/issues/new).
