---
title: Are you smart enough to predict an outage?
author: eseidel
description: How Shorebird can help you prepare in case of an outage.
date: 2026-03-04
cover: predict-an-outage.png
intro: How Shorebird can help you prepare in case of an outage.
readingTime: 2 min read
ogImage: '/blog/og/predict-an-outage.jpg'
seoTitle: 'Mobile App Resilience: Surviving Cloud Outages with OTA'
seoDescription:
  Cloud outages are unpredictable. See how Shorebird's OTA updates helped a
  mobile app recover instantly from AWS downtime without app store delays.
---

<!-- Converted from the Webflow CMS export by scripts/import_webflow.py -->

All cloud providers experience outages, that can throw a wrench into apps.
Recent events, such as the AWS outage in the Middle East, have once again
highlighted the unpredictable nature of technology and cloud services. No app is
bulletproof, any app can be knocked offline by an unexpected outage. One
Shorebird customer was able to quickly recover by pushing patches to implement
fallback logic and redirect requests to secondary services.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr"><a href="https://twitter.com/shorebirddev?ref_src=twsrc%5Etfw">@shorebirddev</a> has been an absolute saviour in this AWS outage in UAE region saving our app from down time, helping release fallback logics quickly. Already on patch fix no #5. <a href="https://t.co/mVsXTmYXmm">pic.twitter.com/mVsXTmYXmm</a></p>— tushar (@tusharghige) <a href="https://twitter.com/tusharghige/status/2028529716068851817?ref_src=twsrc%5Etfw">March 2, 2026</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

This shines a light on a common problem that mobile devs face. Web devs can push
code at a moments notice, this isn’t a luxury that mobile devs have based on app
store policies and user update habits. The industry has tried to solve this for
years with config-driven UI, CMSs, and web views. But these approaches all have
a limitation, they require you to be a fortune teller and predict in advance
which part of your app might break. You’re essentially making a bet on which
code you think will need to be changed at some point in the future.

We faced this exact issue at Google while building partial-update solutions for
Flutter. These solutions allowed updates to pre-designated parts of the app, but
they were limited by the initial prediction of which areas would need changes.
This approach often falls short in real-world scenarios.

Believing that you’ll only ever need to change certain code is a fundamentally
flawed bet and one of the reasons that Shorebird exists. Nobody, not even the
10x engineer can predict every possible way an application may break or when a
cloud outage will occur. Mobile developers need a more flexible and dynamic way
to handle updates, one that doesn't require them to predict the future. This is
where over-the-air (OTA) updates come into play.

Our design principle is rooted in the belief that developers should be able to
address any issue, anywhere in their app, whenever they want.

- Update any line of Dart code wherever trouble pops ups.
- Add or remove a package.
- Change back-end services.
- Fix dependency issues.

This flexibility is a necessity when outages occur. Outages and bugs don’t ask
for permission, you shouldn’t have to ask for permission to resolve them.
Shorebird is designed so you don’t need to be clairvoyant and predict where a
problem may pop-up, all you have to do is push a patch just like our customer
described. Being prepared is better than trying to predict the future.
