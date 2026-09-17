---
title: Code Push makes your app more secure, not less
author: eseidel
description:
  'The gap between "we wrote the fix" and "our users have the fix" is real
  security exposure, learn how Shorebird fixes this.'
date: 2026-06-23
cover: code-push-makes-your-app-more-secure-not-less.png
intro:
  'The gap between "we wrote the fix" and "our users have the fix" is real
  security exposure, learn how Shorebird fixes this.'
readingTime: 5 min read
ogImage: '/blog/og/code-push-makes-your-app-more-secure-not-less.jpg'
seoTitle: How Code Push Makes Your Flutter App More Secure
seoDescription:
  Shorebird patches ship in hours and can roll back instantly. See how OTA
  updates close the patch gap, plus our zero-trust signing model.
---

<!-- cSpell:ignore delated -->

<!-- Converted from the Webflow CMS export by scripts/import_webflow.py -->

Shorebird puts you in control of when your users get a fix. That control is
itself a security feature.

It cuts two ways. When something goes wrong, you can pull a release back in
minutes instead of waiting weeks for the next store cycle. And when a fix
exists, you can get every user onto it right away, instead of watching your
install base stay fragmented across older, vulnerable versions. A safety net for
when things break, and an insurance policy that keeps your users on the most
secure version you've shipped.

Under all of that is a floor we hold ourselves to: using Shorebird should never
be worse than not using Shorebird.

That's the design constraint. Not on performance, not on privacy, not on
security. The rest of this post walks through what that means in practice, and
the places where Shorebird does meaningfully better.

## Fast delivery is a security feature

The average mobile patch cycle looks like this: a security issue is reported, a
fix is written within hours, and then it sits. It sits in your release branch,
then in TestFlight, then in store review, then in the staged rollout your
release manager configured. Weeks later, most of your users have the fix. Some
never do.

That gap between "the fix exists" and "users have it" is real security exposure.
Patching with Shorebird narrows it.

**It's faster.** A patch ships in hours, not weeks. There's no waiting on
someone else’s process sitting between your fix and your users, so the window
where a known vulnerability is live shrinks from a release cycle to an
afternoon.

**It can reach every version, not just the latest.** A store update only fixes
the version you ship next. Everyone still on an older version stays vulnerable
until they choose to update, and many never do. Shorebird lets you patch old
versions too, so a fix can reach your entire fleet, not just the users who
happen to be current.

The payoff is convergence. Today every release fragments your user base across a
long tail of versions, each with its own bugs and CVEs. Patches reach everyone,
fast. Your install base stops being a museum of every bug you've ever shipped.

## Rollbacks are a security feature

A rollback is the ability to undo a change after it's live. Push a change with
Shorebird, decide it's wrong, and you can pull it back immediately. The previous
version is what your users run again. The app stores gives you no such undo: a
bad release can only be replaced by another release, which has to clear review
while the broken build keeps running in the field.

Rollbacks also change the posture of how your team ships:

- **Your team experiments more.** When the cost of a bad release is "click a
  button, it's gone in 15 minutes" instead of "wait two weeks for the next
  train," teams take more shots. More shots means faster learning, which means a
  better product.
- **You stop hiding everything behind feature flags, and the complexity they
  entail.** Feature flags are, in large part, a workaround for the inability to
  undo a release. They also result in an explosion of possible code-path
  combinations in the wild — every flag multiplies the number of states your app
  can be in, and you own all of them. With real rollback, a whole class of
  "let's gate this just in case" flags disappears, and so does the combinatorial
  cost of maintaining them.

None of this is anti-feature-flags. The flags you keep get better with
Shorebird. The slow part of a feature flag was never the toggle, it was getting
the code behind it onto devices in the first place. You'd ship the gated code in
a store release, wait weeks for it to spread, and only then dare to flip it on,
still a high-stakes moment. With Shorebird you can deliver that code in an
afternoon and flip the flag when you're ready. We move the code; your flag does
the rest.

## Two layers of rollback

For even greater protection, we give you rollback at two levels.

**Manual.** You decide a patch is bad, for whatever reason, and you revert. Your
users return to the previous patch on the next app launch.

**Automatic, per-device.** If a patch crashes on a specific device at launch,
that device automatically falls back to the prior patch. No human in the loop.
This catches the long tail of "works on 99% of devices, crashes on this one
Android skin with 1GB of RAM."

See it in action:
[Rolling Back Patches](https://www.youtube.com/shorts/OglRcEIB8r0).

## Named tracks

And of course, you don't have to ship every patch to all of production.
Shorebird supports arbitrarily named tracks to control which patch each device
sees. You can patch your QA build, your tester build, your staging build, and
your production build all independently. Issues stay contained to the track you
patched, and you can then graduate a patch to your “stable” track after you've
validated it.

See it in action:
[Shorebird Tracks](https://www.youtube.com/shorts/bRGHm-glRj0).

## The cryptographic story

Importantly, Shorebird is not part of your application's cryptographic chain.
You never have to trust us or any of the providers we use (Google, Cloudflare)
to deliver your patches to users. You generate the signing keys. You sign
patches with your private key, using our open source tools. Your app embeds the
matching public key at build time. Patches are verified on-device against that
embedded public key. We never see your private keys, and we are never involved
in producing or validating signatures.

What that means: even a breach of Google Cloud (our primary provider) or the
MITM attacks on networks between us and your users, do not compromise you or
your users. No one other than you can produce a signed patch that your app will
accept.

The worst case for any disruption is _availability_ — patches stop flowing. It
is not _integrity_. That's a different threat model than most of the SaaS in
your stack.

## Data minimization

Shorebird stores very little.

- **No source code.** Your code stays in your repo and builds on your CI. We
  never see it.
- **No signing keys.** Those never leave your hands, never touch our servers.
- **No user data.** We don't know who your users are, we just serve them the
  patches you tell us to.

**What we do store:** the same compiled artifacts you're already shipping to the
store, plus minimal patch metadata to route the right binary to the right
device, and the emails/SSO ids necessary for you to log in to our service.
Intentionally very little (see our full privacy policy) and compliant with your
regional privacy needs (e.g. our DPA).

## Operational security

- We run on GCP. We are not in the business of running our own datacenters or
  rolling our own primitives. All of our services are GCP managed (no risk of
  delated upgrades).
- ISO 27001 certification nearly complete; expected Q3 2026. See
  [trust.shorebird.dev](http://trust.shorebird.dev/).
- We regularly work with regulated customers — fintech, healthcare, large
  enterprise — and have been through their security reviews and regular
  pen-testing.
- We are SSO-only. There are no password logins to a Shorebird account.
  Enterprise customers can restrict accounts to their IdP.
- We are open source. The majority of our runtime and tools are on GitHub. Your
  team can audit the code that runs on your users' devices.
- When we ship security fixes, we ship them in hours, not weeks.

## Summary

Shorebird is designed to never be worse than not using Shorebird, on
performance, privacy, or security, and our services help you achieve
meaningfully better outcomes for your developers and customers. You get
rollbacks. You get fleet convergence. You get a fix-to-user pipeline measured in
hours instead of weeks. All with a the trust model is structured to minimize
your need to trust us.
