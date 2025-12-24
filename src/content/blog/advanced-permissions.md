---
title: Introducing advanced permissions
author: shorebirdtech
description:
  Business and Enterprise plan customers now have access to advanced
  permissions.
date: 2025-12-24
cover: 'organizations-cover.png'
---

Enterprises rely on Shorebird to deliver Flutter updates fast and securely, and
today we’re making that even easier with advanced permission controls, designed
specifically for larger teams that need more granular governance over how
patches are tested and deployed.

<div style="display:flex;justify-content:center"\>  
<iframe width="560" height="315" src="https://www.youtube.com/embed/JSJW\_NrmSig?si=L35jHqSZCVcL-cJe" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
  
</iframe\>
</div>

These new capabilities provide more granular control over who can promote
patches, roll back patches, and view or modify settings ensuring release
workflows align with internal compliance and approval processes.

As teams scale, coordination and accountability is critical. Many roles may be
involved in the release cycle from developers building and testing patches to
operations teams managing what goes live in production and when.

With our new permission model, teams can ensure only authorized users can modify
the production environment.

For example:

- Developers may have permission to create and deploy patches to staging
  environments where QA and testing validate the patch.
- Release managers may have the final say of ensuring patches meet all
  acceptance criteria and deploying to production.
- Finance or procurement teams may only need access to billing and invoice
  information without having access to the applications.

Previously we offered three roles: Developer, Admin, and Owner. Today we are
expanding that model to better reflect how enterprises structure access.
Customers on Business and Enterprise plans today can now assign up to five
distinct roles to team members, depending on the plan.

The table below provides an overview of the various roles and their capabilities

| Role                                               | Capabilities                                                                                                              |
| :------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| Viewer                                             | Read-only access for stakeholders who need visibility into apps, releases, and patches. No ability to make changes        |
| Developer                                          | Create releases, promote patches, and manage day-to-day development workflows. No administrative or billing access        |
| App Manager _(available only on Enterprise plans)_ | Elevated control over app-level configuration, environments and release coordination                                      |
| Admin                                              | Can configure apps, manage users and roles, and perform operational tasks but not handle billing or subscription changes. |
| Owner                                              | Full access to manage billing, plans, and all platform capabilities. Oversees ownership and organizational governance.    |

If you were previously using “Collaborators” for per-app permissions this has
been integrated into this new model. No changes are necessary from you to take
advantage of these capabilities.

Companies of all sizes choose Shorebird to help them ship hot fixes and updates
faster without compromising control. These new permission features extend that
promise by providing the governance and flexibility that enterprise and IT
compliance teams need.

If you’re interested in trying these features or learning more about Shorebird,
please schedule time to
[talk to us](https://calendly.com/d/cmtb-j7m-qpb/shorebird-sales), check out the
[docs](https://docs.shorebird.dev/account/orgs/), or reach out on
[Discord](https://discord.gg/shorebird).
