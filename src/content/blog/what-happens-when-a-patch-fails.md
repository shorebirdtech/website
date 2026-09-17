---
title: What happens when a patch fails
author: abhishekdoshi
description:
  A close look at how Shorebird patches fail, what your users experience when
  they do, and what you can do about it.
date: 2026-09-02
cover: what-happens-when-a-patch-fails.png
intro:
  A close look at how Shorebird patches fail, what your users experience when
  they do, and what you can do about it.
readingTime: 6 min read
ogImage: '/blog/og/what-happens-when-a-patch-fails.jpg'
seoTitle: What Happens When a Shorebird Patch Fails
seoDescription:
  Learn why Shorebird patches fail to create or apply, what users actually see
  when it happens, and how to prevent failures before they start.
---

<!-- Converted from the Webflow CMS export by scripts/import_webflow.py -->

Patch failures can be frustrating when you're trying to get a bug fixed for
users. Patches can fail at creation time or when being applied on a user's
device.

## Why patches fail to get created

Most patch failures happen at creation time. `shorebird patch` runs, decides
something's off, and stops before uploading anything. Three things trigger this
most often: native code changes, asset changes, and build non-determinism.

Native code changes are the big one. You touch anything in Kotlin, Swift,
Objective-C, or a native dependency your plugins pull in, and Shorebird will
warn you. Though, you can bypass this warning by passing `--allow-native-diffs`

```
[WARN] Your app contains native changes, which cannot be applied with a patch.
```

This is because a patch is Dart-only by definition, so if the native binary is
changed, you'll need a new release.

Assets also work the same way. Images and fonts declared in `pubspec.yaml`
aren't patchable as of now. When you change or add new assets, you need to
create a release, not a patch.

The third one is the annoying one, because it looks like a native change, but
it's not. Your release build and your patch build need identical tooling to
produce identical output. If something drifts — a floating Android SDK version,
an unpinned Gradle dependency, a CI image that updated itself overnight — then
the compiled output can differ at the byte level with zero actual code changes
involved. Shorebird can't tell the difference between "you changed native code"
and "your build environment quietly changed under you," so it treats both the
same way: it won't patch and you'll get the same error warning as above.

To fix the last issue:

**Pin your Android SDK/build-tools version.** In `android/app/build.gradle`, if
no `buildToolsVersion` is specified, the Android Gradle Plugin picks whatever it
considers the default for the installed SDK. That default isn't fixed — it
depends on what's actually installed on the machine running the build. Your
release last month might have used build-tools 34.0.0 because that's what was on
the CI image then. Today, if the CI image got refreshed and now has 34.0.4
installed, the exact same build.gradle file, unchanged, silently compiles with a
different build-tools version. To pin the version:

```groovy
android {
    compileSdkVersion 34
    buildToolsVersion "34.0.0" //this will pin the version.
}
```

Now, whatever is installed on the machine at build time no longer matters — both
builds use exactly this version.

**Turn on Gradle dependency locking.** Gradle dependency locking saves resolved
versions of project dependencies into a local file, preventing unexpected
version changes across different machines or CI/CD environments. Add this to
`build.gradle`:

```groovy
dependencyLocking {
    lockAllConfigurations() //this locks the config for Gradle.
}
```

Then generate the lockfile once and commit it with the below command:

```sh
./gradlew dependencies --write-locks
```

After this, Gradle resolves against the committed gradle.lockfile files instead
of re-resolving to whatever's newest at build time.

**Pin your CI runner image to a fixed tag.** The CI runner image contains the
operating system, tools, and dependencies needed to execute automated CI/CD
pipeline jobs. In your CI config file, `runs-on: macos-latest` looks harmless,
but "latest" can change the runner image whenever a new version is available.
Instead, pin to a specific version, `runs-on: macos-14`, or an explicit image
tag/digest if you're on a self-hosted or custom runner.

Once you've done all three of these, your release/patch builds will stay
identical because your environment is now completely fixed and repeatable.

## Why a patch fails after it's created

