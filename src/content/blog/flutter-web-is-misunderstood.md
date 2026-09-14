---
title: Flutter Web is a misunderstood product
author: eseidel
description:
  Discover the true purpose of Flutter Web, its history, and the best
  alternatives for Dart on the web.
date: 2026-04-17
cover: flutter-web-is-misunderstood.png
intro:
  Discover the true purpose of Flutter Web, its history, and the best
  alternatives for Dart on the web.
readingTime: 3 min read
ogImage: '/blog/og/flutter-web-is-misunderstood.png'
seoTitle: 'Flutter Web Explained: When to Use It (And When Not To)'
seoDescription:
  Thinking about using Flutter Web? Read this first. Learn the pros, cons, and
  ideal use cases for Flutter Web directly from the original creator of Flutter.
---

<!-- cSpell:ignore appy -->

<!-- Converted from the Webflow CMS export by scripts/import_webflow.py -->

There's been a fresh round of
[Twitter discourse](https://x.com/kentcdodds/status/2044125218239897701) about
how Flutter Web is terrible. Some of it is fair. Most of it is aimed at a
product that was never built for what the critics wanted it to do.

I started the Flutter project and led it at Google for years. I want to lay out
what Flutter Web actually is, what it's for, what it isn't for, and how it got
here. A lot of the confusion comes from the fact that "the web" means wildly
different things to different people, and Flutter Web only addresses a narrow
slice of those meanings.

## The web means too many things

When someone says "the web," they could mean the internet itself. They could
mean HTTP, or browser APIs, or the DOM, or HTML and CSS, or JavaScript, or
"pages that show up when you type a URL," or the entire open ecosystem of linked
documents and apps that took 30 years to build.

Flutter is not most of those things. It can run in some of them. But Flutter is
fundamentally a UI framework designed to render the entire screen and go
straight to the hardware. That sentence is the whole story. When you drop
Flutter into a browser, there is no hardware you can go straight to. You get the
canvas and whatever else the browser chooses to expose, and you have to make do.

So whether Flutter Web is "good" or "bad" depends almost entirely on which
definition of "the web" you had in mind when you tried it.

## A brief history (because it explains everything)

Flutter has web roots, it started as a fork of Chrome. It was built by ex-Chrome
people, we believed we could make the web better for mobile by cutting Chrome
down to a faster, leaner version. We cut away a lot. Eventually we had to start
building things back. And when we did, we hit the wall every web-adjacent
project hits: anything genuinely new we added was three years away from being
part of the platform because of the standardization process.

So we made the call to hard-fork. We stopped trying to build a faster mode of
the web and started building something new, specifically for mobile. Flutter was
never intended to run on the web, because Flutter was a reaction against the
limitations of the web.

Fast-forward about five years. Flutter is a success on mobile. A different team
inside Google decides to try porting Flutter back to the web. Dart teams wanted
to know what an evolution past AngularDart might look like, and whether they
could piggyback on Flutter's growing popularity.

They built it. The first version had an HTML backend, then it went canvas-only,
and now it's increasingly Wasm. It has evolved a lot. But the important thing is
this: **Flutter Web was never designed to render a web page. It was designed to
render a web app.**

## Where Flutter Web is the wrong choice

Let's start with the honest part, because this is where most of the Twitter
complaints come from.

Do not use Flutter Web for blogs, docs, landing pages or anything that feels
like a page. If you want a web page and are coming from JavaScript and the DOM,
don't use Flutter Web, it will feel deeply weird. It is the wrong tool, and no
amount of polishing will change that.

Do not use Flutter Web when you care about SEO. Flutter Web makes no real
attempt at SEO, and retrofitting it is a losing fight.

Do not use it when you want the user agent to handle text selection,
find-in-page, scrolling behavior, or any of the thousand things browsers give
you for free when you stay in the DOM. Flutter comes as close as it can for many
of these things, but most things the browser provides no APIs to hook into,
other than “upload a DOM” which Flutter Web doesn’t use.

Flutter Web is fundamentally capped by what the web platform exposes. This is
the same wall we hit when we tried to build a faster Chrome. Not enough of the
guts are exposed for an app framework to reach underneath them. So Flutter Web
has to either approximate platform behavior itself or silently prop up an
off-screen real DOM element (a text field, say) and wire into it. Flutter does
the same thing on iOS for the same reason. It works, but it's never going to
feel “native” to someone who expects DOM semantics.

## Where Flutter Web is actually great

Now the other side.

If you're building the next Figma which requires a full-screen, canvas-heavy app
experience where you need pixel-level control and the browser chrome is
basically in the way, Flutter Web is genuinely excellent. This is the use case
it was built for. You want to put pixels on the screen, you want gesture and
input control, you don't particularly want find-in-page or native text selection
getting in the middle of your custom interactions.

Google runs real businesses on this. Google Earth is Flutter Web. Google
Classroom is Flutter Web. Rive is Flutter Web. FlutterFlow is built in Flutter
on the web. iRobot ships complicated Flutter experiences. These are not toy
demos. They're large, complicated apps, and Flutter Web is the right answer for
them because the alternative is rebuilding the same canvas-style app three times
for three platforms.

The pattern is consistent: Flutter Web works best anywhere you could comfortably
run a browser inside a system. On desktop and Android, the browser exposes
enough low-level API that Flutter has room to operate. On iOS and on the
web-as-platform, there's less room, and you feel it.

A heuristic I use with organizations:

- If your business is **mobile-first** Flutter is built for you, and Flutter Web
  can help you, even for your public app, if you need an “appy” experience.
- If your business is **web-first**you might not even want Flutter, period. If
  you’re already in the react ecosystem, React Native can be a cheaper way to
  get something running on mobile.

Where Flutter shines is on platforms that expect an app-experience, and ideally
ones which provide the full-hardware access that Flutter is designed to run in.
Flutter runs on _any_ screen, regardless of OS or hardware, so long as it can
get access to that hardware to run on, which can’t be done on the web.

Flutter's bet is the opposite of the web's bet. The web wants you to write a
thin layer of JavaScript and lean on the user agent for everything heavy:
graphics, layout, text, DOM, networking. Your code is small; the browser is
enormous. Flutter inverts that. Flutter ships the whole stack inside your app,
written in a language the developer controls, compiled down. That's why Flutter
is portable: the rendering stack on your phone is the same stack on the desktop,
the same stack in the car, the same stack in the kiosk, the same stack in the
truck. It's also why Flutter in a browser feels heavy -- because you're loading
a whole parallel app stack on top of the one the browser already is.

This is the trade. If you want the same stack everywhere, Flutter is phenomenal
at that. If you want a web page, Flutter is the wrong shape.

## If you're a Dart shop and you need the web

None of the above means Dart is a bad fit for the web. It's a great fit for the
web. Google uses Dart on the web at enormous scale. It is battle-hardened. You
just have to know when to use what flavor of Dart to get what you want.

If you want Dart on the web today, your options are:

- **Jaspr.** Relatively new (past few years), gaining traction, and the Flutter
  team itself has started using it for some of their own web properties.
  Probably the default recommendation now for anyone who wants Dart-on-web with
  a framework.
- **dart2js / dart2wasm + direct html.** Dart has first-class compilation to
  both JS and Wasm. You can write plain Dart against the browser APIs and ship
  it. This is what Google does, they’ve just also built AngularDart around this.
- **React + Dart business logic.** Write your UI in React and compile your
  non-UI Dart to a Wasm or JS blob that your React app calls into. This is
  surprisingly clean for teams that want web-native UI but want to share domain
  logic with their mobile app, but not a flow that we’ve seen a lot of ecosystem
  built up around.

The thing to internalize is that "I use Flutter for mobile" and "I need
something on the web" does not have to resolve to "Flutter Web." Flutter Web is
one answer. Often it isn't the best one. Loyalty to a framework is a nice
sentiment, but what actually matters is shipping great products.
