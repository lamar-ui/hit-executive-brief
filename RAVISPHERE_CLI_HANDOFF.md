# RaviSphere Launch — Desktop CLI Handoff

You chose Option 2: execute the Wix launch from the **Claude Code desktop CLI**,
where tool-approval prompts actually appear so I can act on your Wix account.
This web session **cannot** do that — it can't surface approvals. The desktop CLI
can. This file is the bridge.

---

## Paste this to Claude Code on your Mac desktop CLI to resume

> Read `RAVISPHERE_CLI_HANDOFF.md`, `RAVISPHERE_LAUNCH_KIT.md`, and
> `hit-brief-landing.html` in this repo, then execute the RaviSphere HIT™ Brief
> launch on Wix. My Wix connector is enabled. Do the API-side work directly
> (legacy-page 301 redirects, per-page SEO metadata, Bookings service) with my
> approval, and give me the exact editor steps for the homepage embed. Founder is
> Lamar Dunn. HIT™ = Human Intelligence Training™, delivered through Harmonize ·
> Integrate · Transform.

---

## Before you start (2 min)
The Wix tools are a **claude.ai connector**. In the desktop CLI, confirm it's
available:
1. Run `/mcp` — you should see a **Wix** server. If it needs auth, complete the
   login/OAuth once (this is the step the web session couldn't do).
2. If Wix isn't listed, enable the **Wix connector** in your claude.ai connector
   settings, or add it via `claude mcp`, then restart the CLI.
3. When a tool asks approval, choose **"Allow"** (or "Always allow for this
   server" to move fast).

---

## What I (Claude) will execute directly via the Wix API — with your approval
These map 1:1 to `RAVISPHERE_LAUNCH_KIT.md`. I will look up each exact Wix REST
schema before calling — no guessing.

1. **301 redirects** (Redirects API) — `/coming-soon-03`, `/shield-assessment`,
   `/pricing-plans/list`, `/book-online`, any "Coming Soon" → `/`.
2. **Per-page SEO** (SEO/site pages API) — homepage + section-page titles/meta
   from LAUNCH_KIT §3; mark thank-you `noindex`.
3. **Bookings** — delete the $10 IT-support service; create one service:
   *15-Minute HIT Brief Alignment Call*, 15 min, price hidden.
4. **Sitemap** — confirm/submit where the API allows.

## What stays in the Wix Editor (API can't rebuild page design) — I'll give exact clicks
- **Homepage**: import `hit-brief-landing.html` (full-width Embed HTML) and set as
  Homepage. *(Or native rebuild in phase two.)*
- **Nav menu** swap.
- **Remove** "Powered by Solomon Dynamics" footer text + any residual $10 /
  coaching / JustBe copy the API can't reach.
- **Automation**: the 4-email sequence (Automations panel) — copy in LAUNCH_KIT §4.
- **Favicon + social share image**.

## Verify after publish
Visit `https://www.ravisphere.com` (SSL padlock), test each old URL redirects,
submit a test lead, confirm it lands in Wix Contacts, check mobile.

---

## Canonical brand facts (locked)
- **Founder:** Lamar Dunn (Charlie Dunn removed — not used anywhere).
- **HIT™ = Human Intelligence Training™**, delivered through the methodology
  **Harmonize · Integrate · Transform** (Option C). This is now reflected in
  `hit-brief-landing.html` (§Methodology) and LAUNCH_KIT Email 3.
- **Offer:** The HIT™ Executive Brief — board-ready technology clarity.
- **Positioning:** premium CIO/CTO advisory — AI strategy, M&A IT integration,
  cybersecurity, vendor optimization, FinOps, federal-grade strategy. Not
  coaching, not small IT support.

## Repo files
- `hit-brief-landing.html` — the homepage (Option C, ready to embed).
- `RAVISPHERE_LAUNCH_KIT.md` — emails, marketing, SEO, redirects, QA, status.
- `WIX_PUBLISH_WALKTHROUGH.md` — click-by-click editor steps (fallback if you'd
  rather do it yourself).
