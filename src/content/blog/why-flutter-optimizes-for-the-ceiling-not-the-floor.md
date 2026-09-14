---
title: Why Flutter optimizes for the ceiling, not the floor
author: eseidel
description:
  Most frameworks optimize for the floor. Flutter optimized for the ceiling, and
  that changes everything.
date: 2026-05-28
cover: why-flutter-optimizes-for-the-ceiling-not-the-floor.png
intro:
  Most frameworks optimize for the floor. Flutter optimized for the ceiling, and
  that changes everything.
readingTime: 5 min read
ogImage: '/blog/og/why-flutter-optimizes-for-the-ceiling-not-the-floor.png'
seoTitle: Why Flutter Optimizes for the Ceiling, Not the Floor
seoDescription:
  ost cross-platform frameworks trade the ceiling for a faster floor. Flutter
  made the opposite bet and it's why you never have to say no to your designer.
---

<!-- Converted from the Webflow CMS export by scripts/import_webflow.py -->

Every UI platform has a floor and a ceiling. The floor is what you get out of
the box without trying. The ceiling is what's possible if you push as hard as
you can.

These usually trade off. A low-level language like C/C++ gives you a high
ceiling with direct hardware access and no abstractions in your way. But the
floor is brutal. Getting "Hello, World" on the screen takes real work. Low-code
tools sit at the other end of the spectrum. You can drag a button onto a canvas
and have a working app in thirty seconds. But the ceiling is low. You can't push
past what the toolkit gives you.

