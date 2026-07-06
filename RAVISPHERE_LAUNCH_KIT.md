# RaviSphere Innovations — HIT™ Executive Brief Launch Kit

**Brand:** RaviSphere Innovations / RSI Advisory
**Founder:** Lamar Dunn
**Core offer:** The HIT™ Executive Brief — *Harmonize. Integrate. Transform.*
**One conversion path:** every page, button, email → **Request the HIT™ Executive Brief.**

This kit is the full, execute-ready package. The premium landing page is built
(`hit-brief-landing.html`, published as a live Artifact). Everything below is
copy/paste-ready for Wix. The **Execution Status** section at the end is an honest
account of what is done vs. what needs your Wix editor or accounts.

---

## 1. PAGE / SLUG MAP (target information architecture)

| Slug | Page | Status | Source |
|------|------|--------|--------|
| `/` and `/hit-brief` | HIT™ Executive Brief homepage | **Built** | `hit-brief-landing.html` |
| `/hit-methodology` | Harmonize / Integrate / Transform | Section built (anchor `#methodology`) — promote to page if desired | same file |
| `/advisory-services` | Advisory lanes | Section built (anchor `#advisory`) | same file |
| `/about` | About Lamar Dunn | "From the Desk of Lamar Dunn" section built | same file |
| `/request-brief` | Request form | Built (anchor `#request`, full form) | same file |
| `/thank-you` | Confirmation page | Built (inline `#thankyou` + standalone copy §6) | same file |
| `/case-studies` *(optional)* | Proof | Placeholder — needs real client outcomes | — |

### Redirects to create in Wix (301) — legacy cleanup
Point each of these to the HIT Brief funnel (`/` or `/request-brief`):

| Old URL | Action | Redirect target |
|---------|--------|-----------------|
| `/coming-soon-03` | 301 redirect | `/` |
| `/shield-assessment` | 301 redirect (if empty) | `/request-brief` |
| `/pricing-plans/list` | 301 redirect (kills coaching/JustBe pricing) | `/` |
| `/book-online` | Replace service, then keep clean URL | `/request-brief` (see §8) |
| Any "Coming Soon" page | 301 redirect | `/` |
| Any "Powered by Solomon Dynamics" footer | Remove text in editor | — |
| Any ABM/JustBe pricing page | 301 redirect | `/` |

> In Wix: **Settings → SEO → URL Redirect Manager → New Redirect** (301).
> Or Editor → Menus & Pages → delete/hide the page (Wix auto-prompts a redirect).

---

## 2. NAVIGATION (replace current menu)

Clean executive nav — every item is a real destination, CTA points to the form:

```
HIT Brief          →  /  (or /hit-brief)
HIT Methodology    →  /#methodology
Advisory Services  →  /#advisory
About Lamar        →  /#about
Case Studies       →  /case-studies   (hide until real proof exists)
[ Request Brief ]  →  /#request        (button style, accent)
```

Footer nav (mirror + legal): Request the Brief · Confidential Intake · NDA Available · © RaviSphere Innovations.

---

## 3. SEO METADATA (per page)

**Homepage / HIT Brief**
- Title: `The HIT™ Executive Brief | RSI Advisory | RaviSphere Innovations`
- Meta description: `Request the HIT™ Executive Brief from RSI Advisory. Board-ready technology clarity for CEOs, founders, COOs, and executive teams making high-stakes decisions around IT strategy, M&A, cybersecurity, AI, vendors, and transformation.`
  *(Both already hard-coded in `hit-brief-landing.html`.)*

**HIT Methodology**
- Title: `The HIT™ Methodology: Harmonize. Integrate. Transform. | RSI Advisory`
- Meta: `How RSI turns fractured technology decisions into board-ready clarity — the three-stage HIT method for executive technology strategy.`

**Advisory Services**
- Title: `Executive Technology Advisory Services | Fractional CIO/CTO, M&A IT, Cybersecurity | RSI`
- Meta: `Fractional CIO/CTO, M&A IT integration, cybersecurity advisory, vendor optimization, AI integration, and federal-grade technology strategy for executive teams.`

**About Lamar**
- Title: `About Lamar Dunn | Founder, RSI Advisory | RaviSphere Innovations`
- Meta: `Lamar Dunn founded RSI Advisory to give executive teams direct, confidential technology clarity — not vendor noise. Request the HIT™ Executive Brief.`

