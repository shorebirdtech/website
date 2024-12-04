---
title: Tracks, Percentage Rollouts and A/B testing
author: eseidel
description: Announcing Tracks, Percentage Rollouts and A/B testing
date: 2024-11-14
cover: /blog/shorebird-code-push-v2-cover.png
coverAlt: Improved Patch Delivery Cover Image
---

Building on the success of our brand-new [`shorebird_code_push`
package](https://pub.dev/packages/shorebird_code_push/versions/2.0.0) 2.0, we're
announcing patch tracks, which can be used to support percentage-based
rollouts and A/B testing within Shorebird.

The `shorebird_code_push` package is a completely optional package that allows
developers to customize the user experience of downloading and installing
over-the-air updates with Shorebird. It was built for teams that want more
control over when updates are downloaded and which users receive those updates.

Shorebird strongly believes in user privacy, and we never collect any
information from our customer's customers. This means that we can't tell one of
your customers apart from another. This has previously prevented us from being
able to offer patch rollout options that target specific users.

However, with the updated package:shorebird_code_push, we've provided the API
tools to make it easy for you to provide your own group-based control over who
gets what updates when. With patch tracks, you can support QA testing, a
public beta, or even for controlled percentage-based rollout across your
userbase.

`ShorebirdUpdater` methods `checkForUpdate` and `update` now take an optional
`track` parameter which affords you powerful control over app updates in the field.

Examples of features it is now possible for you to add to your process:

### Group based update distribution

The `shorebird` command line now takes a `--track` parameter which allows
you to specify the track to send a patch to. For example, you can use
`shorebird patch ios --track staging` to submit a patch to your iOS builds
which is only available when requesting updates to the `staging` track.

This can be used for example to distribute updates only to your QA team for
testing, which you can then later promote to the `stable` track for distribution
to all users.

### Percentage Rollouts

Similar to groups, it is now possible to implement percentage rollouts of
patches with Shorebird. Currently we do not provide UI for controlling
rollouts, but rather the tools to allow customers to do so on
their own. We've written a guide demonstrating how this can be accomplished:
https://docs.shorebird.dev/guides/percentage-based-rollouts/

### A/B Testing

These same track APIs are also able to support A/B testing.

The logic is very similar to a percentage based rollout above, just determining
whether to use patch A or B based on some other criteria.

## Get Started

You can try out the new version now by adjusting your `pubspec.yaml` to use
version 2.0 of `shorebird_code_push` and re-releasing a new version of your
application using the revision of Flutter 3.24.5.

```yaml
dependencies:
  shorebird_code_push: ^2.0.0
```

We'd love to hear your feedback! If there's anything you'd like to see adjusted
or improved, please [let us know by filing an
issue](https://github.com/shorebirdtech/updater/issues/new).
