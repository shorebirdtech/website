---
title: Custom Update Tracks
author: bryanoltman
description: Announcing the ability to create custom tracks
date: 2025-05-30
cover: custom-tracks-cover.png
---

Shorebird now supports custom update tracks!

Shorebird has long supported “staging” and “beta” environments for testing your
patches before deploying them to users. However, now we have added the ability
to create an unlimited number of tracks with custom names.

Shorebird does not collect any information about your users. As a result of our
privacy-forward design, Shorebird has no ability to provide things like region-
or group-based rollouts of patches, A/B testing, etc. out-of-the-box. However,
we provide a rich API set to enable you to implement all of these from within
your own apps. Previously, these APIs were limited to operating on a fixed
number of tracks (“staging”, “beta”, and “stable”), but now you can use an
arbitrary number of tracks and push separate patches to each one should you
wish. This can allow you to roll out updates with as much precision as you would
like.

To use these new features, first ensure you’re using package:shorebird_code_push
version 2.0.4 or later. Update your pubspec:

```yaml
dependencies:
  shorebird_code_push: ^2.0.4
```

Once that’s done, `Updater.checkForUpdate` now can receive any string as an
UpdateTrack
([source](https://pub.dev/documentation/shorebird_code_push/2.0.4/shorebird_code_push/UpdateTrack-extension-type.html)).

For example if your organization has a longer multi-track approval process, or
your own custom update process you might need more tracks:

```dart
final track;
if (user.isQa) {
   track = UpdateTrack('qa');
} else if (user.isDev) {
   track = UpdateTrack('dev');
} else if (user.isDesigner) {
   track = UpdateTrack('down-stream-test');
} else {
   track = UpdateTrack.stable;
}

updater.checkForUpdate(track:track);
```

Or for example if your app is required to change or disable a behavior within a
specific region (e.g. as part of legal or compliance changes):

```dart
final UpdateTrack updateTrack;
if (user.requiresLegalUpdates) {
  updateTrack = UpdateTrack('legal-update');
} else {
  updateTrack = UpdateTrack.stable;
}
```

Note that the name “stable” is still special in the sense that it is the
default. If you call updater.checkForUpdate() without a track argument, it will
default to “stable”. There is currently no way to change the default track used
by our C++ “auto_updater” code, however when the auto_updater is disabled, you
can use whatever default track you like when calling checkForUpdate.

These new features are supported in every version of Flutter that Shorebird
supports, and because this update only includes Dart changes, it's even possible
to even to start using these new features via a patch.
