---
title: Full Stack Web Software Engineer
description:
  Own our front-ends and work with designers to optimize user experience for
  Shorebird customers.
location:
  Remote (North America) or in-person (Chicago, New York City, or San Francisco)
type: Full-time
cover: engineer-cover.png
---

<!-- cspell:words jaspr upgrader -->

### Overview

We have one successful product with thousands of monthly users, delivering 10s
of millions of updates around the globe, every month. We built this all with 2
engineers. We also recently launched a second product which is also growing. We
simply need more engineers to keep up with our growing user base and ambition.

### What You'll Do

- Own our web front-ends. This includes our shorebird.dev,
  console.shorebird.dev, admin.shorebird.dev (private), and other projects.

- Implement web-facing features end-to-end. We use small "backends for frontend"
  written in React, which talk to our backend APIs or (in a few cases) our
  Postgres database directly with prisma.

- Help us build all the web/cloud parts for services that Flutter developers
  need, but don't want to build themselves (e.g. anything Firebase offers,
  various GitHub-adjacent services, etc).

- Work with designers to optimize for user experience.

- Help shape our culture, processes, and product direction.

- Note: We do not use Flutter Web (or Jaspr) and don't write raw CSS or HTML.
  UX/UI design skills are welcome (and valued), but you will also have designers
  on contract to support you. Ability to deliver end-to-end features is
  critical.

### What We're Looking For

- Located in North America, ideally Chicago, New York City or San Francisco.

- Strong desire to work at a startup. We're a tiny team. All remote. You'll have
  to want to make your own decisions and own them.

- Mission alignment. You care about helping the world stop writing everything
  twice. Flutter is our tool for that and Shorebird aims to take Flutter beyond
  where Google can.

- 2+ years of experience shipping production web apps.

- At least one year with Remix, React Router, Vue, Next.js, Svelte or similar
  full stack TypeScript framework (we use Remix/React Router).

- Experience with React, TypeScript, Postgres and (ideally) Dart (what our
  backend is written in). You should be able to look at
  https://console.shorebird.dev and say "sure, I could build that".

- Experience testing code and code coverage.

- You're a self-starter — you work well with little oversight and thrive in
  ambiguous environments. You'll have support as a member of our engineering
  team, but this still won't be like working at a big tech job with formal
  training or processes, you'll have to learn and teach yourself most things
  (with help).

- You care about product quality and developer experience.

- Nice to have: Experience with Tailwind, ShadCN, Vite, TurboRepo (all of which
  we use).

- Nice to have: Startup experience, ideally B2B SaaS.

### Why Join

- Work directly with a small, senior team solving hard, high-impact problems.

- Competitive compensation + early equity.

- Shape the future of how mobile apps are built and shipped.

- This job is a great opportunity for someone who wants to work at a startup,
  has done some frontend but is generally interested in the opportunities that
  come from working on such a small and senior team.

- Direct access to 1000s of customers via our Discord.

- We travel 3-4x per year to a central location (e.g. Chicago) to work/socialize
  as a team for a week.

### What your days will look like.

#### First day

- You'll pair with Felix or Bryan and walk through our various repositories. Our
  typescript is pretty self-explanatory (and only ~20k lines), our backends are
  all written in Dart (and ~200k lines).
- You'll also be encouraged to use the product and take notes. There is a lot we
  see in first glance at something that goes away with time, best to embrace
  (and document) that novelty while it lasts.
- We'd probably start with something small, like surfacing failure counts on the
  console to encourage you to see the whole stack.

#### First Week

- Our web console is probably the #1 touch point for our users, but also
  something we've spent the least amount of time on across our system. Your task
  is to fix that.
- There are obvious gaps in our existing console (e.g. we don't even have a page
  where you an see all the CI jobs ever run for your repository, we don't stream
  logs in real time for CI, etc.), so we'd pick a small one and start there.
- Maybe next we'd try adding GitHub Auth as a supported login type which is
  mostly front-end work with a little database work.
- We might then begin an attempt to revamp the landing page, to be more of a
  dashboard and less focused on our first product. Overall we eventually need to
  design pages that provide value to users every day (that they would bookmark
  or share), rather than our current console that is primarily a CRUD interface
  onto our database.

#### First Month

- As you need it, we have a designer on contract you can work with,
  alternatively you're empowered to just implement things. There are only 4 of
  us and while we're here to help, the doer decides.
- Over time you'll add more testing to our typescript code (our Dart code has
  100% coverage our typescript close to 0%).
- Design and implement display of per-app daily active users within our console
  (will require some backend work, some client-library work, and a TOS update).
- Design and implement display of icons (or other per-app metadata) within the
  console (will require standing up a processing service on app upload,
  something we recently added infrastructure to make easy).

#### First Quarter

- You'll talk to our customers (over Discord, slack, email).
- You'll design and implement a dashboard/status page you'd want to visit every
  day.
- You'll design and implement pages users will want to share around with their
  teams.
- You'll also add whole features (and products) like a "force upgrade" product
  (which is mostly console work with a little bit of backend for something like
  [package:upgrader](https://pub.dev/packages/upgrader)), or adding new user
  role types (like view-only), or exposing an audit-log for enterprise
  customers. All of these are mostly web-work, but require being comfortable
  moving across the stack.

Essentially you're job is to help us build a modern B2B Saas, focused from a
Web/Front-end perspective, but because we're a small team (2 engineers) that
means, working across the stack (mostly in typescript and Dart) to ship what you
need to.
