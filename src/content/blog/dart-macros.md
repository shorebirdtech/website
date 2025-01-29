---
title: On Focus and Dart Macros
author: eseidel
description: Reacting to Google's decision to cancel Dart's "macros" feature
date: 2025-01-29
---

Brace yourselves. We may be in for another round of “Flutter is dying” and “Dart
is dying” hot takes across the blog-o-sphere.

But again, maybe at this point I’m used to it? I co-founded the Flutter project
at Google in 2014 and led the Flutter (and later Dart) teams at Google until
2022 when I left to found this company, Shorebird. Shorebird sells products to
teams using Flutter and I remain deeply involved and invested in Flutter and
Dart's success. Flutter has been “dying” or “about to be canceled by Google”
since we started the project 10 years ago. So I guess if "accounting for [1/3rd
of app submissions to
AppStore](https://medium.com/flutter/flutter-in-production-f9418261d8e1) or
Play” is what "dying" looks like, I’m here for it. 🙂

Today, Google's Dart team announced they are [stopping their work on "macros"
](https://medium.com/dartlang/an-update-on-dart-macros-data-serialization-06d3037d4f12).
Macros was planned as a new language feature to make it easier for Flutter and
Dart developers to express ideas requiring repetitive code (for example data
serialization) from simple syntax. C++, Rust, etc. all have variants of a
[macros](https://en.wikipedia.org/wiki/Macro_(computer_science)) feature with
various different tradeoffs. Dart took a particularly ambitious flavor that
ultimately proved unwieldy to implement to the Google team's satisfaction.

Two reasons Google took this step:

1. They’ve realized they can’t make macros pass their performance goals (without
   other even larger changes to the ecosystem or language).
2. The years of prototyping macros (with its ambitious scope), hasn’t been
   worth the effort/reward tradeoff.

Google is now breaking macros into smaller features and shipping those, and then
throwing out the parts of macros that they couldn’t make perform well enough to
ship.

Not the outcome the Dart community was rooting for, but overall I’m glad.

I'm always glad to see focus.

I was an intern at Apple 20 years ago. When I was there, Steve Jobs came and
spoke to all the interns. His talk was simple. He said “The challenge in life is
saying ‘no’. You have to say ‘no’ to make room for the ‘yes’. There will always
be more ‘yes’.”

That has stuck with me a long time and informed my choices for how I build
products and do business. It’s part of why Shorebird so far only has one
product, and why Flutter stuck to ‘just mobile’ for so long. Shorebird will
build many more things, but we’re choosing to focus on instant updates for now.

The macros work started while I still led the Dart team over 2 years ago. This
long development cycle (and public discussion thereof) has allowed macros grow
in the public consciousness to be seen as Dart’s coming magic bullet, here
to solve all our problems at once. It never was, and never could be.

Obviously, I wish the team had reached a go/no-go earlier, but
I’m glad they have now. Hopefully now we get a bunch of interesting smaller
things this year as a result. We’ll see.

The Google Dart team and wider community are full of passionate and talented
people. I’m looking forward to see what amazing things we do next.

Onward.
