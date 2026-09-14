---
title: Scapia
description:
  How Scapia uses Shorebird to keep millions of users moving in a large SuperApp
date: 2026-07-01
cover: scapia-cover.png
industry: FinTech/Travel
companySize: Enterprise
website: 'https://www.scapia.cards/'
intro:
  How Scapia uses Shorebird to keep millions of users moving in a large SuperApp
seoTitle: How Scapia scales financial reliability with Shorebird
seoDescription:
  Discover how Scapia, a rapidly growing Indian fintech super app, uses
  Shorebird Code Push to deliver critical bug fixes, ensure service reliability,
  and maintain a seamless experience for millions of users across iOS and
  Android.
highlights:
  - Early adopter of Code Push since the 2023 beta, now patching both Android
    and iOS
  - Targets patches to specific user cohorts with the Code Push package and
    Firebase Remote Config
  - Saved a flash sale by patching a critical stock-availability bug without an
    app store release
---

<!-- Converted from the Webflow CMS export by scripts/import_webflow.py -->

Scapia is one of India's fastest-growing travel fintech companies, combining a
co-branded credit card, UPI payments, and a full suite of travel products:
flights, hotels, trains, buses, and more, into a single super app. Backed by a
number of investment firms including General Catalyst, Scapia has grown rapidly
since its founding in 2022, surpassing a $500M valuation in 2026. With a large
and growing user base relying on the app for both financial transactions and
travel bookings, reliability isn't optional, it's what their customers expect.

## Early adopters, long-term partners

Scapia's relationship with Shorebird goes back to 2023 during the first Code
Push beta. The engineering team connected with the Shorebird team early on,
maintained an active presence on Discord, and worked through early integration
challenges together to enable their Android app for quick bug fix deployments.

> _"Our engagement with Shorebird started back when it was still in beta. We
> were very early adopters"\
> \- Abhilash Mishra, Engineer_

As the maturity of both Scapia’s app and Shorebird grew they were able to not
just continue to use Code Push in their Android app but also expand it to iOS.
This allowed for same day fixes to be deployed across platforms with ease.

## Growing pains, growing needs

As Scapia scaled, so did the complexity of their release process. In the early
days the team was shipping app updates daily. But with a rapidly expanding user
base, that pace became unsustainable. Each release now required significantly
more testing, review, and coordination across the finance and travel sides of
the app. With Shorebird Code Push already in place they had a tool available to
help with the pain they were feeling.

Their initial setup was straightforward and where most Shorebird customers
start: auto-update enabled for all users. But this new growth brought the need
for precision. Scapia now uses Shorebird's Code Push package alongside Firebase
Remote Config to target patches to specific user cohorts. Whether that's
onboarding users, post-onboarding users, or a particular segment of their
customer base.

> _"We were handed new requirements of specific updates either to onboarding
> users or post-onboarding users, or specific to a particular cohort and not to
> the entire user base. We built a system with multiple checks based on user
> cohort and app status. If all the eligibility passes, we show them a pop-up
> and manually trigger the update."\
> \- Laksh Samdariya, Engineer_

## Built for the moments that matter most

When a partner bank required Scapia to surface urgent compliance communication
inside the app they originally assumed a full app store review and release
process was going to be needed as there was no existing functionality to display
it. The team used Shorebird to push a patch and get the message in front of
users without waiting for an app store cycle.

> _"Shorebird is our only firefighting tool. Whenever anything goes wrong, we
> call Shorebird and we patch it as soon as we can."\
> \- Abhilash Mishra, Engineer_

During a recent flash sale with limited inventory, a critical bug prevented
users from seeing accurate stock availability. The sale would have been a
write-off due to this issue and a big loss of revenue for the company. Instead,
the team deployed a Shorebird patch, salvaged the event, and preserved the
customer experience. **"**The whole sale we were promoting would have to come
down with that bug in production," said Abdul. "So we used Shorebird to fix it,
push it out to all of our users and we got a good amount of traffic to be able
to still move our business goals forward."

> _"Thanks to Shorebird, we were able to quickly fix our sales entry point,
> ensuring we stayed on track to meet our primary sales objectives"\
> -Laksh Samdariya, Engineer_

## Building a custom control plane

As part of their deepened investment in Shorebird, the Scapia team didn't just
implement Code Push, they built infrastructure around it. Engineer Laksh
Samdariya authored a detailed technical post, _Beyond the Engine: Building the
Control Plane Shorebird Was Missing_, documenting the team's approach to
managing CI/CD pipelines, tracking log file changes, and handling the nuances of
integrating Shorebird into a production release workflow at scale.

## What's next

Today, Scapia primarily uses Shorebird for critical bug fixes. But the team is
already planning to expand into full feature releases. For a super app handling
financial transactions and travel bookings for a growing base of Indian
consumers, the ability to ship with confidence, instantly, on both platforms
isn't just a nice-to-have. It's the difference between a bug report and a
business crisis.