Sometimes patches reach devices before an error occurs. This is rare but can
happen.

**Version or snapshot mismatches.** Patches are matched to a specific release by
app ID and version. Sometimes a patch gets matched against the wrong release, or
the toolchain that built it doesn't line up with what's actually running. When
that happens, the patch check or the inflation step fails, rather than silently
applying something incorrect. We built it this way on purpose so that a patch
fails to apply somewhere it doesn't belong.

**Interpreter-level failures.** On iOS specifically, patches run through a small
bundled ARM64 interpreter to be compliant with App Store policy. Sometimes a
patch hits something the interpreter can't resolve. When it does, it fails at
the runtime level — it doesn't corrupt anything, it just doesn't get installed
to the user's device.

## Why a patch fails to reach a device

This last category has nothing to do with your code or ours. It's just the
physical reality of pushing bytes to a phone somewhere in the world.

**Slow or unreliable connections.** The update check and download happen in the
background, but a background download still needs a network connection good
enough to complete it. A weak signal or a spotty connection can pause a download
mid-transfer. We support resumable downloads for exactly this reason — if a
connection drops partway through, the next attempt picks up from where it left
off rather than re-downloading the whole patch from scratch. Patches are also
staged through a CDN with regional presence, so most users are pulling from a
server close by.

**End user OS issues.** Android and iOS both throttle what apps can do in the
background for battery and data usage. Aggressive battery optimization,
restricted background data settings, or an OS deciding an app hasn't earned
enough background time recently can all prevent a download from completing, or
from starting at all. This isn't Shorebird-specific — it's the same set of
constraints any background network activity on mobile has to work within.

None of this is something a developer can fully control. What you can rely on is
that the check runs again every launch. A phone with bad signal today isn't
stuck forever — it just tries again next time. It's also exactly why patch
rollout takes time even after you've published, and why watching that curve
rather than assuming instant, universal delivery is the right mental model.

## What the user actually sees

And the most important part — what the user actually sees when a patch fails:
nothing. A user whose patch fails, for any of the reasons above, sees nothing
different at all. The app keeps running whatever version it was already running,
either the original release or the last patch that landed successfully. There's
never a partial install or a broken state on the user's device. The failure is
completely invisible from the user.

The update check runs on its own thread in the background. It can't touch the
running app until a patch is fully downloaded and verified, and even then it
waits for the next full launch to actually take effect, never mid-session. That
gap between "patch is ready" and "patch is running" is exactly what makes a
failure safe instead of scary.

## What you can actually do about it

A lot of the failure modes above sort themselves out, or are simply outside your
hands. A few things aren't.

**Read the error message.** When `shorebird patch` throws a warning, read it
before you retry. If you know you touched native code, that's expected — go
create a release. But if a command that's worked cleanly for months suddenly
throws a native-changes warning and you didn't touch anything native, look at
your build environment before you look at your code, using the pinning steps
above. Nine times out of ten that's where the actual change happened.

**Use tracks.** Push a patch to a small set of users first, confirm it does what
you expect, then distribute it to everyone. This won't stop a patch from
failing, but it does mean if something's logically wrong, a hundred people find
out instead of a hundred thousand.

**Rollback bad patches.** And if a bad patch does go out, roll it back from the
Console. Rollbacks don't require a new release, and take effect the same way a
patch does, on a device's next check-in.

**Monitor rollout analytics.** Mission Control is worth having open while
rolling out patches. It shows rollout percentage, how many devices are on which
patch, and how that adoption curve is actually moving, updated hourly, so you're
never just guessing whether something landed.

And if none of this explains what you're looking at, just come and ask us —
Discord or a support ticket, either works.

## The short version

A patch that fails to get created is Shorebird protecting you from shipping
something it can't verify. A patch that fails after going live is rare, and when
it happens, the app falls back to the last version that actually worked — never
anything broken. Native changes are the most common reason a patch won't create
in the first place; build environment drift is the one most likely to catch you
by surprise. Pinning your tooling is the quickest fix for that second issue
specifically.