**Request Brief**
- Title: `Request the HIT™ Executive Brief | Confidential Executive Intake | RSI`
- Meta: `Confidential intake for the HIT™ Executive Brief. NDA available. 10-minute executive read, 5-day delivery, limited monthly capacity.`

**Thank-You** — `noindex` this page.
- Title: `Request Received | HIT™ Executive Brief | RSI Advisory`

### Sitemap / Search Console
- Wix auto-generates `https://www.ravisphere.com/sitemap.xml`. After the slug changes go live, in **Wix → Marketing & SEO → SEO Tools → Google Search Console**, connect the property and click **Submit sitemap**. If GSC isn't verified yet, Wix offers one-click verification through the same panel (or add the GSC meta tag in Settings → SEO → Advanced).
- Set a professional **favicon** (RSI hexagon/monogram) and **social share image** (1200×630, dark-ink + brass, "The HIT™ Executive Brief") in **Settings → SEO → Social Share**.

---

## 4. EMAIL AUTOMATION — 4-email sequence

Tone across all four: premium, direct, confidential, executive-grade, no fluff.
Sender: `Lamar Dunn, RSI Advisory <lamar@ravisphere.com>`. Set up in Wix
Automations (Trigger: *Form submitted → HIT Brief Request*) or your ESP.

---

### Email 1 — Immediate confirmation (trigger: on submit)
**Subject: Your HIT™ Executive Brief Request Was Received**

> {{FirstName}},
>
> Your request for the HIT™ Executive Brief has been received.
>
> Here is what happens next. RSI reviews every request for fit, urgency, and
> confidentiality — we do not take every engagement. If your situation is a fit,
> you'll receive next steps within 24 hours, including how we handle NDA and
> confidential intake.
>
> The HIT™ Executive Brief is a board-ready read of your highest-stakes
> technology decision: what to fix, what to avoid, and what to do next. Ten
> minutes to read. Five days to deliver.
>
> If your timeline is urgent, reply to this email directly and say so.
>
> — Lamar Dunn
> Founder, RSI Advisory · RaviSphere Innovations
>
> *Confidential. This message is intended only for {{FirstName}} {{LastName}}.*

---

### Email 2 — 24-hour authority email (delay: 24h)
**Subject: Why Technology Decisions Break at the Executive Level**

> {{FirstName}},
>
> Most technology decisions don't fail in the server room. They fail in the
> boardroom — where the people accountable for the outcome are handed vendor
> decks instead of clarity.
>
> Three patterns break executive technology decisions:
>
> **1. Vendor noise replaces judgment.** Every vendor is the answer to their own
> question. None of them own your P&L.
>
> **2. Integration debt is invisible until it isn't.** M&A, new platforms, and
> "quick" tools quietly fracture. Then a board meeting exposes it.
>
> **3. Risk lives between departments.** Cyber, spend, and strategy each look
> fine alone. The exposure is in the seams.
>
> The HIT™ Executive Brief exists to close those seams — one board-ready view of
> what to fix, what to avoid, and what to do next. No vendor allegiance.
>
> If RSI accepts your request, that's exactly what you'll receive.
>
> — Lamar Dunn
> Founder, RSI Advisory

---

### Email 3 — 48-hour methodology email (delay: 48h)
**Subject: Harmonize. Integrate. Transform.**

> {{FirstName}},
>
> HIT is not a framework we borrowed. It's how RSI thinks.
>
> **Harmonize** — We align technology, spend, and risk to the actual business
> objective. Before recommending anything, we get the picture whole.
>
> **Integrate** — We map how the decision touches every seam: systems, vendors,
> security, cost, and the people who have to live with it.
>
> **Transform** — We hand you a board-ready path: what to fix, what to avoid,
> what to do next — sequenced and defensible.
>
> That's the difference between a consultant's opinion and an executive brief you
> can put in front of a board.
>
> If you're ready, your HIT™ Executive Brief request is already in review.
>
> — Lamar Dunn
> Founder, RSI Advisory

---

### Email 4 — 72-hour conversion email (delay: 72h)
**Subject: Should RSI Build Your Executive Brief?**