The web is interesting because it splits the difference, but unevenly depending
on what is being delivered. The floor for documents is incredible: type a
string, get text rendered with selection, scrolling, font fallback,
accessibility, all of it. The ceiling for documents is also pretty high, as
sites like [exat](https://exat.hottype.co/) and the gallery at
[CSS Design Awards](https://www.cssdesignawards.com/) show. The floor for
applications is decidedly meh. You can build a CRUD form fast, but trying to go
beyond that takes a lot of work, even with modern frameworks. The web’s ceiling
for apps is much lower than dedicated app platforms (e.g. mobile).

None of this is a knock on the web. I worked on the web for over a decade, and I
love what it does best: you open a URL and it's just there, no install, the same
link working for everyone. But the low ceiling for apps was a constant headache
for those of us on Chrome, and led us to start Flutter — bringing the web's
“works everywhere,” but with a much higher ceiling and better layering than was
possible on the web.

## Flutter chose the ceiling

Most cross-platform frameworks pick the floor. They optimize for getting a real
app running quickly and they accept that the ceiling will be lower than native.
That's why cross-platform, as a category, has a deserved reputation for shipping
apps that feel slightly off.

Flutter inverted that. It cared foremost about mobile, where user expectations
were highest, and from the start our goal was to protect the ceiling at all
costs. If the ceiling slipped, Flutter would collapse into the same space every
other cross-platform framework already lives in, where the answer to "can I make
this feel as good as native?" is always _almost_. You can see the difference in
what ships: [Flutter showcase](https://flutter.dev/showcase) is full of
beautiful apps for all sorts of activities and form factors:
[airlines](https://developers.googleblog.com/en/celebrating-flutters-production-era/),
[cars](https://flutter.dev/showcase/bmw),
[hospitality](https://flutter.dev/showcase/mgm-resorts),
[finance apps](https://verygood.ventures/blog/how-sofi-scales-mobile-engineering-with-flutter-and-ai/),
and much more.

Even Flutter's
[six-line Hello World](https://github.com/flutter/flutter/blob/master/examples/hello_world/lib/main.dart)
hands you `main()`: the entry point is yours, and you decide what runs before
the first frame. The web's version is shorter only because there's nothing to
hand you. You're inside a document the browser owns, with no `main` of your own.

So how does Flutter hold a ceiling the host platform can't? By not standing on
the host platform. Those frameworks wrap the OS's native widgets, which caps
them at whatever those widgets already do. Flutter goes straight to the
hardware: it brings its own engine and draws every pixel itself, talking to the
GPU directly, with none of the platform's UI in between. That's also why a
Flutter app behaves the same everywhere. It's one high-quality stack on every
platform, not a thin shim over five different ones.

## Why the ceiling mattered

We had spent years failing to make Google's apps feel as good on the web as we
wanted. When we started Flutter, we happened to be seated right next to the
Material Design team. We were constantly exposed to remarkable designers
building amazing designs. As we’d seen on the web, designers would come up with
mockups of cards merging and splitting, soft shadows tracking light sources,
motion that felt like it had weight. But then the actual Material
implementations would fall short. Even on these “native” mobile platforms.

The limitation wasn't hardware or imagination. The limitation was the framework.
The existing UI frameworks couldn't express what the designers wanted, so the
designers had to back down and Google was forced to ship watered down versions
of past announcements, rather than everything the hardware could do or the
designers imagined.

Sitting with those designers helped produce one of Flutter's principles: _if you
choose Flutter, you should never have to say no to your designer._

## Great ceilings are layered

One thing Flutter got right is that it's layered. You can drop down through the
layers and replace what you need to. Most people work at the highest layers,
which is great, but the lower layers are always right there for you to access,
and that access is what lets you build any experience you can dream up. It's why
you never have to say no to your designer.

This “give developers access” lesson came from hard experience. The earliest
version of Flutter was a fast mode for the web: take the web, cut away the slow
parts, keep the fast core. This “cut to make it fast” approach held up until we
needed to rebuild something like copy-paste out of web primitives, and there
simply were none. The clipboard, the selection model, the undo stack exist on
the web as a high-level monolith. You use the whole thing or you build from
nothing, because there is nothing underneath. A platform with no low-level layer
can't be taken apart and reassembled, which is exactly what a layered framework
lets you do.

The web is full of black-box features with no layers to explain them or rebuild
them from. `contenteditable` is one HTML attribute that gives you an entire text
editor: selection, undo, IME, paste handling, accessibility. If you want one
part of that editor to behave differently — your own undo semantics, your own
selection model — you can't reach in. The platform hands you the whole editor,
or it hands you a raw `<canvas>`, and there's almost nothing in between you can
use to assemble your own. The web's API surface is structurally uneven:
extremely high-level baked-in features on one end, extremely low-level
capabilities on the other, no real path through the middle.

We weren't alone in noticing this. In 2013, others working on the web saw the
same. Brendan Eich, Yehuda Katz, Alex Russell, Tab Atkins, Paul Irish, and
others published the
[Extensible Web Manifesto](https://github.com/extensibleweb/manifesto). They
argued the platform should expose low-level capabilities that explain its
high-level features, so developers can understand, replicate, and extend them.
Thirteen years later, the manifesto's argument mostly hasn't been adopted. The
web's high-level APIs are still mostly monoliths sitting on top of nothing a
developer can reach. This doesn’t make the web bad, per se, but it does mean the
industry continues to desperately need a fuller multi-platform solution, hence
Flutter.

Flutter's layers actually compose, but we didn't get this perfect out of the
gate. Material and Cupertino each ended up reimplementing the basics every
design system needs (selection, focus, gestures) because there was no shared
layer beneath them. But the principle holds, and we keep acting on it: Flutter
is just concluding a year-long effort to extract that missing layer and give you
more control over what a design system is built from. That shared layer landed
in
[Flutter 3.44](https://blog.flutter.dev/whats-new-in-flutter-3-44-b0cc1ad3c527),
decoupling Material and Cupertino from the core
([tracking issue](https://github.com/flutter/flutter/issues/101479)).

## The ceiling wins

The ceiling is why Flutter exists. The reason to build a new framework was that
the existing options couldn't make fantastic experiences possible without
forcing you to write everything natively from scratch.

The thesis in one sentence: fantastic experiences must be possible. Not common,
not default, not effortless. Possible. If your designer drew it, your engineer
should be able to build it. If your app needs to feel as good as the best native
software on the platform, it should.

Both ends of the curve can be optimized for quality. But of the two, the ceiling
is the one we couldn't compromise. Lower the ceiling and there is no reason for
the framework to exist.
