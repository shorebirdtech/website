---
title: What's New in v2.0 of the Shorebird Code Push Package
author: felangel
description: Announcing the pre-release of pkg:shorebird_code_push v2.0
date: 2024-11-05
cover: code-push-v2-cover.png
---

We're excited to announce a pre-release of version 2.0 of the
[`shorebird_code_push`
package](https://pub.dev/packages/shorebird_code_push/versions/2.0.0-dev.2).

The `shorebird_code_push` package is a completely optional package that allows
developers to customize the user experience of downloading and installing over
the air updates with Shorebird. By default, Shorebird auto updates in the
background but teams that want more control over when updates are downloaded and
installed can use the `shorebird_code_push` package to programmatically interact
with Shorebird's updater.

Some common use cases for using `shorebird_code_push` are:

- Reducing the number of restarts required from 2 to 1
- Only sending updates to some fraction of your users
- Forcing users to upgrade for critical fixes
- Recording custom analytics about update installations/failures

## What's New

We've taken some time to re-imagine what the Dart API should look like when
interfacing with the Shorebird updater and we've re-written the Dart API from the
ground up.

The two main areas we focused on were:

- ✨ Simplifying the public API
- ❗️ Improving error reporting/handling

We really wanted `package:shorebird_code_push` to be simple and intuitive to use
so v2 comes with a much smaller public API surface.

The first thing we did was rename the core class from `ShorebirdCodePush` to
`ShorebirdUpdater` in order to better describe the purpose of the class.

```dart
import 'package:shorebird_code_push/shorebird_code_push.dart';

// Create an instance of the `ShorebirdUpdater`
final updater = ShorebirdUpdater();
```

We broke the public API into 3 main parts:

1. Reading patch information
1. Checking for updates
1. Performing updates

### Reading Patch Information

To get information about the current (installed) or next (downloaded) patches,
you can use the `readCurrentPatch` or `readNextPatch` APIs.

```dart
@override
void initState() {
  super.initState();
  updater.readCurrentPatch().then((patch) {
    // The current patch is `null` when no patch is installed.
    print(patch?.number);
  });
}
```

### Checking for Updates

To check for updates, you can use the `checkForUpdate` API:

```dart
Future<void> _checkForUpdate() async {
  // Check if there's an update available.
  final status = await updater.checkForUpdate();
  // If there is an update available, show a banner.
  if (status == UpdateStatus.outdated) showUpdateAvailableBanner();
}
```

`checkForUpdate` returns an `UpdateStatus` enum which provides much more
information about the current state of the updater. You don't need to write your
own logic to determine what state the app is in anymore, the `ShorebirdUpdater`
directly exposes it for you.

```dart
/// The current status of the app in terms of whether its up-to-date.
enum UpdateStatus {
  /// The app is up to date (e.g. running the latest patch.)
  upToDate,

  /// A new update is available for download.
  outdated,

  /// The app is up to date, but a restart is required for the update to take
  /// effect.
  restartRequired,

  /// The update status is unavailable. This occurs when the updater is not
  /// available in the current build.
  /// See also:
  /// * [ShorebirdUpdater.isAvailable] to determine if the updater is
  /// available.
  unavailable,
}
```

### Performing Updates

Finally, if an update is available you can use the `update` API to perform the update.

```dart
Future<void> _downloadUpdate() async {
  try {
    // Perform the update (e.g download the latest patch).
    await updater.update();
    // Show a banner to inform the user that the update is ready and that they
    // need to restart the app.
    showRestartBanner();
  } on UpdateException catch (error) {
    // We now have much better insights into why an update fail.
    showErrorBanner(error.message);
  }
}
```

If the update was unsuccessful, you can now programmatically catch the `UpdateException`
and have much more information about what went wrong.

The `UpdateException` includes a human-readable `message` describing the error as well as an `UpdateFailureReason`:

```dart
/// The reason a call to [ShorebirdUpdater.update] failed.
enum UpdateFailureReason {
  /// No update is available.
  noUpdate,

  /// The update failed because the patch could not be downloaded.
  downloadFailed,

  /// The update failed because the patch failed to install.
  installFailed,

  /// The update failed for an unknown reason.
  unknown,
}
```

To see the latest version in action, check out the [Shorebird Code Push
Example](https://github.com/shorebirdtech/updater/tree/main/shorebird_code_push/example)
or the [Flutter & Friends Conference
App](https://github.com/felangel/flutter_and_friends).

## Get Started

You can try out the new version now by adjusting your `pubspec.yaml` to use the
pre-release and re-releasing a new version of your application using the
revision of Flutter 3.24.4.

```yaml
dependencies:
  shorebird_code_push: ^2.0.0-dev.2
```

We'd love to hear your feedback! If there's anything you'd like to see adjusted
or improved, please [let us know by filing an
issue](https://github.com/shorebirdtech/updater/issues/new).
