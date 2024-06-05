---
layout: ../../layouts/MarkdownLayout.astro
title: Blog | Patch Signing Beta
description: Announcing Patch Signing for Shorebird Code Push.
date: June 5th, 2024
---

# Patch Signing (beta) 🔒

Shorebird’s code push allows developers to update their Flutter apps instantly,
over the air, deploying fixes directly to end users’ devices. Our solution takes
less than 5 minutes to integrate and requires no code changes. Shorebird’s code
push can update any Dart code in your app and we’ve designed our system to comply
with Apple and Google store policies without sacrificing performance (even after
patching).

One of our design goals has been that Shorebird should be the default for all
users of Flutter. To do that, using Shorebird needs to be a strict upgrade from
default Flutter and never worse than not using it. This includes ensuring that
Shorebird is always helping with the security and privacy of your application,
never the other way around.

Today we're announcing another layer of security possible with Shorebird: patch
signing. Patch signing allows you to cryptographically sign updates to your app.
Apps using patch signing verify the patch contents came from you before using
the patch. This means your application never has to trust any systems or
networks (including Shorebird) between you and your users, since your app will
mathematically verify the patch came from you using the same signing
technologies the app stores use for distribution.

Patch signing is optional and another layer in addition to the many ways in
which Shorebird already works to protect the security of all our customers.  We
already take many precautions including limiting what data ever leaves your
servers (we never see or store your source code), securing what data we do store
both via encryption in transit and in rest, cryptographically hashing and
validating the contents of any patch you create, as examples. You can see a full
break-down of security practices we follow on your behalf in our [public
security policies](https://handbook.shorebird.dev/security).

The patch signing we’ve shipped today is marked as “beta”. The feature is fully
functionally, but we expect rough edges in how the patch signing integrates with
existing continuous deployment and key storage. A system is only as secure as
its weakest link, so improving our integrations with your preferred key
management systems, etc. is where we go next and where we need your help.

We’re looking for companies to work with us in testing and improving patch
signing over the next few weeks. If you are interested, please give it a try:
https://docs.shorebird.dev/guides/patch-signing/ You can also reach out to us
via [GitHub](https://github.com/shorebirdtech/shorebird/),
[Discord](https://discord.gg/shorebird) or [email](contact@shorebird.dev) should
you have feedback or questions.

We’d love to help you integrate Shorebird code push into your application.
Please reach out to us if you have any questions or need help getting started.
