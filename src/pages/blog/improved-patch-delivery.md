---
layout: ../../layouts/BlogLayout.astro
title: Blog | Improved Patch Delivery
description: Announcing improved global patch delivery, availability, and performance.
date: 9/5/2024
---

![Improved patch delivery header image](../../assets/images/blog/improved-patch-delivery/heading.png)

We're excited to announce some improvements to our cloud infrastructure which
improve our patch delivery, availability, and performance around the world 🥳

## What's Changed

When a patch is published via `shorebird patch`, the generated patch artifact is uploaded to Shorebird's cloud storage.
On app launch, the corresponding release running on users' devices will ping Shorebird's API to check whether a newer patch is available.
If a newer patch is available, Shorebird's API will respond with a link to the patch artifact and the patch is then downloaded and installed on the device.

We've made some improvements to how we store and serve patch artifacts to both improve availability (e.g patches can be downloaded by devices in more places around the world) and performance (e.g patches take less time to download).

## Wider Availability Worldwide

We've made some changes to our cloud infrastructure to enable Shorebird to deliver patches to more regions around the world. You may now find that users are able to download patches in regions that were previously unavailable.

![China Patch availability image](../../assets/images/blog/improved-patch-delivery/china-availability.png)

**Note: There may still be regions in which Shorebird is unavailable. Please [contact us](mailto:contact@shorebird.dev) if you notice users having trouble downloading patches and we're happy to help.**

## Better Performance Worldwide

Our cloud infrastructure improvements have also reduced the time it takes to
download patches around the world. The following snapshot of data illustrates
the average time it took to download a 1mb patch before and after the
improvements.

**Average Response Times**

| Location       | Before | After  |
| -------------- | :----: | :----: |
| Netherlands    | 543ms  |  59ms  |
| USA            | 556ms  | 137ms  |
| Germany        | 754ms  | 211ms  |
| India          | 1739ms | 1540ms |
| United Kingdom | 748ms  |  78ms  |
| Australia      | 1113ms | 153ms  |
| Kenya          | 2121ms | 1431ms |
| Korea          | 1949ms |  45ms  |

_Note: snapshot of data taken on 9/5/2024_

## Get Started

These infrastructure improvements are already rolled out to all Shorebird customers around the world. 🥳

If you're new to Shorebird and want to get started, head over to the [Shorebird Console](https://console.shorebird.dev).