> {{FirstName}},
>
> A direct question: is now the right time for RSI to build your HIT™ Executive
> Brief?
>
> It's the right time if —
> - You're facing a high-stakes technology decision (M&A IT, a platform bet, a
>   cyber exposure, a vendor renewal that's really a strategy question).
> - You need something board-ready, not another discovery call.
> - Confidentiality matters. NDA is available.
>
> RSI holds limited monthly capacity on purpose. If your request is a fit and the
> timing is right, the fastest next step is a short, no-pressure alignment call.
>
> **→ Schedule your 15-Minute HIT Brief Alignment Call** {{AlignmentCallLink}}
>
> If the timing isn't right, reply and tell me when it will be. I'll follow up
> then — no drip, no noise.
>
> — Lamar Dunn
> Founder, RSI Advisory · RaviSphere Innovations

---

## 5. BOOKING FIX

**Remove:** any `$10 IT support` / senior-tech-help / old-branding booking service.

**Create one service only:**
- **Name:** 15-Minute HIT Brief Alignment Call
- **Duration:** 15 minutes
- **Description:** *A short executive alignment call to determine whether RSI
  should build your HIT™ Executive Brief.*
- **Price:** Do **not** display pricing. (Wix: set service to "Free" or hide the
  price element; this is a qualification call, not a paid product.)
- **Visibility:** Link appears **only** on the thank-you page and in Email 4 —
  not in the main nav, not on the homepage.

---

## 6. THANK-YOU PAGE COPY (standalone, `noindex`)

**Headline:** Your HIT™ Executive Brief Request Has Been Received

**Body:** Thank you for requesting the HIT™ Executive Brief. RSI reviews every
request for fit, urgency, and confidentiality. If accepted, you will receive next
steps within 24 hours.

**CTA button:** Schedule Optional 15-Minute Alignment Call → *(calendar link)*

> Rule enforced in the build: the calendar link is rendered **only** inside the
> post-submit `#thankyou` block — never on the public homepage before submission.

---

## 7. MARKETING LAUNCH ASSETS

**Core message:** Executives do not need more vendor noise. They need clarity.
The HIT™ Executive Brief gives leaders a board-ready view of what to fix, what to
avoid, and what to do next.

### LinkedIn post
> Executives don't have a technology information problem. They have a clarity
> problem.
>
> Every vendor is the hero of their own pitch. Every platform "integrates
> seamlessly." Every renewal is "strategic." And somehow the person accountable
> to the board is the one holding the least clarity in the room.
>
> That's why I built the HIT™ Executive Brief at RSI Advisory.
>
> One board-ready read of your highest-stakes technology decision:
> → what to fix
> → what to avoid
> → what to do next
>
> Harmonize. Integrate. Transform. Ten minutes to read. Five days to deliver.
> NDA available. Confidential by default.
>
> If you're weighing an M&A IT integration, a cybersecurity exposure, an AI bet,
> or a vendor decision that's really a strategy decision — this is for you.
>
> Request the HIT™ Executive Brief → www.ravisphere.com
>
> #ExecutiveAdvisory #CIO #CTO #TechnologyStrategy #MergersAndAcquisitions

### Email announcement (to your list)
**Subject: Introducing the HIT™ Executive Brief**
> Most technology decisions reach the board as vendor noise. The HIT™ Executive
> Brief reaches them as clarity — a board-ready view of what to fix, what to
> avoid, and what to do next.
>
> Harmonize. Integrate. Transform. Ten-minute read. Five-day delivery. NDA
> available. Limited monthly capacity, by design.
>
> If you're facing a high-stakes technology decision, request your brief today.
>
> → Request the HIT™ Executive Brief: www.ravisphere.com
>
> — Lamar Dunn, Founder, RSI Advisory

### Short text message
> Just launched: the HIT™ Executive Brief from RSI Advisory — a board-ready read
> on your biggest tech decision: what to fix, what to avoid, what to do next.
> NDA available. Request yours: www.ravisphere.com

### 3 social captions
1. Vendor decks aren't strategy. The HIT™ Executive Brief is. Board-ready
   technology clarity in 10 minutes. → www.ravisphere.com
2. What to fix. What to avoid. What to do next. One executive brief. NDA
   available. The HIT™ Executive Brief → RSI Advisory.
3. Harmonize. Integrate. Transform. The way executive technology decisions should
   be made. Request the HIT™ Executive Brief → www.ravisphere.com

### 5 headline hooks
1. Your board doesn't need another vendor deck. It needs a decision.
2. The 10-minute read that replaces six vendor calls.
3. What to fix, what to avoid, what to do next — on one page.
4. Technology decisions break at the executive level. Here's the fix.
5. Clarity is the deliverable. Everything else is noise.

