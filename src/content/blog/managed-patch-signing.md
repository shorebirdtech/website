---
title: "Shorebird's got your back: patch signing is now on by default"
author: eseidel
description:
  Every new release made with the latest Shorebird CLI is now signed by default,
  so a network attacker can't push code to your app. Update the CLI and make one
  new release; no Flutter upgrade needed.
date: 2026-10-26
cover: managed-patch-signing.png
intro:
  Every new release made with the latest Shorebird CLI is now signed by default,
  so a network attacker can't push code to your app. Update the CLI and make one
  new release; no Flutter upgrade needed.
readingTime: 4 min read
ogImage: '/blog/og/managed-patch-signing.jpg'
seoTitle: Patch Signing Is Now On by Default in Shorebird
seoDescription:
  After the eMudhra certificate compromise, Shorebird now signs every new
  release by default with a managed key. Update the CLI and release to be
  protected.
---

<!-- cSpell:ignore eMudhra -->

The internet runs on trust, and last week a piece of that trust broke. Eight
intermediate certificates issued by eMudhra, an Indian certificate authority,
turned out to have private keys anyone could recover in under a second. One of
them was, literally, the number 4.

Browsers have already blocked these certificates. This post explains how it
affects apps built with Shorebird, and what we're changing so that this kind of
problem can't reach your app again.

## What happened

On October 17, Mozilla
[received a report](https://groups.google.com/a/mozilla.org/g/dev-security-policy/c/0R3XLJL6FuE/m/Kp1v6CPuAAAJ)
that the private keys of eight eMudhra intermediate certificates had been
compromised. Anyone holding one of those keys can make a valid-looking HTTPS
certificate for any website.
[Cloudflare's write-up](https://blog.cloudflare.com/emudhra-certificate-compromise/)
is a good summary.

eMudhra has revoked the certificates, and Chrome, Firefox, Safari and Windows
now refuse them. But that only protects software that gets those updates.
Software that carries its own list of trusted certificates keeps trusting them
until it's rebuilt.

## How it affects Shorebird apps

Most apps check HTTPS certificates against the phone's own list of trusted
roots, which Apple and Google keep up to date. Shorebird's updater carries its
own list, built into your app when you build it. That list includes the eMudhra
roots these certificates were issued under, until you ship a new release.

So someone on the network between your users and Shorebird (public Wi-Fi, a
compromised router) could pretend to be Shorebird and offer your app a patch of
their own.

This is not a breach of Shorebird's servers or your data. We know of no attack
using these certificates against any Shorebird app.

## Patch signing already closes this

You don't have to trust the network, or even us. That's what
[patch signing](https://docs.shorebird.dev/code-push/guides/patch-signing/) is
for: your release carries a public key, and your app only installs a patch whose
signature matches it. A forged certificate gets an attacker a connection to your
app, not a patch your app will install.

If you already sign your patches, this could never reach your app, and you don't
need to do anything.

Patch signing has been part of Shorebird since 2024, and it works on every
Flutter version the Shorebird CLI releases on. The catch was that you had to
turn it on and manage a key yourself, and very few apps did.

## What we're changing: signing is on by default

Starting today, every new release made with the latest Shorebird CLI is signed
by default. If you don't bring your own key, Shorebird creates one for your
organization in Google Cloud KMS and builds its public key into your release.
Every patch to that release is then signed automatically. The private key never
leaves KMS, and no one at Shorebird can export it.

There's nothing to configure, and nothing changes in how you run
`shorebird release` or `shorebird patch`, in your terminal or in CI. Each
release and patch in the console shows whether it's signed.

## What you need to do

1. **Already using patch signing?** Nothing. Your releases keep using your own
   key.
2. **Everyone else:** update the Shorebird CLI (`shorebird upgrade`) and release
   a new version of your app. You don't need to change Flutter versions.

Your existing releases keep working as before. Your users are protected as they
move to the new release.

## What managed signing does and doesn't protect against

We want to be clear about what this does. Managed signing moves trust from
"every certificate authority in a bundled list, plus the network" to "Shorebird
and Google."

- **An attacker on the network, or with a forged certificate:** blocked.
- **An attacker who can change files in patch storage or on our CDN:** blocked.
- **An attacker who takes over Shorebird's servers, Google Cloud, or your
  Shorebird account:** not blocked, because they could ask for a patch to be
  signed.

If you need Shorebird out of your trust chain entirely, bring your own key. It
is still the strongest option, and nothing about it changes. You can switch from
managed signing to your own key at any release; earlier releases keep their
managed key and keep getting signed patches.

If you need to make an unsigned release for some reason, `shorebird release`
takes `--no-sign`. We don't recommend it.

## More this week

This is the first in a series of posts about safety this week. We've tightened a
lot across Shorebird that we haven't talked about yet, and we're excited to tell
you about it.

Shorebird's got your back.
