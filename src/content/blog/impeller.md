---
title: Impeller for Flutter and why it matters
author: eseidel
description:
  Explain why Flutter created impeller, what it does and why it matters.
date: 2025-05-12
cover: how-we-built-code-push-cover.png
---

# Impeller for Flutter and why it matters

## Lessons from JavaScript

10 years ago, Google faced a problem.  Teams were forced to choose “write twice
to get quality” (native development) or “write once, but get a poor result”
(various other multi-platform attempts).  Flutter was created to solve this
false choice.

<img
src=https://www.commitstrip.com/wp-content/uploads/2014/08/Strip-dileme-appli-mobile-650-Finalenglish3.jpg
/>

Source:
https://www.commitstrip.com/en/2014/08/18/the-dilemna-of-mobile-apps-development/?

Flutter started as a fork of Chrome.  It originally used markup, javascript,
CSS, etc, over time it shed all of those.  In fact, we wrote [3 versions of
Flutter in
JavaScript](https://docs.google.com/presentation/d/1Yhch7KkNC5wbkcsc9p5XkWouEha2hex65l6Pca_SqkM/edit?slide=id.g12f1f798c70_0_53#slide=id.g12f1f798c70_0_53).
We wanted the framework developers used to be built in the same language they
wrote their apps in, so they could read and change it as they needed.  As a
result we built Flutter’s core systems in JavaScript. Unfortunately, while
JavaScript has been made fast on desktop machines, on iOS is forced to use an
interpreter (outside of Safari) and interpreters are slow.  When we ported
Flutter to iOS we saw apps took *twelve seconds* to launch!  That revelation
forced us to move off JavaScript.

To fix this, we rewrote [Flutter in
Dart](https://www.youtube.com/watch?v=PnIWl33YMwA&ab_channel=GoogleforDevelopers).
Dart was similar to JavaScript, but offered strong types and an “ahead of time”
compilation option, whereby instead of compiling (or interpreting) the
application’s code on the device, it was compiled into “machine code” ahead of
time on the developers’ machine.  These compiled apps launched instantly on the
users devices, just like mobile apps should.

## A fit-to-purpose mobile graphics framework

Flutter’s ambition was to take the portability of the web, but mix it with the
quality of mobile frameworks. We succeeded, but had to move off the web’s
language (javascript) in the process and move from on-device, just-in-time (JIT)
compilation to ahead-of-time (AOT) compilation to do so.

A similar story has been playing out since in graphics.  Modern graphics use
programs called “shaders” that run on the GPU.  Like the rest of the app, these
shaders can either be compiled ahead of time (AOT), or generated and compiled on
demand (JIT).  Flutter’s graphics backend, Skia, was originally built for, and
is still used by Google Chrome.  Chrome is constantly asked to render different
web pages. As such, Skia is designed to adapt on-the-fly, for each page and
builds unique “shaders” as part of rendering each page.  These “shaders” are
cached after being built and shared between web pages, so even if there is a
small amount of time spent building a shader for the very first page, you never
notice.  However when used within Flutter for mobile apps, expectations are very
different.  This initial “compile” of these shaders happens either during
application launch or when a page is first shown.  Since there are no other
“pages” to share these shaders with, they’re not pre-cached, and app startup and
page rendering is delayed by this compilation.  These stalls in the application
to do this shader compilation we refer to as “jank”.


Flutter tried many ways to work around this issue (and worked extensively with
the Skia team to do so), but in the end, like the decision to move off
JavaScript, to something more fit for mobile, so too, Flutter has moved off of
Skia to something fit-to-purpose for mobile.  This new graphics backend is
called “Impeller” and is custom built for Flutter.  Impeller has many
optimizations specific to rendering mobile apps, but one of the most important
ones is that all shaders are built on the developers machine rather than the
device, thus removing this source of stalls.  This “ahead of time” compilation
of shaders matches what other mobile frameworks, like UIKit do.

### Why is all this so hard?

You might ask yourself, why is all this so hard? Why do apps don’t have to think
about using a custom graphics stack? Isn't this a solved problem? The complexity
comes from portability.  Flutter’s goal was to marry the portability of the web
with the quality of mobile.  To be portable, we have to bring our own tools to
speak to the underlying hardware. Portability had been solved with the web, but
the web was designed for a world of desktop. Performance had been achieved on
mobile, but mostly through proprietary, non-portable solutions. While Flutter
has started with Web solutions to problems we've learned it's often been simpler
to build our own solutions specifically fit-to-purpose on mobile. And that's
what we've again done for graphics.

So what does a graphics library like Skia or Impeller do?  Well, the biggest
part is portable performance.  All of these devices have different underlying
hardware.  And it’s the job of the graphics library, to figure out how when it
draws a circle, to draw that circle in the most efficient way with the
underlying hardware, while not having to make the code above the graphics
library, care exactly how that happened.

If you want access to graphics/compute accelerators on the device, you need to
go through a client API like Vulkan, OpenGL, Metal, DirectX, etc. Rendering
engines like Impeller, Skia, Rive, ThreeJS all have the same concern. The client
APIs are extremely low-level, not particularly platform agnostic and difficult
to target/maintain. If you are lucky, you can get away with targeting just one
client API. Sometimes, these APIs can be layered on top of another (OpenGL on
Vulkan/Metal) but that abstraction can become costly and awkward in different
ways.  The best solutions always talk directly to these low level APIs when
possible.

### Dawn & WebGPU

To be clear, there have been many attempts at abstraction at different layers.
Skia can be seen as one attempt, OpenGL is another (at a lower level) and more
recently there has been a lot of popularity around WebGPU, a.k.a Dawn/wgpu.rs,
which purports to be a sensible/portable abstraction layer over the client APIs.
Those of us focused on the application or rendering layer, having a ready-to-use
abstraction is certainly attractive.  Instead of doing the same thing multiple
times, you just target one API and let that library take care of the rest.

In practice, there are a few practical considerations that make Flutter not
quite be able to use Dawn directly. For one, the binary size of the library is
larger than the entire Flutter Engine. While Flutter has probably over-indexed
on binary size, more than doubling Flutter's binary overhead (for all billions
of Flutter app installs around the world) would be a tough pill to swallow.
Also, going through yet another abstraction would prevent us from being able to
use latest features of the client API we otherwise might exploit for performance
(framebuffer-fetch, AFRC, etc). We would either have to wait for official
support for it in Dawn or poke holes in the API which increases our support
surface and in part defeats the purpose of using someone elses abstraction.
Regardless, having a WebGPU backend for Flutter is something we have and will
continue to experiment with.  (TODO Link to WGSL experiments.)  But, for the
foreseeable future now, we are in a situation where a WebGPU backend will be
in-addition-to the other backends and not instead-of.

But you were talking about the application layer and not middleware. Flutter
does have the ability to poke a hole in the middleware for applications to
support specific rendering use-cases. For instance, Rive uses it to render into
a texture using client APIs directly. But as soon as you attempt to do your own
rendering, you hit a steep usability cliff where you need to support all client
APIs portably. And WebGPU starts looking like just the thing you need. FWIW, can
write bindings to WebGPU using the plugin model with FFI and use those bindings
to write a renderer that renders to a texture that gets composited in a Flutter
application. But it's going to be very hard. And you’ll likely lose the benefits
of stateful hot-reload and all the other developer affordances that are part of
Flutters value proposition. This exposition is to say Impeller can use WebGPU
but likely won't for the foreseeable future, and the application needs something
like WebGPU but WebGPU itself is unlikely to give you a sufficiently delightful
developer experience when working with 3D rendering (TODO link to OpenGL ES demo)

## Flutter and 3d

In my opinion, the most pressing issue today is that there is no way to create a
delightful 3D renderer in Flutter without also first escaping from Flutter. That
an escape hatch exists is missing the point. Talking about how someone could use
WebGPU once they use that escape hatch even more so. Personally, I am really
excited about Flutter GPU to address that specific issue. It would expose a
really low-level (but still Dart) interface to accelerators in a portable
manner. Package authors will then be able to write renderers in Dart (similar to
ThreeJS) that integrate well with existing Canvas APIs (no platform views, no
texture composition, etc). The progress is compelling but slow given current
resource constraints on the team.

All this is to say, if you are really excited about WebGPU, you should write
bindings to it. I don’t think anyone has licked that cookie. I am not excited
about it not because it’s not possible to write those bindings, but because the
developer experience in the best case would be meh.

### Impeller Rollout

You may have noticed that Flutter has already been rolling out Impeller across
various platforms.  This started first with iOS (since the need there was most
dire) and continued on to Android late in 2024.  That rollout has not been
without issue, in particular on Android.

On the rollout, we did see some unfortunate issues that went
unnoticed/unreported over an extended preview period (3.16 to 3.27) as well as
beta channels. And we have patched the reported issues already with a flag still
in place to unblock anyone who runs into any more unexpected issues. All in all,
I think we have a good handle on the issues and the rollout in general. I do
think we committed an own-goal by also enabling the use of surface controls for
a better platform views strategy on Android. While the use of surface controls
needs Impeller, Impeller itself can work without surface controls. We were going
to flip the Impeller default one release before we did but a last minute blocker
with video playback made us push it back. And the next release coincided with
the use of surface controls. If I had a crystal ball about a year ago, I would
have made sure the video playback issues were tackled in a timely manner so just
the Impeller release (without surface control use) would have been the change in
3.24 . But that's hindsight. Fortunately, this is the only time we have swapped
a renderer in 10 years.

