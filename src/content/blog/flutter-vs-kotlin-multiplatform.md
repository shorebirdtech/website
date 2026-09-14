---
title:
  'Flutter vs. Kotlin multiplatform: Choosing the right cross-platform
  architecture in 2026'
author: shorebirdtech
description: 'Flutter vs. Kotlin Multiplatform: 2026 Architecture Guide'
date: 2026-04-16
cover: flutter-vs-kotlin-multiplatform.png
intro: 'Flutter vs. Kotlin Multiplatform: 2026 Architecture Guide'
readingTime: 5 min read
ogImage: '/blog/og/flutter-vs-kotlin-multiplatform.png'
seoTitle: 'Flutter vs. Kotlin Multiplatform: 2026 Architecture Guide'
seoDescription:
  Compare Flutter and Kotlin Multiplatform in 2026. Explore rendering, native
  interop, and deployment velocity to choose the right cross-platform
  architecture.
---

<!-- Converted from the Webflow CMS export by scripts/import_webflow.py -->

[Compose Multiplatform for iOS reached stable in 2025](https://www.jetbrains.com/lp/compose-multiplatform/).
[Flutter's Impeller renderer](https://docs.flutter.dev/perf/impeller) became the
default on both iOS (Flutter 3.10) and Android (Flutter 3.19). With both
frameworks past the production-readiness threshold, the architectural question
you're resolving when you choose between them is where you want shared ownership
to live: in the render layer or in the logic layer.

The answer depends entirely on your existing codebase, team composition, and
deployment constraints. This article works through each dimension so you can
make a defensible call.

## The Flutter vs. KMP Architecture Divide

[Flutter](https://flutter.dev/) and
[Kotlin Multiplatform](https://kotlinlang.org/docs/multiplatform.html) take
structurally different bets about what "shared" means.

Flutter owns the entire render layer.
[Impeller](https://docs.flutter.dev/perf/impeller) compiles rendering commands
directly to GPU primitives using
[Metal on iOS](https://developer.apple.com/metal/) and
[Vulkan on Android](https://developer.android.com/ndk/guides/graphics/getting-started),
with fallback to the legacy OpenGL renderer on unsupported Android
configurations. Every widget in your Flutter app, from a `Text` widget to a
custom animated card, runs through Dart and Impeller with zero platform UI
involvement. The output is pixel-perfect across platforms. A Flutter app on iOS
can feel subtly foreign when your design calls for platform chrome (native date
pickers, share sheets, or system navigation transitions).

KMP shares the business logic layer and lets each platform own its UI. Your
ViewModels, repositories, and networking code live in `shared/`, compiled to
Kotlin/JVM for Android and to a native ARM binary via
[Kotlin/Native](https://kotlinlang.org/docs/native-overview.html) for iOS. The
UI layer is entirely up to you. You can write SwiftUI or UIKit on iOS and
Jetpack Compose on Android, or push further and use
[Compose Multiplatform](https://www.jetbrains.com/lp/compose-multiplatform/) to
share the UI layer too, though that option carries its own rendering tradeoffs
covered in the next section.

In Flutter, a custom call-to-action button is a self-contained widget that
renders identically on both platforms:

```dart
class PrimaryButton extends StatelessWidget {
  const PrimaryButton({
    super.key,
    required this.label,
    required this.onPressed,
  });

  final String label;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: const Color(0xFF1A73E8),
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
      ),
      child: Text(
        label,
        style: const TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.w600,
          color: Colors.white,
        ),
      ),
    );
  }
}

```

In KMP, the equivalent feature ships as a ViewModel in `shared/` consumed by a
platform-specific UI binding. On the iOS side, [SKIE](https://skie.touchlab.co/)
transforms a Kotlin `StateFlow` into a native Swift `AsyncSequence`:

```swift
// iOS UIViewController consuming a KMP shared ViewModel
import UIKit
import shared // KMP module

class DashboardViewController: UIViewController {
    private let viewModel = DashboardViewModel()

    override func viewDidLoad() {
        super.viewDidLoad()
        // SKIE exposes viewModel.uiState as a Swift AsyncSequence
        Task {
            for await state in viewModel.uiState {
                updateUI(with: state)
            }
        }
    }

    private func updateUI(with state: DashboardUiState) {
        // SwiftUI or UIKit rendering, fully native
    }
}

```

The `DashboardViewModel` compiles to a native ARM binary. The iOS team consumes
it through idiomatic Swift with no awareness of the Kotlin internals. The
Android team writes plain Kotlin and the iOS bindings are generated
automatically. Each team works in their native language and their native build
system, and the only shared surface is the compiled binary.

## Rendering and Performance: Flutter Impeller vs. Compose Multiplatform on iOS

[Impeller](https://docs.flutter.dev/perf/impeller) was designed to eliminate a
specific and well-documented Flutter performance problem: runtime shader
compilation. Flutter's older rendering path could compile shaders on-demand
during first use, producing visible jank during initial animation runs. Impeller
addresses this by precompiling a smaller, fixed set of shaders and building
pipeline state objects up front. Flutter 3.10 made Impeller the default on iOS
and later releases made it the default on Android API 29+. Teams targeting 60fps
or 120fps on ProMotion displays get consistent frame timing from day one, with
the shader warm-up period eliminated entirely.

[Compose Multiplatform on iOS](https://www.jetbrains.com/lp/compose-multiplatform/)
uses a different rendering path. It draws through
[Skiko](https://github.com/JetBrains/skiko), which brings Skia into the
Kotlin/Native-based iOS stack,, rather than rendering through UIKit directly.
The visual output is accurate and the iOS stable release in 2025 makes it
production-usable for a meaningful category of apps. Teams with heavy custom
animation work should benchmark their specific use cases before committing,
since this rendering path introduces its own characteristics that differ from
both Impeller and native SwiftUI rendering.

Flutter's rendering consistency is the decisive factor for animation-heavy apps,
fintech products that require pixel-perfect cross-platform UI parity, and design
systems that must render identically across iOS, Android, web, and desktop. For
utility apps where the primary interaction model is scrolling lists and forms,
the rendering delta between Impeller and Skiko matters less than whether those
lists feel native to the platform.

The performance ceiling for KMP with native
[SwiftUI](https://developer.apple.com/swiftui/) is the iOS platform itself.
SwiftUI animations, spring physics, and navigation transitions all run on the
native rendering stack with no abstraction penalty. Your iOS UI code has no
Kotlin equivalent, which means two implementations every time you ship a new
animated interaction.

## Native Interop: Method Channels, FFI, and Direct Swift Interop

Flutter provides three common interop mechanisms with increasing integration
depth:
[method channels](https://docs.flutter.dev/platform-integration/platform-channels)
for calling platform APIs from Dart,
[Dart FFI](https://dart.dev/interop/c-interop) for C libraries, and
[platform views](https://docs.flutter.dev/platform-integration/android/platform-views)
for embedding native widgets inline.

Method channels are untyped by default, which makes them error-prone at scale.
[Pigeon](https://pub.dev/packages/pigeon) generates type-safe Dart, Swift, and
Kotlin bindings from a shared interface definition, eliminating an entire
category of runtime crashes that come from mismatched channel payloads. A Pigeon
definition for biometric authentication follows this shape:

```dart
// biometric_api.dart (Pigeon definition)
@HostApi()
abstract class BiometricApi {
  @async
  BiometricResult authenticate(BiometricRequest request);
}

class BiometricRequest {
  BiometricRequest({required this.reason});
  final String reason;
}

class BiometricResult {
  BiometricResult({required this.success, this.errorCode});
  final bool success;
  final String? errorCode;
}

```

Running `dart run pigeon --input biometric_api.dart` generates Dart, Swift, and
Kotlin files with matching type signatures. Each platform still needs a manual
implementation behind the generated interface, but the channel contract is
compile-time verified on all three sides.

[KMP's `expect`/`actual` pattern](https://kotlinlang.org/docs/multiplatform-expect-actual.html)
with
[Kotlin/Native interop](https://kotlinlang.org/docs/native-overview.html#interoperability)
takes a different approach. The shared module declares the interface, and each
platform compiles its own native implementation:

```kotlin
// shared/src/commonMain/kotlin/BiometricAuth.kt
expect class BiometricAuth() {
    suspend fun authenticate(reason: String): BiometricResult
}

data class BiometricResult(
    val success: Boolean,
    val errorCode: String? = null
)

// shared/src/iosMain/kotlin/BiometricAuth.ios.kt
import platform.LocalAuthentication.LAContext
import platform.LocalAuthentication.LAPolicyDeviceOwnerAuthenticationWithBiometrics
import kotlin.coroutines.suspendCoroutine

actual class BiometricAuth() {
    actual suspend fun authenticate(reason: String): BiometricResult =
        suspendCoroutine { continuation ->
            val context = LAContext()
            context.evaluatePolicy(
                LAPolicyDeviceOwnerAuthenticationWithBiometrics,
                localizedReason = reason
            ) { success, error ->
                continuation.resumeWith(
                    Result.success(BiometricResult(success, error?.localizedDescription))
                )
            }
        }
}

```

The iOS implementation calls
[`LAContext`](https://developer.apple.com/documentation/localauthentication/lacontext)
directly through Kotlin/Native's imported Apple platform APIs. The Android
`actual` class calls
[`BiometricPrompt`](https://developer.android.com/reference/androidx/biometric/BiometricPrompt)
directly through the Android SDK. The `expect/actual` declarations are the main
abstraction layer, while each platform keeps a real native implementation behind
them.

For standard platform calls (camera, permissions, location, sensors), Flutter's
method channels with Pigeon cover the use case well and the performance overhead
is negligible. KMP's direct platform access becomes the clearer choice when your
shared logic makes frequent platform API calls, or when the iOS team already
owns Swift implementations you want to reuse in the shared module.

## Ecosystem and Tooling: pub.dev vs. the Kotlin/JVM Universe

[pub.dev](https://pub.dev/) lists over 65,000 packages. Coverage for standard
mobile use cases (camera, maps, push notifications, analytics SDKs) is broad and
actively maintained. The uneven areas are desktop and web plugins, where many
packages are thin method-channel wrappers with incomplete platform
implementations. If your product targets
[Flutter Web](https://docs.flutter.dev/platform-integration/web) or Flutter
desktop, audit package support before committing to a dependency, because the
delta between mobile plugin quality and desktop plugin quality is real.

KMP rides the Kotlin/JVM ecosystem for Android-side libraries.
[Ktor](https://ktor.io/) for HTTP,
[SQLDelight](https://cashapp.github.io/sqldelight/) for multi-platform
persistence, [Koin](https://insert-koin.io/) for dependency injection, and
[Retrofit](https://square.github.io/retrofit/) for Android-only API clients all
work on the Android side of a KMP project without modification. iOS
multiplatform support in the Kotlin ecosystem is narrower: Ktor and SQLDelight
both support iOS, but a large share of Kotlin libraries predate KMP and haven't
added iOS targets yet.

From a tooling perspective, Flutter's CLI gives you a single top-level build
surface. `flutter run`, `flutter build ios`, `flutter build apk`, hot reload,
and hot restart all sit behind one command-line interface, even though
platform-specific tooling such as Xcode and Gradle still sits underneath for
signing and release builds. KMP requires
[Android Studio](https://developer.android.com/studio) for the Kotlin side and
[Xcode](https://developer.apple.com/xcode/) for the iOS side, two native
toolchains in CI, each with its own signing setup, build cache, and failure
mode. A typical KMP CI pipeline involves a Gradle task for the Android APK and
an Xcode archive for the iOS IPA running in sequence or parallel. When a build
breaks, triaging which half of the pipeline caused it adds time to every
incident.

On hiring: [Dart](https://dart.dev/)'s syntax is accessible to engineers coming
from JavaScript, Swift, or Java backgrounds, and the global Flutter developer
pool is large. KMP requires Kotlin fluency, which is strong on Android-first
teams but creates a skills delta when you need iOS engineers who can read and
contribute to shared business logic.

## Flutter vs. KMP: Use-Case Decision Matrix

| Signal                                                             | Recommended choice  |
| ------------------------------------------------------------------ | ------------------- |
| Greenfield project                                                 | Flutter             |
| Large existing Android Kotlin codebase                             | KMP                 |
| Need identical UI on iOS, Android, web, and desktop                | Flutter             |
| Native iOS UX fidelity required                                    | KMP + SwiftUI       |
| Shared domain logic across mobile and a Kotlin backend             | KMP                 |
| OTA deployment or post-release hotfixes are a business requirement | Flutter + Shorebird |

## Deployment Velocity: The Flutter OTA Advantage KMP Can't Match

Both frameworks require a full binary submission for any release-channel change
(Gradle builds for Android, Xcode archives for iOS), with
[standard App Store review timelines](https://developer.apple.com/distribute/)
ranging from one to seven days.

Flutter's structural deployment advantage comes from how Dart compiles. Flutter
release builds are AOT-compiled Dart, and
[Shorebird CodePush](https://shorebird.dev/product/code-push) patches the app's
Dart code at the engine/runtime level, delivering updated bytecode directly to
installed apps. Users get the fix on their next app launch with no App Store
review. Shorebird built this capability on a fork of the Flutter engine itself,
which is why it operates at the binary level rather than as a scripted
JavaScript bundle or a plugin injection.

KMP compiles to native ARM code via Kotlin/Native on iOS.
[Apple's policies](https://developer.apple.com/app-store/review/guidelines/#software-requirements)
prohibit dynamically replacing native code in an App Store app, and there's no
equivalent patching mechanism for native ARM binaries. A KMP app with a critical
bug post-release goes through the same submission and review queue as any native
iOS app.

The operational difference becomes concrete on a Friday afternoon when you
discover a payment flow regression in production. On a Flutter app with
Shorebird, the fix workflow is:

```
Fix the bug in Dart, then:
shorebird patch --platform=android
shorebird patch --platform=ios
```

The patch uploads in seconds and reaches all users on their next app launch. On
a KMP project, the same bug requires a full rebuild, signing, submission, and
review, typically one to three business days even for expedited submissions.

[Shorebird CI](https://shorebird.dev/product/shorebird-ci) pairs with CodePush
to close the deployment loop: zero-config CI that runs checks only on the
affected nodes in a monorepo, plus instant OTA patching once a build is verified
safe to ship. The combination gives Flutter teams a release cycle with no KMP
equivalent, and no generic CI tool is architected to provide it because no
generic CI tool owns the Flutter engine layer the way Shorebird does.

## How to Choose Between Flutter and Kotlin Multiplatform

Three signals determine the answer.

If you have a large Android Kotlin codebase and your iOS product is already in
the market, start KMP by migrating ViewModels and repositories to `shared/`
before committing to Compose Multiplatform across both platforms. Moving the
logic layer is lower risk than rewriting both UIs simultaneously, and you can
adopt Compose Multiplatform incrementally once the logic layer is stable.

If your product requires deep native iOS UX (share sheet integration, native
navigation with SwiftUI's
[`NavigationStack`](https://developer.apple.com/documentation/swiftui/navigationstack),
platform-specific animation curves, or
[ARKit](https://developer.apple.com/augmented-reality/arkit/)), KMP with native
SwiftUI on iOS is the lower-friction path. Achieving that level of platform
fidelity in Flutter requires platform views and method channels that add
complexity proportional to how far you push them.

If your team needs OTA patching for Flutter code, wants to maintain a single UI
codebase across mobile and web, or is starting a greenfield product with no
Kotlin investment to carry forward, Flutter is often the stronger choice. If you
already have a Flutter project, Shorebird can usually be integrated in just a
few minutes (just run `shorebird init`!) and added to your existing release
workflow, giving you a path to ship your first OTA patch without going through
App Store review for the patch itself.
[Get started free at shorebird.dev](https://shorebird.dev/).

## Frequently Asked Questions

### Is Flutter or Kotlin Multiplatform better for a new mobile project in 2026?

For greenfield projects with small teams (under 8 engineers) and no existing
Kotlin codebase, Flutter is generally the faster path to production. You get a
single codebase, one CLI, hot reload, and OTA update capability via Shorebird.
KMP is the stronger choice when you already have substantial Android Kotlin
business logic you want to share with an iOS app.

### Can Kotlin Multiplatform share UI code across iOS and Android?

Yes.
[Compose Multiplatform](https://www.jetbrains.com/lp/compose-multiplatform/)
reached stable for iOS in 2025 and allows you to share Jetpack Compose UI code
across Android and iOS. It renders through Skiko, which is Skia bound to Metal
via a Kotlin/Native layer, and teams with heavy animation requirements should
benchmark their specific use cases before committing.

### Does Flutter support over-the-air (OTA) app updates?

Yes. [Shorebird CodePush](https://shorebird.dev/product/code-push) enables OTA
updates for Flutter apps on both iOS and Android. It patches the compiled Dart
interpreter at the binary level, delivering fixes to users on their next app
launch through a direct OTA delivery mechanism. On Kotlin Multiplatform apps for
iOS, the App Store review cycle applies to every fix because Apple's guidelines
prohibit dynamically replacing native ARM code.

### What is Flutter Impeller and why does it matter?

[Flutter Impeller](https://docs.flutter.dev/perf/impeller) is Flutter's modern
rendering engine, replacing the legacy Skia-based renderer. It eliminates
runtime shader compilation jank by pre-compiling a fixed set of GPU pipelines at
framework build time. Impeller became the default on iOS in Flutter 3.10 and on
Android in Flutter 3.19, delivering consistent 60fps and 120fps frame timing
from the first frame.

### How does Kotlin Multiplatform handle iOS-specific platform APIs?

KMP uses the
[`expect`/`actual` pattern](https://kotlinlang.org/docs/multiplatform-expect-actual.html)
combined with
[kotlinx-cinterop](https://kotlinlang.org/docs/native-c-interop.html) to call
iOS platform APIs directly from Kotlin. Your shared module declares an `expect`
interface, and the `iosMain` source set provides an `actual` implementation that
calls native frameworks like `LAContext` or `AVFoundation` with direct memory
access. Libraries like [SKIE](https://skie.touchlab.co/) further bridge Kotlin
coroutines and flows into idiomatic Swift `AsyncSequence` types.
