---
title: We tried to save the web
author: eseidel
description:
  See why stripping down Chrome exposed the web's limits, and how owning the
  rendering stack gives you ultimate portability.
date: 2026-04-28
cover: we-tried-to-save-the-web.png
intro:
  See why stripping down Chrome exposed the web's limits, and how owning the
  rendering stack gives you ultimate portability.
readingTime: 5 min read
ogImage: '/blog/og/we-tried-to-save-the-web.jpg'
seoTitle: 'Why Flutter exists: The problem with native app development'
seoDescription:
  Ever wonder why Flutter exists? Discover how a failed experiment to fix Chrome
  for mobile proved that you must own the rendering stack to build great apps.
---

<!-- Converted from the Webflow CMS export by scripts/import_webflow.py -->

Twelve years ago, a group of us left the Chrome team believing there had to be
something better than janky web pages and complicated Java apps for building on
mobile. We didn't set out to build Flutter. We set out to fix the web.

I want to tell that story, because it helps explain why Flutter exists, and why
the approach it takes is the only one that can go all the way.

## Deconstructing Chrome

We took Chrome and stripped it for parts. The experiment was simple in concept:
cut the browser down to the minimum and see how fast we could make it. No legacy
compatibility requirements, no committee decisions from twenty years ago to
honor, just raw rendering performance. We made our benchmarks twenty times
faster. That speed got us funded by the CEO of Google. The project was called
Razor at the time. We had no idea we were building Flutter. We thought we were
building a faster version of the web.

What we found, as we kept going, was that we couldn’t make the web amazing on
mobile. At it’s core what makes the web amazing couldn’t be extended to mobile.
The DOM, CSS, all of it, are great technologies and they've done remarkable
things, but they are pinned down by architectural decisions made more than
twenty years ago. We thought there was magic in the center of Chrome that if we
could extract we could do amazing things with.

What we found was every time we cut down to something reasonable and started to
rebuild we ran into compatibility issues and weird decisions. As we tried to
rebuild we encountered lag. Ultimately we realized we couldn’t cut our way to a
different foundation. The foundation was the product. We accepted the fact that
a replacement was needed. You can't cut your way to a different foundation.

## History repeating itself

I'd spent nearly fifteen years working on the web before that. I was on the
Safari team in the early aughts, during a transition most people have forgotten
about: CSS Form Controls. Safari, and all browsers, used to render actual native
views. You'd get a real Aqua button control, and your buttons looked different
in Safari than they did in Explorer. Then the industry moved to CSS form
controls in part to accommodate new browsers and platforms. This move finally
let authors express whatever they wanted and not defer to the operating system's
idea of what a button should look like. As part of that, we restructured the
whole system. We stopped using the native controls at all and just drew things
that looked like them.

The approaches that try to re-use "native" controls take what I'd call the
shortcut. React Native, Compose Multiplatform, Skip.tools all orchestrate native
widgets rather than owning the rendering. That's exactly how the web started. It
used to orchestrate native widgets too, and we moved away from it to remove
complexity and add control. When. you depend on "native widgets" you can't
express everything, you can't go everywhere, and when things break they break
across layers you don't control. Those same problems don't disappear because
you're doing it in a mobile framework instead of a browser. They follow you.

There is a related failure-mode, which is just mirroring on platform on another.
Remember iTunes on Windows? Internet Explorer on Mac? Both were examples of a
company porting its native stack to another platform . The result in both cases
was the same: a noticeably worse experience on the ported side. That's not a
coincidence. When you build something that is fundamentally great on one
platform and okay on another, the second platform will always feel second-class.
The team building knows which side their identity is on, leaving you without a
portable stack. It's a native stack with a thin compatibility layer on top, and
the compatibility layer will always be second-class. You're asking iOS
developers to write Kotlin. You're asking Android developers to trust Swift.
When I say the word Kotlin, you think Android. You cannot convincingly sell that
to an iOS team. And this is why building truly portable, with a stack you fully
control matters.

## Platform loyalty and developer identity

This gets at something underappreciated in conversations about portable
software: the obstacle Isn’t all technical. It's also human. Platform developers
have identities built around their platform. You regularly see this on social
media

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">10 years defending Android native development. 3 books published. Conference stages telling people cross-platform was compromise.<br><br>Then I tried Flutter from my Italian mountain town and everything I preached crumbled.<br><br>I used to think real developers wrote platform-specific code.…</p>— Ivan Morgillo (@hamen) <a href="https://twitter.com/hamen/status/2041802008340975980?ref_src=twsrc%5Etfw">April 8, 2026</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

The iOS tech lead has been iOS through and through their entire career, and
they'll tell you plainly that they'd leave the company before they'd rewrite in
Flutter. We heard that for years. It's almost religious — you commit to the
platform the way you commit to a school or a denomination. Changing feels like a
betrayal of something, even when the business case is obvious. That identity
doesn't make those engineers bad at their jobs. It just means the capitalistic
incentives of the market, where companies want to own the lions share of the
market has led to an outcome that was always more efficient for everyone
involved.

## Owning the rendering stack

Flutter's approach is the one the games industry arrived at with Unity and
Unreal. Own the entire rendering stack. Don't ask the operating system to draw
anything . Draw it yourself, consistently, everywhere. It costs more to build
(Google’s Flutter team was on the order of 30 to 40 engineers, Dart separately
another 50, with Google's continued infrastructure investment on top of that).
But when you own the stack, you can go anywhere. Flutter runs Toyota cars. It
runs LG TVs. When a new platform appears, you add support for it and every app
on Flutter gets there. You're not re-litigating the rendering question on every
new surface.

The irony is that we started trying to make the web faster and ended up
concluding it couldn't be saved. And then built the thing that, in a small way,
proved the point.The faster web we were looking for didn't come from fixing the
web. It came from replacing the parts that couldn't be fixed.

I don't say any of this to be dismissive of the web. The web is the consensus
platform. It's where most software lives and where most developers work, and
that's not changing. But there's a difference between the web as a distribution
mechanism and the web's rendering stack as a foundation for building
applications. The first is indispensable. The second has a ceiling, and we hit
it a long time ago.

We tried to save the web. We couldn't. I'm glad we found out when we did.
