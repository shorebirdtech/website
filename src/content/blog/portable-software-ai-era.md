---
title: The importance of portable software in the AI era
author: eseidel
description:
  The economics of development are changing. It's becoming cheaper to write code
  but more expensive to review and maintain.
date: 2026-03-24
cover: portable-software-ai-era.png
intro:
  AI is changing the economics of development. It's becoming cheaper to write
  code but more expensive to review and maintain.
readingTime: 5 min read
ogImage: '/blog/og/portable-software-ai-era.png'
seoTitle: Why Portable Software Matters More in the AI Era
seoDescription:
  Think AI will replace apps? Think again. Discover why falling build costs and
  rising maintenance make portable software your ultimate tool for future
  success.
highlight: true
---

<!-- cSpell:ignore wasorganizational -->

<!-- Converted from the Webflow CMS export by scripts/import_webflow.py -->

If you listen to the current tech-bubble framing, you might believe software as
we know it is coming to an end. The prevailing narrative suggests we'll soon be
prompting our way through our daily lives, relying entirely on AI agents to
dynamically generate whatever we need on the fly. I think this vision is
completely disconnected from reality — and more importantly, I think it misses
what's actually interesting about this moment for software.

I co-founded Flutter at Google in 2014 and led the Flutter and Dart teams there
for eight years before leaving to start Shorebird. For a while now, I've been
trying to work out not just whether Flutter survives the AI era, but why
portable software becomes more important when building is suddenly cheap. The
answer surprised me a little. I've come to think about apps differently than I
used to. For most of my career, an app was a bundle of code and an icon
distributed to users. That's not wrong, but it's incomplete. What apps actually
do — what source code actually does — is serve as intent capture and intent
distribution for a business.

On the capture side: even Steve Jobs didn't have a perfect product vision the
moment an idea struck him. There's no amount of amazing AI that could have
helped him one-shot his idea and ship it the same day. Apps are the product of
arguments. They're the product of time spent with users, learning from the
field, recording the result of a thousand decisions in a form that runs
deterministically every time you press a button. Fix a bug, write a test, it
stays fixed. That reliability is the whole point.

Construction figured this out decades ago when AutoCAD took over. AutoCAD is far
from perfect. You can find plenty of people who'll complain about it left,
right, and sideways. But it's the canonical reference format for large
construction projects because you need a digital blueprint that lets the plumber
have an argument with the electrician and record the result of that argument in
a shared place, so the mistakes aren't made at execution time. Source code has
always served this function. In the AI era, it serves it more importantly than
ever.

On the distribution side: as we explored in our recent piece on
[AI and intent](https://shorebird.dev/blog/ai-intent-cross-platform-app-development),
the vast majority of consumers don't come to software with intent. They don't
want to endlessly prompt an agent to dynamically compose an experience; they
want to tap a button and receive the experience someone thoughtfully designed
for them. The app distributes the business's intent to the consumer. For a
deeper dive into why the "everyone will just prompt all day" framing is a
tech-bubble myth, I highly recommend reading that full article.

## Build costs are falling, ownership costs are rising

Here's what is genuinely new: the cost of building is trending down. Not to
zero, but dramatically. AI coding tools are real and they work. What hasn't
changed, and is actually getting worse, is the cost of ownership.

We're seeing this clearly from our customers. Shipping more code means more
reviews, more stress on release systems, more monitoring, more crash reporting.
The blast radius of AI-generated changes is real. Amazon was talking last week
about requiring senior engineer sign-off on every code change because of the
outage risk from AI-generated code. Think about what that means: build costs
plummeting, review and maintenance costs spiking.

Now apply that dynamic to a team that ships the same change twice: once for iOS,
once for Android. They need to review it twice. They potentially need two
different reviewers, because one speaks iOS and one speaks Android. And how do
you actually know those two implementations are equivalent? You often find out
when a user switches phones and your app suddenly doesn't behave the same way.
That's not a theoretical problem. It's a daily one, and AI makes it sharper.

When Google Pay was one of the earliest large teams to adopt Flutter internally,
they came back to us and said we'd made them three times as efficient. You'd
wonder: you're only getting iOS and Android at the same time, why three times?
Their answer wasn't technical. It wasorganizational. They could stop having two
PMs — one for iOS and one for Android. They could divide the team by features
rather than platforms. One bug tracker instead of two. They restructured their
organization around the needs of their business rather than the constraints of
their stack.

As discussed in our article on intent, this organizational unlock is the intent
capture argument made concrete. It's not just that portable software reduces
duplication. It's that platform-specific code dilutes your intent. The fact that
Android uses RecyclerView, or that the web requires CSS gobbledygook to remain
compatible with every browse. None of that is part of your business intent. It's
all noise layered on top of what you actually care about. Portable software lets
you record the decisions that matter, without the platform-specific static.

## Human obstacles are disappearing

For years, one of the biggest inhibitors to Flutter adoption wasn't technical,
it was human. The iOS tech lead. They have an identity built around being an iOS
developer, they've been through and through iOS their entire career, and they'd
tell you plainly: "We can't rewrite in Flutter. I would leave the company." We
heard that constantly. It was a real obstacle.

Claude doesn't have that problem. Claude is not going to reach up and say, "No,
we're going iOS, damn it." Agents reach for the best tool to get the job done
efficiently, without identity attached to the outcome. One of the most
persistent and underrated barriers to portable software adoption is going away.

So is the learning curve argument. Getting on Flutter, or off Flutter, is much
cheaper than it used to be. AI has dramatically reduced the "rearranging the
shelves" cost of switching stacks. And reviewing code in an unfamiliar language
is dramatically easier than writing it. Dart looks like a modernized Java. You
can review intent, catch logic errors, and flag anything that doesn't make sense
without being fluent. The adoption risk that kept teams paralyzed for years is
compressing fast.

## It's about one stack, everywhere

I want to be clear about something: the argument I'm making isn't really about
Flutter. It's about an approach. One great stack, taken everywhere, rather than
the same decisions recorded twice or three times in different languages for
different platforms. This is how games solved the problem twenty-plus years ago
with Unity and Unreal. Nobody re-debates the platform question every time a new
device comes out. Of course Unity supports it. That reliability is half the
value proposition.

The alternative approaches — orchestrating native widgets, platform-specific
rewrites — take shortcuts. And shortcuts produce inconsistent debugging, limited
expressiveness, and implicit bets on one platform's future. React Native's main
advantage remains its tie to the massive React and JavaScript ecosystem — that's
real, and it's not going away. But every orchestration approach has already
picked a winner. If the Swift solution is always going to be better on iOS and
the Kotlin solution always better on Android, you don't actually have a portable
stack. You have a cross-compilation wrapper with a native fallback. That's
different, and the difference matters.

Flutter runs Toyota cars. It runs LG TVs. It runs Google assistants. The
businesses that don't move toward shared ownership will be out-competed by the
ones paying one price per change instead of two or three. Investors don't care
about anyone's iOS identity. They care about shipping.

The build cost is going down. The ownership cost is going up. The human
obstacles are dissolving. Every one of those trends points in the same
direction: unified, portable codebases. In this shifting landscape, Flutter is
the most powerful portable software available for bringing those escalating
ownership costs back down—and Shorebird is the best way to succeed with Flutter.
