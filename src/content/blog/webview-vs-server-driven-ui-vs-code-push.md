---
title:
  'Not all Flutter app updates are the same: WebView vs server-driven UI vs Code
  Push'
author: eseidel
description:
  WebView, server-driven UI, and Code Push all let you change your app without a
  new binary — but they solve different problems and fail in different ways.
date: 2026-08-31
cover: webview-vs-server-driven-ui-vs-code-push.png
intro:
  WebView, server-driven UI, and Code Push all let you change your app without a
  new binary — but they solve different problems and fail in different ways.
readingTime: 8 min read
ogImage: '/blog/og/webview-vs-server-driven-ui-vs-code-push.jpg'
seoTitle: WebView vs Server-Driven UI vs Code Push
seoDescription:
  Compare WebView, server-driven UI, and Code Push for updating Flutter apps
  without a new release — what each is good at, and where it falls short.
---

<!-- Converted from the Webflow CMS export by scripts/import_webflow.py -->

If you want to change your app without shipping a new binary, you have three
real options: embed a WebView, drive part of your UI from a server, or replace
the code in the running app. People often treat these as three flavors of the
same thing. They aren't. They solve different problems, they fail in different
ways, and only one of them can fix a bug you didn't see coming.

Here's how we think about the tradeoffs.

## WebView

A WebView is a browser embedded in your app. It predates the app stores, and
it's still the most common way teams put server-controlled content in front of
users. Settings screens, login flows, terms of service, help centers, marketing
pages — if you've shipped a mobile app, you've probably shipped a WebView.

WebViews are genuinely good at one thing: showing documents. The web is the best
document rendering system ever built. If you're an insurance company and you
need to show a policy, or you have a legal agreement that must be identical and
current across every version of your app and your website, a WebView is the
right answer. You update one page and every install, back to the oldest version
still in the wild, sees the change.

WebViews are bad at UI. Scrolling feels wrong. Taps feel wrong. Spacing and type
don't match the rest of your app. You can fix all of that with enough work, but
it is genuinely hard work, and the failure mode is worse than ugly — it's
confusing. The screen looks like your website instead of your app, and users
notice the seam even when they can't name it. That risk goes up when you're
sharing the page with your web team, which is usually the whole reason you chose
a WebView.

WebViews are also expensive. A WebView is a large piece of technology, and the
cost doesn't always show up cleanly in a profile, because the web engine runs
out of process and some of it is shared with other apps on the device. That
makes it easy to underestimate. For most tasks, it's a very big hammer. Use it
when you need it, but be aware you're compromising the feel of your app and
wasting on-device resources.

## Server-driven UI

