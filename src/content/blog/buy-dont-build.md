---
title: The Smarter Way to Ship Flutter Updates
author: tomarra
description: Learning from enterprise players that custom code deployment systems are valuable but a lot to maintain.
date: 2025-02-24
cover: buy-dont-build-cover.png
---

<!-- cSpell:ignore dont -->

Sometimes, the best engineering solution isn’t to build—it’s to buy.

That’s a lesson many companies learn the hard way when tackling the problem of mobile app updates. For companies that rely on fast iteration cycles, the limitations of the App Store and Google Play’s release process can be a major bottleneck. Engineering teams often invest months—or even years—developing internal solutions to push updates dynamically, only to find that maintaining these systems is just as challenging as building them. But what if you didn’t have to build your own solution? What if you could buy it?

## Learning from Nubank: A Case for Dynamic Updates

This idea crystallized for me while listening to [Build to Succeed](https://verygood.ventures/podcasts), a podcast episode featuring [Thiago Ghisi from Nubank](https://www.linkedin.com/in/thiagoghisi/). [Nubank](https://nubank.com.br/en/), one of the largest fintech companies in the world, serves over 100 million customers with its mobile-first platform and [has been using Flutter](https://building.nubank.com.br/scaling-with-flutter/) for a number of years. Given the scale and pace at which Nubank operates, they needed a way to bypass the friction of app store release cycles. Their solution? A sophisticated server-driven UI framework that allowed them to push UI updates without requiring users to download a new version of the app.

During this episode Thiago described how this approach emerged as a necessity rather than a luxury. With hundreds of screens and a mobile engineering team struggling to keep up with demand, they needed a scalable way to ship updates multiple times a day. By moving logic to the backend, Nubank could iterate faster, conduct A/B tests more effectively, and reduce dependency on mobile engineers for UI changes.

But this approach wasn’t built overnight. It took years of iteration, countless challenges, and a significant engineering investment to get right. And it’s a lesson for other companies—one that Shorebird is helping other businesses avoid.

## Shorebird: App Updates Without the Pain

Shorebird provides a ready-made solution for companies looking to achieve what Nubank did – over the air updates – without the time, effort, and cost of building it from scratch. Our instant update technology allows mobile teams to update their apps instantly, without waiting for app store approvals or worrying about fragmented user adoption.

At Shorebird, we believe in empowering businesses to be successful with Flutter. Our mission is to make multi-platform development the default way all developers build software. We understand that in today’s fast-paced world, companies need the ability to iterate quickly and deploy changes seamlessly. That’s why we’ve built Shorebird—to remove the barriers of app store releases and allow businesses to focus on what matters most: delivering exceptional user experiences.

If your engineering team is considering building an internal code push system, ask yourself: is this really the best use of your resources? Nubank’s story shows that while the benefits of dynamic updates are clear, the road to building them yourself is long and complex.

With Shorebird, you can skip the years of development and get straight to the benefits. Why build when you can buy?
