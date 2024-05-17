---
layout: ../../layouts/MarkdownLayout.astro
title: Blog | How Shorebird Works
description: A deep-dive into some of the changes we made to Dart and Flutter in order to make code push work.
date: May 9, 2024
---

# How we changed Flutter and Dart to make code push work

One of the most common questions we get, is "how does Shorebird work?". This
article describes some of the changes we made to Dart and Flutter in order to
make code push work. If you have more questions, send us a mail or ask on
Discord and we’ll be happy to answer them or include them in a future article.

## Code Push

Code push, sometimes called "over the air updates", is a way of updating
application code in production so that all your users are always running the
latest code – just like how a web application works. [Code push for
Flutter](https://github.com/flutter/flutter/issues/14330) is one of the top 50
most upvoted issues across all of GitHub. Code push is a helpful tool to allow
developers to push small updates such as typos, small fixes, and crashing
without having to force all your users to download a new version of your app.

This blog takes a closer look at how we built a custom Dart toolchain and
runtime to make apps updatable in production. For more information on the
architecture of Shorebird Code Push, [check out our
docs](https://docs.shorebird.dev/architecture/).

## How Does Code Push Work?

Existing code push solutions have typically relied on WebViews or Lua scripts,
and require developers to use different languages and frameworks for different
parts of their applications. These also implicitly require developers to be able
to predict where their code will have bugs, since only some parts of their
applications are updatable and others not. At Shorebird, when we sat down to
build code push for Flutter, we wanted to build something better.

Shorebird’s code push for Flutter allows developers to update their Flutter apps
instantly, over the air, deploying fixes directly to end users’ devices.
Shorebird takes < 5 minutes to integrate and requires no code changes. Our code
push can update any Dart code in your app. We’ve designed our system to comply
with Apple and Google store policies without sacrificing performance (even after
patching).

Shorebird code push consists of:

1. A command line program -- the `shorebird` command knows how to wrap
   `flutter`, including pulling down its own fork of Flutter’s engine.
2. A fork of Flutter’s engine -- this includes our custom updater, a library we
   built to manage patches in your application.
3. A cloud service at shorebird.dev -- this stores information about your
   releases (builds you send to the stores) and patches (changes you make to
   releases via Shorebird), control rollout, see analytics, etc.
4. A fork of the Dart compiler toolchain -- this makes it possible to construct
   and run these "patches" to your application.

## A Closer Look at Dart

Dart has a "hot reload" feature used commonly during Flutter development. This
uses Dart’s "just-in-time" (JIT) compiler. A JIT compiler is a way of turning
source code into machine code right before the computer executes it. It’s the
way that JavaScript, Lua and many other languages typically work. Shorebird does
not use Dart’s JIT. Instead we use a custom interpreter we built. An
[interpreter](<https://en.wikipedia.org/wiki/Interpreter_(computing)>) is code
that is used to execute logic from source code directly, without "compiling" it
(translating it to machine code). This is important in the context of updates,
because use of an interpreter is required by [Apple’s developer
agreement](https://developer.apple.com/support/terms/apple-developer-program-license-agreement/#b331)
when updating applications. Dart did not have a production-ready interpreter,
but was designed in such a way that adding one was possible, so we did.

Just-in-time (JIT) systems have several nice properties. One is flexibility – a
JIT’d language like JavaScript can run source code it’s never seen before in
production. Another is that a JIT can be very good at "peak performance", since
a JIT runtime includes a compiler during production, which means a sophisticated
JIT can run some code, measure that it’s being run very often and then go back
and compile the same code in a more optimized way (with different tradeoffs) to
make it run faster (a type of "profile guided optimization"). In an
ahead-of-time (AOT) compiled language (like Swift), the source code is only used
on the developer’s machine to produce the "machine code" which will end up
running on the user’s device. AOT solutions have the nice advantage of not
including a compiler in production (yields a smaller binary size) as well as
having faster startup because there is no work to do when starting the app. At
the tradeoff of some amount of peak performance as well as flexibility.

Dart is an atypical language in that it has both JIT and AOT compiler workflows.
Dart was designed originally as a JIT’d language, but is now most commonly used
(as part of Flutter) with an AOT workflow. `flutter run –debug` uses Dart’s JIT
mode, but `flutter build ipa` uses Dart’s AOT mode. Another side-effect of being
a JIT is that typically much more information about the source code is kept
around during production. This extra information is part of what enables a JIT
to optimize hot functions, it’s also exactly the kind of information that has
enabled what Shorebird has done.

Functions within a JIT runtime need to be aware they could have different
compiled representations (e.g. one simple compile and one later optimized
compile for the same function). Shorebird takes advantage of this quirk of
Dart’s architecture to insert a new interpreter as an alternative mechanism
for a function to use to execute. This allows us to effectively replace parts of
your application at runtime without needing to compile new code on the device.

## Building a Custom Interpreter for Dart

Adding an interpreter to Dart was a challenge (working on compilers is hard, if
you like compilers, we’re [hiring](https://shorebird.dev/jobs/)), and took us
most of the last year. We didn’t try to build a particularly fancy interpreter
for Dart (that had been attempted at Google multiple times before), but rather
built something very simple. One of the challenges this creates is that
interpreters (and particularly our simple one) are very slow. In our case, our
current (unoptimized) interpreter is about 100x slower than executing Dart AOT
code on a CPU. Thankfully, we had an insight early on that made us not have to
care about interpreter speed.

This insight is that we can run only changed Dart logic on the interpreter,
while continuing to run unchanged code on the CPU. Since the vast majority of
the performance-critical Dart code in a Flutter program is typically the Flutter
framework itself, essentially all of your application would end up running (at
full speed) on the CPU, and your program as a whole would show unchanged
performance. This was our bet. Other than being extremely hard to make work, it
paid off.

Determining what parts of your program we could run on the CPU vs. interpreter
was hard. To do this we invented a new phase of Dart compilation we called the
"linker". The linker’s job is to analyze two (similar) Dart programs and find
the maximal similarity between them and then decide what would be necessary to
update in the first one in order to make it run like the second. We still have a
[couple missing
optimizations](https://github.com/shorebirdtech/shorebird/issues/1892) in this
part of our system, but when it works well, developers see 99% of their code run
on the CPU (even for large changes). Teaching the linker how to figure this out
however required significant changes to Dart’s compiler toolchain.

## Changes to Dart’s Toolchain

We made many changes to Dart, including:

1. Runtime changes to add our interpreter.
2. Compiler changes teach the Dart compiler how to compile a program maximally
   similar to a previous version of the same program.
3. A new linker which can compare parts two versions of an app and decide if and
   how they’ve changed.

And much more -- too many to go through here, but I’ll give one example of a
problem we recently solved.

## Optimizing Dart’s constant pool

In programming languages it is typical to have "constants" which are variables
that don’t change at runtime. These are often pre-computed during compile time,
saved in a common space and shared throughout the program. E.g. if you have the
string "hello" in your program many times, most compilers will only allocate a
single string "hello" and share it throughout your program.

Dart implements this using something called the "Object Pool" (aka a constant
pool). In Dart’s JIT mode, each function ends up with its own Object Pool to
hold constant references used within that function (e.g. strings, integers).
Dart’s AOT combines all of these "Object Pools" into one global object pool and
updates all parts of your program accordingly to reference slots in this global
object pool. So why does this matter? This matters because when we’re trying to
update your program if the new version of your code uses new constants (a very
common occurrence), those new constants also need a slot in this pool. Worse is
that if we add this slot in the middle of the pool, all of the references into
the latter half of the pool would break. If we’re trying to end up running code
on the CPU, we have to be very careful never to change things that the
pre-compiled code makes reference to.

For example:

```dart
void main() {
print("a");
print("z");
}
```

The dart compiler would produce an object pool:

```
0 : "a"
1 : "z"
```

If we then change that to be:

```dart
void main() {
print("a");
print("b");
print("z");
}
```

Dart object pool would be:

```
0: "a"
1: "b"
2: "z"
```

Notice that that index for "z" has changed! That means that all parts of your
program that reference "z" are now changed and thus we can’t use the previously
compiled (fast) version of any functions which reference "z", thus having to run
all logic which references "z" on the interpreter.

We solved this by teaching the Dart compiler how to construct order-dependent
structures (there are many of these) like the Object Pool in a stable ordered
fashion. Importantly we taught Dart that sometimes when it’s processing a
"patch", it should assign these indices in the Object Pool (and similar data
structures) to be maximally similar to how they were assigned in the provided
"base" release.

As noted above, we had to make many more changes to Dart in order to make it
work well for code push, but those we’ll have to save for another article.

## Conclusion

We made a lot of (difficult) changes to Dart so you don’t have to! Shorebird is
a drop-in replacement for `flutter build` and allows you to add code push to
your app in only a few minutes – with no code changes required.

Shorebird is free to use for small applications, with
[pricing](https://shorebird.dev/#pricing) that scales with your business needs.

Learn more at our website: https://shorebird.dev. See most of our source code
on GitHub: https://github.com/shorebirdtech/shorebird. If you ever have
questions, our entire team is on Discord: https://discord.gg/shorebird.
