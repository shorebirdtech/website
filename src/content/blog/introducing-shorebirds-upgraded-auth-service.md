---
title: Introducing Shorebird's upgraded auth service
author: maccarrithers
description:
  New authentication service from Shorebird for flexible session management,
  scoped API keys, and audit logging.
date: 2026-03-09
cover: introducing-shorebirds-upgraded-auth-service.png
intro:
  New authentication service from Shorebird for flexible session management,
  scoped API keys, and audit logging.
readingTime: 2 min read
ogImage: '/blog/og/introducing-shorebirds-upgraded-auth-service.jpg'
seoTitle: Inside Shorebird's upgraded auth service
seoDescription:
  Take control of your app's security with Shorebird's new authentication
  service offering flexible session management, scoped API keys, and robust
  audit logging.
---

<!-- Converted from the Webflow CMS export by scripts/import_webflow.py -->

Every company has unique security and authentication needs, to help meet those
needs we’ve rolled out a new auth service: auth.shorebird.dev. This rollout
marks a major step towards an upgraded authentication infrastructure designed to
give you more control and peace of mind.

Previously we proxied third-party tokens. While functional, this approach
limited your ability to set strict timeouts, revoke access on the fly, or audit
active sessions.

Now Shorebird acts as its own identity provider giving us and you more
flexibility in how authentication is managed. Behind the scenes, the auth
service handles the OAuth exchange, issues Shorebird’s own short-lived JWTs and
refresh tokens making authentication more adaptable to your specific security
posture.

With the authentication foundation in place we will be adding new capabilities
in the coming weeks and months. Here is a sneak peek to what’s on the horizon.

- **Complete session management:** Lose a device? Soon you'll be able to see all
  your active logins across devices and browsers and instantly revoke any open
  session.
- **Scoped API keys:**You want your CI/CD pipelines and third-party tools to
  work smoothly, but they shouldn’t hold the keys to the kingdom. In the coming
  weeks you can create API keys with limited functionality – like the ability to
  deploy a patch without the dangerous permission to delete a release.
- **Comprehensive audit logging:**Keep a close eye on account activity with
  audit logs. See what actions were taken in your account and by which users, to
  ensure security compliance.
- **SAML support:** Configure single-sign on with our authentication provider.

If you are interested in any of these capabilities or have other authentication
needs
[please reach out](https://calendly.com/d/cmtb-j7m-qpb/shorebird-sales?month=2026-03),
we would love to hear about your requirements.