Server-driven UI covers a wide range of systems, from a CMS that populates a few
slots to a full layout engine that builds entire screens from a payload. The
common idea is that the server sends a description of the UI, and the app
renders it using the app's own widgets. In the Flutter world you'll find
[Remote Flutter Widgets (RFW)](https://pub.dev/packages/rfw) from the Flutter
team, community frameworks like [Stac](https://stac.dev/), and a long list of
in-house systems — Nubank, Airbnb, and Lyft have all built their own.

The advantages over a WebView are real. Because the server payload maps onto
your app's own widgets, server-driven screens can look and feel like the rest of
your app instead of like a webpage. These systems are built for mobile and don't
drag an entire browser along, so they're much cheaper at runtime. And in most of
them, non-engineers can make changes, which is often the actual point.

The first disadvantage is that you're now writing and maintaining your UI in two
different ways. Server-driven UI almost always comes with a bespoke authoring
format — JSON, XML, a DSL, a web editor — that isn't the language the rest of
your app is written in. Half your app is Dart, and half is whatever the payload
format is. Your tooling, your tests, your reviews, and your hiring all have to
cover both.

The second disadvantage matters more: server-driven UI can only change what's
inside the box. You have to put a widget somewhere in your tree and declare that
everything below it is server-driven. Maybe you do that in several places. But
you're deciding, in advance, which parts of your app are updatable.

That makes it close to useless as a bug-fix mechanism. You can't predict where a
bug is going to land. If the bug is outside the server-driven subtree — in a
native integration, in a third-party dependency, or in the server-driven
renderer itself — your app is broken in the wild until you get a new build
approved and distributed.

The useful mental model is an ad framework. Ad SDKs are server-driven UI: a
payload format, an editor for the marketing team, a sectioned-off region of your
app. Nobody expects to fix an app bug through their ad network, and that
expectation is exactly right for server-driven UI generally.

There's a third cost, which is that there's no standard path. Every system makes
its own tradeoffs on freshness versus load time, on what to cache, on what to
show while you wait for a round trip, on what happens on a bad network. You own
those decisions, and they're harder than they look.

Finally, most of these systems handle content well and behavior poorly. Some
support declarative actions — turn this tap into an increment of that variable —
which is useful but isn't programming. Others let you ship snippets of real
code, but in a different language from the one your app is written in, which
means every interaction between server-driven logic and the rest of your app
crosses a language boundary. React Native and other JavaScript-based stacks can
sometimes mitigate this, because the payload language and the app language are
the same. Most everyone else doesn't.

## Code push

Code push replaces code in the running application. The name comes from
Microsoft's CodePush for React Native, which swapped out the JavaScript bundle.
At Shorebird we built a code push system for Flutter, which swaps out the Dart.

The first advantage of Code Push follows directly from the section above: you
don't have to predict where your bugs are. There's no box. Code Push can replace
any Dart code in the application, so the fix goes wherever the bug turned out to
be.

The second is that there's no second technology stack. It's all Dart, and it's
the same Dart you already wrote. You don't restructure your app, you don't adopt
a payload format, and you don't add an integration layer. You build with
[shorebird release](https://docs.shorebird.dev/code-push/release/) instead of
flutter build, and you get a patchable app.

Third is performance. Code Push is designed to have no effect on how your app
runs. That's fully true on Android, macOS, Windows, and Linux. On iOS, the
platform requires us to run patched code in an interpreter, so the more of your
app you patch, the more of it runs interpreted. Patch a small fix and you'll
never notice. Patch aggressively and you can. We continue to
[tune our interpreter](https://shorebird.dev/blog/shorebirds-ongoing-performance-work)
to close that gap.

Fourth is
[security](https://shorebird.dev/blog/code-push-makes-your-app-more-secure-not-less),
and it's the one people ask about least and should ask about most. WebViews and
most server-driven UI systems trust the endpoint: whatever the server sends, the
app renders. Because Code Push can change so much more of your app, we hold it
to a higher standard. We help you sign your patches, and the app verifies the
signature against your key. If our servers were compromised, or traffic were
rerouted, your app would reject anything you hadn't signed. You're trusting your
own signature, not the identity of a server or the security of a network.

The honest downsides: it's Flutter-only, so it doesn't help native developers at
all, and on iOS there's the interpreter cost mentioned above. But otherwise it
just works, and it's free to get started, both in terms of money and process —
nothing changes about your app until you actually push a patch. Until then it's
optionality, and optionality is cheap.

## What's true of all three

Some things are shared across all three.

All three of these solutions are governed by the same
[App Store policy](https://docs.shorebird.dev/code-push/faq/#does-shorebird-comply-with-app-store-guidelines),
and they all comply with it. Apple's Developer Program License Agreement
prohibits an app from downloading or installing executable code, with one
carve-out: interpreted code may be downloaded, provided it doesn't change the
app's primary purpose away from what you advertised and submitted. That
carve-out is the basis for all three approaches. A WebView downloads and runs
JavaScript. Server-driven UI downloads a payload your app interprets. Shorebird
downloads Dart and runs it in an interpreter.
[Google Play](https://docs.shorebird.dev/code-push/faq/#does-shorebird-comply-with-play-store-guidelines)
draws a similar policy line, but also allows updates that run in a virtual
machine.

The practical upshot is that "will this get my app rejected?" has the same
answer for Code Push as it does for the WebView you already shipped. It's also
the same set of limits for all three: you can fix and change your app, but you
can't turn one app into a different app, and you can't build a storefront for
other people's code.

None of them can change native code. If the bug is in your Swift, your Kotlin,
or a native plugin, you're shipping a build.

All of them add some binary size. Not much in any single case, but a WebView
integration, a server-driven renderer, and a Code Push runtime all cost you
something before you've used them once.

And all of them add a runtime dependency on a server. That means thinking about
what your app does when the network is slow, when the payload is stale, and when
the service is down.

## Choosing the right solution

If you need to show a document that must be current everywhere, use a WebView,
and keep it out of the parts of your app where feel matters.

If you need non-engineers to control content inside your app — merchandising,
campaigns, promotions, layouts that change weekly — server-driven UI is the
right shape, and you should scope it to that.

If you want to fix bugs and ship changes to code you've already written, without
knowing in advance where those changes will be, that's Code Push. It's the only
one of the three that doesn't require you to guess right ahead of time.

These aren't mutually exclusive. Plenty of large apps run all three. The mistake
is expecting one of them to do another one's job.