### 3 CTA variants
1. Request the HIT™ Executive Brief
2. Get Board-Ready Technology Clarity
3. Start Your Confidential Intake

---

## 8. QA CHECKLIST (run after Wix publish)

| Check | How to verify | Owner |
|-------|---------------|-------|
| Desktop homepage renders clean | Load www.ravisphere.com | You / me via screenshot |
| Mobile homepage renders clean | Load on phone or DevTools 390px | You |
| All nav links resolve | Click each menu item | You |
| Every CTA → request form | Click each button | You |
| Form submits | Submit a test lead | You |
| Thank-you page shows | After test submit | You |
| Confirmation email (E1) fires | Check inbox after test | You |
| Lead lands in CRM/contacts | Wix Contacts / CRM | You |
| Calendar link only on thank-you | Confirm not on homepage | ✅ enforced in build |
| Legacy redirects work | Visit each old URL → lands on funnel | You |
| SEO title/meta correct | View source / Wix SEO panel | ✅ set in build; mirror in Wix |
| SSL / HTTPS active | Padlock + https:// | Verify §Execution |
| non-www → www redirect | Visit ravisphere.com (no www) | Verify §Execution |
| Footer links valid | Click each | You |
| No "Coming Soon" / "Solomon Dynamics" / $10 support anywhere | Site search | You |

---

## 9. EXECUTION STATUS — done vs. needs-you (honest)

### ✅ Done in this session (by me)
- **Premium HIT™ Executive Brief homepage** built end-to-end: exact hero copy,
  all 9 sections (Problem, What It Is, Who It's For, What's Inside, HIT
  Methodology, Advisory Lanes, Why RSI, From the Desk of Lamar Dunn, Request),
  dual CTA, 5 trust points, dark/light theme, mobile-responsive.
  → File: `hit-brief-landing.html` · Live Artifact preview published.
- **Working request form** with all 12 specified fields + inline validation +
  post-submit thank-you flow (exact copy) + calendar-link-only-after-submit rule.
- **4-email automation sequence** — full copy, exact subject lines (§4).
- **Thank-you page copy** (§6). **Booking spec** (§5). **SEO titles/meta + slug
  map + redirect map + sitemap/GSC guidance** (§1, §3). **All marketing launch
  assets** (§7). **QA checklist** (§8).

### ⚠️ Needs your Wix account (I could not execute — see why)
The Wix API tools in this environment require **interactive per-call approval**,
which cannot be granted in a non-interactive web session. So I could not push live
mutations to ravisphere.com from here. To go live, do these in the Wix dashboard —
each maps 1:1 to a section above:
1. **Import the homepage** — Wix Editor, paste the `hit-brief-landing.html`
   content (or use the HTML embed / "Import design" flow). This replaces the
   Coming Soon / legacy homepage.
2. **Create the 6 redirects** — Settings → SEO → URL Redirect Manager (§1 table).
3. **Replace nav menu** — Editor → Menus & Pages (§2).
4. **Set per-page SEO** — Marketing & SEO → SEO Tools (§3).
5. **Build the automation** — Automations → Trigger: HIT Brief form submitted →
   4 emails with the delays in §4.
6. **Fix Bookings** — delete the $10 service, create the 15-min alignment call
   (§5), hide price.
7. **Submit sitemap + verify GSC**, set favicon + social image (§3).

### ✅ Verifiable by you in 2 minutes (domain/SSL — item 1 of brief)
- Visit `https://www.ravisphere.com` → padlock = SSL active.
- Visit `http://ravisphere.com` (no www, no https) → should auto-upgrade to
  `https://www.ravisphere.com`. Wix does this automatically once www is set as the
  **primary** domain in **Settings → Domains**. If it doesn't, set www primary
  there — that's the one toggle that fixes non-www→www + forces HTTPS.

### Exact next 3 actions for launch marketing TODAY
1. **Publish the homepage in Wix** (import `hit-brief-landing.html`) and confirm
   the request form submits to your Wix Contacts — that alone makes the funnel
   live and lets you start driving traffic.
2. **Post the LinkedIn announcement** (§7) from Lamar's profile with the
   www.ravisphere.com link — your warmest executive audience is already there.
3. **Send the email announcement** (§7) to your existing contact list and set the
   4-email automation (§4) so every new request is worked automatically.
