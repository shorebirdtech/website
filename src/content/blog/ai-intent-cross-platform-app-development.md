---
title: AI, intent, and cross-platform app development
author: eseidel
description:
  Discover why your codebase is actually your organization's core memory and the
  true value of cross-platform development.
date: 2026-03-17
cover: ai-intent-cross-platform-app-development.png
intro:
  Discover why your codebase is actually your organization's core memory and the
  true value of cross-platform development.
readingTime: 5 min read
ogImage: '/blog/og/ai-intent-cross-platform-app-development.png'
seoTitle: Are Apps Dead? AI, Intent, and Cross-Platform Development
seoDescription:
  Think AI means the end of apps? Discover why your codebase is your org's core
  memory and the real value of cross-platform development.
---

<!-- Converted from the Webflow CMS export by scripts/import_webflow.py -->

Every few months, a new wave of commentary arrives declaring that apps are dead,
similar to how there are regular discussions about
[Flutter being dead.](https://shorebird.dev/blog/flutter-not-dead)

These days that argument is coming mostly from the AI world. Large language
models can generate an iOS or Android app in minutes, so why worry about
cross-platform development at all? Just generate two versions. Code is cheap
now, right?

Other times the debate angle comes from people imagining a future of
agent-driven software. In this world, users won’t open apps. Agents will simply
orchestrate experiences dynamically. Interfaces will be generated on the fly.
The idea of a branded application becomes completely unnecessary and antiquated.

You’ll find these arguments spread across social media, conference stages, and
investor decks by intelligent people who are incredibly tuned into the oncoming
shifts of technology. And they all share the same underlying assumption: An app
is a pile of code.

If you believe that premise, the conclusions follow pretty naturally. If apps
are just code, and code is getting cheaper to produce, then apps must be getting
cheaper to build, simpler to support, easier to discard, and, therefore, less
relevant overall.

The thing is, that premise is completely wrong. An app is not just a pile of
code. It’s an expression of intent. Once you understand that, a lot of the
current industry conversation starts to look backwards.

If we zoom out, apps serve two roles simultaneously:

- They deliver intent to users.
- They capture intent for organizations.

Both of those roles become _more_ important in the AI era.

Let’s start with the user side.

## Apps as Intent Delivery

When people download an app, they are not looking for composability. They are
purchasing intent.

Consider a Withings smart scale. You buy the device because you want Withings’
specific solution to the problem of tracking weight and health metrics. You want
their unique hardware, app, and interpretation of the data. That desire for the
full Withings experience is because the app doesn’t just show your weight. It
presents trends. It decides how to visualize progress, the metrics that matter
most, and the specific nudges to show you. Users buy a Withings scale because
they want _Withings’ opinion_ about how weight data should be presented.

The same dynamic shows up everywhere. People subscribe to Netflix because they
want Netflix’s expansive entertainment experience. They buy Nike products
because they trust Nike’s approach to training and performance. They go to
Disney Plus because they want to experience Disney’s version of storytelling and
know it's not going to show their kids algorithmic slop.

In every case, the product is not just functionality. The product is intent. An
app is how that intent gets delivered consistently to millions of users.

That consistency matters more than technologists often realize, and it’s a trust
issue. When someone opens an app for the first time, they expect a somewhat
templated navigation based on what they’ve previously experienced. They want the
same buttons in the same places every time. Their muscle memory expects it at
this point. Their mental model expects it. The more familiar the experience
becomes, the less cognitive effort it requires. Nobody wants a steep learning UI
learning curve within a consumer app. How does that scale?

This is one reason the vision of fully dynamic, generated user interfaces is
often more exciting to technologists than to users. Generated interfaces,
sometimes called GenUI, can be incredibly powerful in certain contexts. Inside
an app, they can personalize workflows or automate repetitive tasks. But the
idea that every interface should be dynamically generated ignores something
fundamental about human behavior.

Users want stability.

Nobody wants a new interface every time they open an app. You want everything to
be exactly where it was yesterday so you can use it without thinking. If you’re
on your way to work or to pick up your kids from school, and you quickly check
an app, you don’t want to spend any more time than necessary to get the
information you originally wanted by taking that initial action. Nobody wants to
have to take a few minutes out of their day to re-learn a new UI each time they
open an app.

Consistency _is_ the expression of intent. And brands care about this too.

If Apple redesigned the layout of the Apple Store every time you walked in, it
wouldn’t feel magical. It would feel chaotic and burdensome. The physical tables
are always in the same places because that consistency communicates Apple’s
design philosophy.

Apps work the same way.

Yes, users want access to their data, in all its various facets and intricacies.
APIs matter. Export formats matter. Interoperability matters. And if you’re
thinking deeply about data portability, you are already in the top 1% of users.
Users want someone else to have made those design decisions already, and for
those choices to be somewhat binding; an agreement between the creator and user.
That’s the delivery side of intent.

Now let’s talk about the part of apps most people miss.

## Apps as Intent Capture

On the organizational side, an app is something else entirely. It’s a record.
More specifically, it’s the most durable record we have of organizational
intent.

Software is an accumulated argument. When a product launches, it often looks
like the result of a cohesive vision. But anyone who has worked inside a product
organization knows that’s not really how things happen. Products are _products
of argument_.

Teams debate design decisions. They constructively clash about features. They
research, analyze, and discuss which customer problems matter most:

- Should this page exist?
- Should this button be green?
- Should this screen appear before or after onboarding?

The final product represents the outcome of thousands of those types of debates.

But where do those decisions get recorded?

Early in a project, they often live in someone’s head. Or in a design file. Or
in a spec document. As the product evolves, something interesting happens.
Design files drift out of date. Spec documents stop being updated. The only
place that reliably captures the current state of the product, and the decisions
that led there, is the source code:

- A developer fixes a localization bug in German. That knowledge gets committed
  to the codebase.
- A team learns that a certain onboarding flow increases retention. The
  implementation goes into the codebase.
- A production incident reveals an edge case nobody predicted. The fix gets
  committed to the codebase.

Over time, the codebase becomes the single source of truth for the product’s
behavior. Not because it was designed that way. Because everything else decays
faster over time.

This pattern shows up in many industries.

AutoCAD is a famously frustrating piece of software. But it became the
canonical, digital blueprint format for architecture and engineering. If you
want to understand a building design — down to the electrical and plumbing
schematics — you look at the AutoCAD files.

Docs and slide decks play a similar role in sales and marketing, housing and
conveying a great deal of brand and product knowledge for both internal and
external audiences. Spreadsheets inhabit this space for financial models.

These formats aren’t perfect. They’re just the place where the accumulated
decisions of an organization eventually land.

Source code serves that role for digital products.

And anyone who has maintained a large app for several years understands how
important that becomes. People who say cross-platform development doesn’t matter
usually haven’t maintained an app for very long. They’re imagining the initial
build.

But the devil is in the details beyond the initial design. Real applications
accumulate years of production fixes, edge cases, localization quirks,
accessibility improvements, performance tweaks, and customer learnings.

All of that intent ends up encoded in the codebase. Which means the codebase
isn’t just implementation. It’s a product’s long-term, core memory.

## Source Code Is Becoming a Better Intent Medium

There’s another reason this all matters right now. AI is making source code more
accessible to everyone. For decades, source code had a fundamental limitation as
a medium for capturing intent: Only engineers could meaningfully interact with
it. Designers could contribute designs. Product managers could write specs. But
the canonical record of the product, the codebase, was gated behind engineering
expertise. AI is rapidly lowering that barrier. The code of today doesn’t look
like the code of yesterday. And the code of tomorrow won’t look like the code of
today. But we still need a single deterministic, compilable source of truth.

Designers can now read code with assistance. Product managers can explore
codebases. Non-engineers can propose changes or generate prototypes. We’re still
early in that transition, but the trajectory is clear. The circle of people who
can engage with source code is widening. That makes source code a stronger
vehicle for capturing organizational intent than it has ever been in the history
of software development.

Ironically, this is exactly where the “code is free” narrative gets things
backwards. If AI reduces the cost of writing code, that doesn’t make code
irrelevant. It makes code the most accessible medium in existence for expressing
and refining intent. The value of the codebase shifts from _implementation cost_
to _organizational memory_.

And that shift has implications for how we structure our apps.

## Why Cross-Platform Matters More Than Ever

If your codebase is the canonical record of your organization’s intent,
fragmenting that codebase across multiple platforms means siloing your memories.

Two codebases means two places where decisions live:

- Two bug lists.
- Two implementations of every edge case.
- Two records of what the product actually does.

And most of those differences have nothing to do with your organization’s
intent.

Your organizational intent does not include RecyclerView. It does not include
CSS padding. It does not include the details of UIKit layout constraints. What
your organization actually cares about is the space between your logo and your
first fold. The animation that communicates your brand. The flow that converts
users into customers.

Platform-specific codebases dilute that intent with implementation noise. For
years, cross-platform frameworks have been sold primarily on a simple promise:
Write once, run anywhere. That framing undersells the real value.

The deeper benefit is this: Argue once, record once. One codebase where product
decisions live. One place where fixes get applied. One record of the accumulated
arguments that define your application.

This becomes even more important in a world where AI agents are helping write
the actual code. If agents are doing more of the implementation work, the human
role shifts toward specifying intent, refining outcomes, and satisfying users.

And the last thing you want in that world is fragmented intent. You want one
place where those decisions are recorded.

## The Conversation We Should Be Having

As mentioned earlier, the tech industry loves to debate whether apps are dead.
That question misses the point. It’s whether your organization’s intent lives in
one place or many.

AI is making code easier to write, easier to read, and easier for more people in
an organization to participate in. That doesn’t make apps disposable. It makes
them more valuable as the living record of what a product actually is, and makes
fragmentation more costly.

Flutter remains the most capable framework for building portable applications
from a single codebase. At Shorebird, we’re building the platform that helps
organizations bet on that future by giving teams the tools to deliver faster
today, while ensuring their applications remain portable, durable, and always
evolving.

But the real shift is conceptual: apps are not piles of code, they are
expressions of intent.

Great software, at its core, is the realization of an accumulated argument. With
portable software we get to have that argument once, and ship the results
everywhere.
