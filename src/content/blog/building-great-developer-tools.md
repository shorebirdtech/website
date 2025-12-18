---
title: The difference between good and great developer tools
author: eseidel
description:
  You shouldn't have to adapt your workflow for a tool. See what makes a great
  developer tool.
date: 2025-12-18
cover: 'building-good-software.png'
slug: 'building-good-software'
---

As a developer, I just want to ship good software.

Building good software starts with good tools. With the right tools at your
fingertips, you can achieve goals for yourself, your users, and your
organization.

Too often, though, organizations behind popular tools prioritize platform goals
first. The result is developers adapting themselves to the tool rather than the
tool adapting to their workflow. And the downstream consequences of that
inversion can be significant daily challenges.

Your software development tools should prioritize your needs first to give you
wings, not chains to reach your goals.

## Good Tools Start with Strong Foundations

So what makes a good tool? Well, for me, it starts with a strong foundation to
build on. The tool doesn’t have to provide everything upfront, but, at a
minimum, its strong foundation should offer:

- **Trust:** Safe, reliable, up-to-date, and produced from a dependable source.
- **Accessibility**: The ability to get started quickly, which is usually
  facilitated through strong documentation and training.
- **Portability:** Capable of working wherever I go with the tools and machines
  I use.
- **Fit to purpose:** Designed for something specific and works as intended.
- **Self-containment:** Stands alone on its own, without being dependent on a
  plethora of other ancillary tools or installations.
- **Extensible:** Equipped with a strong standard library and a healthy
  ecosystem of third-party packages, including tooling and testing, so you can
  grow and adapt the tool as your needs evolve.

A rock-solid foundation is just a start though. Once you’ve got a tool up and
running, it also has to earn your trust by prioritizing your goals first, so
that’s why it must also include:

- **High ceilings**: You should not be hitting performance cliffs at 10
  customers or 100 customers or a thousand customers.
- **Interoperability:** Plays well with other systems and standards, whether
  that’s text in/out, JSON, HTTP(S), or beyond, so it fits smoothly into the
  broader ecosystem.
- **Team-friendly:** Can easily be picked up across the team, with low barriers
  to entry that enable building other solutions that are equally accessible to
  others.
- **Forward mobility:** Consistent in its startup execution and speed and
  supports rapid iteration to deliver value quickly without waiting on slow
  build cycles, tooling delays, or workflow friction.
- **Bug-repellent**: Improves the quality of code being produced without
  introducing errors and bugs with footguns. I would die a happy man if I never
  have to fight another NullPointerException.

Good tools, then, respect developers and prioritize their needs first.
Otherwise, you’re left dealing with artificial constraints, workflow blocks,
portability penalties, and general ignorance to the greater developer
experience. The result is time, money, and efforts wasted in duplicated efforts
through adherence to rigid proprietary platform standards.

## The Difference Between Good Tools and Great Tools

What, then, separates a good tool from a great one? For me, it’s portability and
open source.

I believe that great tools are portable. It's my code. I just spent a week, a
month, or a year making something. And I want to take it with me to my next
project, screen, or operating system. Otherwise I’m looking at starting over
from scratch, which is going to slow down my momentum and process considerably.

Portability also reduces risk by keeping teams flexible in the face of new
platforms, infrastructure shifts, or tooling decisions, rather than locking them
into past choices. Over time, this adaptability delivers reliability and lowers
costs while extending the lifespan of software investments. The result frees
developers up to focus on iteration and problem-solving instead of rework.

And finally, a key component of portability is open source. Because even if you
choose to stop maintaining a tool, I still want the option of being able to
maintain it wherever I go. When a tool or library is open source, it can then be
modified to fit different environments, and maintain compatibility as platforms
evolve, rather than waiting on a single vendor to prioritize those needs. True,
open source doesn’t always guarantee portability, but it creates the economic
and architectural conditions that make portability more likely and sustainable
over time.

## Purpose Built for the Long Haul

As the flood of developer tools keeps flowing, we’ve spent more than enough time
locked into single-platform toolchains that prioritize the health of their
parent companies over their customers. When a tool puts its own interests ahead
of its users, it’s time to start looking for alternatives.

As mentioned before, great tools make a real difference in how you build
software. That’s exactly what we’re building with Shorebird. We believe
portable, open-source software should be the default, so you can build once and
keep shipping, across any platform, for the long haul.

And here are some of the ways we’re doing this with Shorebird:

- **Easy to get started:** No code implementation needed, just change your build
  scripts, and you’re up and running in a matter of minutes, not weeks.
- **Clear documentation**:
  [Guides and Quick Starts](https://docs.shorebird.dev/) to walk you through set
  up with simple and complex examples.
- **Built for flexibility:** We don’t dictate how your release process works, we
  provide the plumbing to make your team successful. You can use the Shorebird
  updater available on [pub.dev](https://pub.dev/packages/shorebird_code_push)
  or
  [GitHub](https://github.com/shorebirdtech/updater/tree/main/shorebird_code_push)
  to programmatically control when the Shorebird updater checks for and
  downloads patches.
- **Open source:** Does your enterprise have a long security review process? We
  can point you directly to the code we bundle into your application for easy
  scanning and approval.
- **Battle-tested:** Customers with over 10M MAU have successfully pushed
  patches with Shorebird.
- **Growing and active community:** We work with
  [companies and contributors worldwide](https://discord.com/invite/shorebird)
  to ensure we are building features and products that the
  [Flutter community](https://flutter.dev/community) wants and needs.
- **Reversible:** Enables you to quickly rollout diagnostic logs or patches, and
  just as quickly roll them back, to troubleshoot hard to reproduce bugs in
  production..
- **Quality-driven:** Having our foundation in the Flutter community that has
  set a high standard for libraries and packages ensures that our code is clear
  and reliable from the start.
- **Ubiquity:** We meet you where you and your customers already are. Since we
  build on top of Flutter, any platform is available for you to deploy to.

Expect a lot more functionality for Flutter apps courtesy of Shorebird on the
horizon. We recently rolled out a beta program for our newest product,
[Shorebird CI](https://docs.shorebird.dev/ci/), which is a zero-config
continuous integration system built exclusively for Flutter and Dart. Did we
mention we’re the same folks who created Flutter?
[It’s true](https://shorebird.dev/about/).

In general availability, we currently offer
[Code Push](https://docs.shorebird.dev/code-push/), which is an over-the-air
update system for Flutter apps that lets you deliver fixes, features, and
patches directly to your users’ devices without requiring a new app store
release.

If you’ve been frustrated by long review cycles in the app store give Shorebird
Code Push a try.
