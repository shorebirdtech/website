---
title: Mobile Runtime Software Engineer
description:
  Own all our C++ code, including our Flutter Engine and Dart forks, and work on
  systems used globally.
location: Remote (North America)
type: Full-time or contracting
cover: engineer-cover.png
---

### Overview

We have one successful product with thousands of monthly users, delivering 10s
of millions of updates around the globe, every month. We built this all with 2
engineers. We also recently launched a second product which is also growing. We
simply need more engineers to keep up with our growing user base and ambition.

### What You'll Do

- Own all our C++ code, including our Flutter Engine and Dart forks.

- Work with the Google Flutter team to upstream changes from our C++ forks.

- Add new features to our custom Dart and Flutter (e.g. asset push support, Dart
  code obfuscation, port Flutter to new platforms, optimize our interpreter,
  etc.)

- Build out our infrastructure and tooling for maintaining a large code base.

- Write up design documents for a new products or features.

- Work with a customers (and data they've authorized us to use for product
  improvements) to analyze a failure or improve execution with the goal of
  fixing issues and contributing changes back to the Flutter ecosystem.

- Help shape our company culture, processes, and product direction.

- Note: We don't use Flutter, we build Flutter itself and services for Flutter.

### What We're Looking For

- Mission alignment. You care about helping the world stop writing everything
  twice. Flutter is our tool for that and Shorebird aims to take Flutter beyond
  where Google can.

- Strong desire to work at a startup. We're a tiny team. All remote. You'll have
  to want to make your own decisions and own them.

- Located in North America (remote).

- 5+ years working on shipping software. At least 2+ years with C++.

- Experience with at least one of compilers, runtimes, browsers, game engines,
  or low-level mobile software.

- Nice to have: Experience working on V8, Dart, the Flutter Engine, WebKit, or
  any other large open source C++ project.

- You're a self-starter — you work well with little oversight and thrive in
  ambiguous environments.

- You care about product quality and developer experience.

- Bonus: experience with build systems, deployment pipelines, or developer
  tools.

- Bonus: startup experience or contributions to open source projects.

### Why Join

- Work directly with a small, senior team solving hard, high-impact problems.

- Competitive compensation + early equity.

- Shape the future of how mobile apps are built and shipped.

- You'll do a lot of what Google's Flutter Engine and platform teams do
  (including work on C++ code used by billions every day), however unlike at a
  big tech, you will have direct (financial) incentives to improve outcomes for
  businesses using Flutter and very direct access to those customers and (when
  appropriate authorizations are in place) code, build systems, usage patterns,
  etc, and autonomy and resources to dramatically improve those outcomes.

- This job requires a lot of low-level experience and is much more broad than
  working on similarly specialized systems at a very large company, but has
  incredible rewards of being able to directly affect so many customers so
  quickly (and be thusly compensated through a large ownership stake in the
  company) in ways similar jobs inside big-tech are generally insulated from.

- Access to 1000s of customers via our Discord if you need to ask one something.

- We travel 3-4x per year to a central location (e.g. Chicago) to work/socialize
  as a team for a week.

### What your days will look like.

#### First Day

- We're all remote, so you'll start by opening up Discord and asking us anything
  you need. Most of us hang out all day on video, depending on what we're
  working on. Either way, Eric (CEO) will be there to help!
- After setting up your Mac Pro (we need to be able to build for iOS), we'd
  start by walking through how to build the Flutter engine on your machine, look
  through fork diffs between our Dart SDK and upstream, and our Flutter Engine
  and upstream.
- We'd also spend a bit of time looking through our
  [Rust updater code](https://github.com/shorebirdtech/updater/) and overall
  getting you oriented in the system. We'll ask you to take notes, and update
  our docs, since being new to the system is precious and will fade quickly (and
  your future-you will be happy you did).

#### First Week

- We'll go through our backlog together, and might try starting with something
  like up-streaming part of our diffs from our Flutter or Dart forks, to
  acquaint you with the code and the projects that we're forking.
- Early on, we'll spend a few days together updating our build infrastructure to
  be better/faster to make it easier for you to be productive down in this code.
  Our current build infra was written 3 years ago and could trivially be made
  better with our current knowledge. (We're tiny and don't have dedicate teams,
  you won't be writing C++ all day every day.)
- A good starter-bug might be refactoring a little of our code in the Dart VM to
  get rid of our global statics and fix
  https://github.com/shorebirdtech/shorebird/issues/2350.

#### First Month

- As you start to get your footing there is a mix of build and C++ related fixes
  to make, including making our system able to build developer builds of
  Flutter, and resolve https://github.com/shorebirdtech/shorebird/issues/2105.
  That would also unblock resolving crashers in our compiler:
  https://github.com/shorebirdtech/shorebird/issues/2788
- Depending on your interests there are tons of features to implement down in
  our Dart VM, including --obfuscate for iOS
  https://github.com/shorebirdtech/shorebird/issues/1619, improving our
  "linking" tooling (by restricting dart's type-flow-analysis, adding the
  ability to "replay" decisions of Dart's inliner, or changing how Dart does
  function dispatch to make the "global dispatch table" more stable across
  builds). All of those are probably days of work each, and have direct customer
  impact.

#### First Quarter

- Once you get into the flow of things, we have a large backlog of engine-level
  work to do that you'd be encouraged to just pick from (or come up with your
  own). Our engine and dart forks have been "good enough" until now, but could
  be improved for direct customer impact.
- As you feel on your feet down in the engine code, there are also whole new
  products we would like to build, including for example zero-config automatic
  crash reporting for Flutter or zero-config error reporting for Dart/Flutter,
  which rely on us making changes at the Dart or Flutter engine layers. All of
  these cut across lots of layers of our system, and you'll be encouraged to
  work as "full stack" as you feel comfortable and otherwise divide work with
  the rest of the team.

Beyond that it's hard to predict. We're a small startup. What we're looking for
first-and-foremost is someone who wants to work in that environment, more than
any specific set of skills. However importantly you bring to the table an
interest and ability to work down in our C++ and Rust code more than others on
our team. Over time as we contribute more upstream to Flutter and build more
adaptations in our fork, those will be yours to decide and build.
