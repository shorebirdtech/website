---
title: Why you need to deploy Shorebird on day 1
author: tomarra
description:
  Adding Shorebird Code Push to your Flutter app from day one changes how your
  team ships
date: 2026-06-02
cover: why-you-need-to-deploy-shorebird-on-day-1.png
intro:
  Adding Shorebird Code Push to your Flutter app from day one changes how your
  team ships
readingTime: 3 min read
ogImage: '/blog/og/why-you-need-to-deploy-shorebird-on-day-1.jpg'
seoTitle: The Best Time to Add Code Push Is Day One
seoDescription:
  'Adding Shorebird Code Push from day one changes how your team ships: fix bugs
  instantly, iterate faster, and roll back mistakes easily.'
---

<!-- Converted from the Webflow CMS export by scripts/import_webflow.py -->

A common conversation we have with customers is how to embed Code Push into
their release process. For a new app, integrating Code Push is a 5-minute
process. For an app that's been in production for a while, teams are faced with
untangling a workflow that's grown up around store submissions. The longer a
team goes without Code Push, the more their entire process calcifies around the
assumption that every change requires a review cycle.

If you're starting a new Flutter project today, you don't have to inherit that
constraint.

## Building healthy habits from day 1

Release processes are habits as much as they are systems. For most Flutter dev
teams releases are big batched events. The tooling, the approval gates, the
team's intuitions about what shipping looks like is shaped by a world where the
store was the only path. Once a team normalizes five-day review cycles as the
cost of shipping that shapes everything downstream. How big changes are batched,
how bugs get prioritized, what "fast" even means.

Starting with Code Push changes the baseline assumption. Fixes are fast.
Iteration is cheap. Production is less scary because you always have a path
back.

### Bug fixes ship when they're ready

Without Code Push, a bug fix follows the same path as every other change:
branch, PR, build, submit, review, release. It doesn’t matter if it’s a one-line
fix or hundreds of new lines of code any change can take days to reach users. So
teams learn to batch fixes together, waiting until there's "enough" to justify a
release. Leaving users sitting on broken experiences longer than they should
because the cost of shipping is too high to justify a single fix.

When you add Shorebird after your app is already in production, you have to
integrate it, submit a new Shorebird-enabled build to the stores, and then wait
for your existing users to actually update to that build. Until enough of your
user base has adopted the new version, patches can't reach them which means
you're in a holding pattern, watching adoption creep up before Code Push is
actually useful. If you build with Shorebird from the start, your 1.0 is already
patch-ready.

With Code Push incorporated at the start, the fix ships when it's done. There's
no minimum batch size. No waiting on review. Your users get the fix immediately,
not the promise of the fix in the next release cycle.

### Iteration gets cheap

Without Code Push, teams ship things that are more "done" than they need to be,
because each iteration is a full release cycle. You front-load decisions and
over-specify upfront because changing course in production is expensive.

With Code Push, you can ship something, watch how users interact with it, maybe
even run an A/B test. You’re iterating faster.. The feedback loop between
production and your next change compresses from weeks to hours.

### A magic eraser

On the web, rolling back a bad deployment takes minutes. Mobile has never worked
that way. Once a bad release is in the wild, it's in the wild. You can't pull it
back from devices that are already updated. Your options are to ship a hotfix as
fast as possible and hope users update, or watch your crash rates and negative
reviews climb while you wait for store approval.

With Code Push, if a patch introduces a problem, you can
[roll it back](https://docs.shorebird.dev/code-push/rollback/) with a single
click. Every affected user gets the previous working version on their next app
launch. No emergency all-hands, no war room, no waiting on the stores for
approval.

But the deeper benefit is psychological. When you know production is
recoverable, you deploy with more confidence. That shift where you start to
treat production as something you can easily fix rather than something permanent
is one that's almost impossible to retrofit into a team that's spent years
treating every release as a one-way door.

## What about teams with existing codebases?

Not everyone gets to start from scratch, that’s just the reality of a business.
The integration still takes minutes, and the value is still real. We usually
recommend keeping full releases on whatever cadence makes sense for your team,
then using patches in parallel for bug fixes and incremental changes. Over time,
teams naturally shift toward patching more frequently as they build confidence.

The reason we emphasize starting early is simple, teams that adopt Code Push on
day one never have to unlearn anything. There's no existing process to retrofit,
no habits to break. They just get the benefits from the start.

## What "starting with Code Push" actually means

Adding Shorebird on day one isn't just a technical decision. It changes how your
team thinks about shipping. Your team's default assumption, from the very first
release, is that fixes can ship immediately and iteration is cheap. You never
develop the instinct to batch things up, because you never had to. The store
submission becomes what it actually should be, the path for native changes and
major milestones rather than the only path for everything.

If you're spinning up a new Flutter project, add Shorebird on day one. It takes
five minutes, it's free to get started, and you'll never have to explain to your
team why patching takes longer than it should.

Teams that are used to batching releases don't automatically start shipping
smaller and faster just because they technically can. The habit has to be
rebuilt.

Check out this guide on how to include Shorebird in your
[development workflow](https://docs.shorebird.dev/code-push/guides/development-workflow/).
