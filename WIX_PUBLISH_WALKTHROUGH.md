# Wix Publish Walkthrough — RaviSphere HIT™ Executive Brief

Click-by-click. Goal: funnel live today. ~30–40 min. Do steps 1–4 to go live;
5–7 polish it. Copy sources: `hit-brief-landing.html` (the page) and
`RAVISPHERE_LAUNCH_KIT.md` (all copy).

---

## STEP 1 — Domain / SSL (2 min, do first)
1. Wix Dashboard → **Settings → Domains**.
2. Confirm `www.ravisphere.com` is set as **Primary**. If not, click the ⋯ next
   to it → **Set as primary**.
   - This one setting forces `ravisphere.com` → `www.ravisphere.com` **and** HTTPS.
3. Open `http://ravisphere.com` in a new tab → it should snap to
   `https://www.ravisphere.com` with a padlock. ✅

## STEP 2 — Put the HIT Brief homepage live (10 min)
**Easiest reliable path on Wix (Editor):**
1. Open the **Wix Editor** for ravisphere.com.
2. Left panel → **Add Elements → Embed Code → Embed HTML** (a.k.a. "HTML iframe").
   - Drag it onto a **blank page** set to full width/height, OR
3. Preferred for a real page: create a new page named **HIT Brief**, delete its
   default sections, drop a full-width **Embed HTML** element, click **Enter Code**,
   and paste the entire contents of `hit-brief-landing.html`.
4. Set this page as your **Homepage**: Menus & Pages → ⋯ next to "HIT Brief" →
   **Set as Homepage**.
5. If the embed feels constrained, alternative: use the Wix **"Import"** / paste
   flow if your plan shows it, or rebuild the sections natively using the copy
   from the file. The embed route is fastest for today.

> Tip: the file is self-contained (all CSS/JS inline) — nothing external to load.

## STEP 3 — Replace the navigation menu (5 min)
Editor → **Menus & Pages → Site Menu**. Set exactly these items:
- **HIT Brief** → Homepage
- **HIT Methodology** → link to homepage anchor `#methodology`
- **Advisory Services** → `#advisory`
- **About Lamar** → `#about`
- **Case Studies** → hide for now (no real proof yet)
- **Request Brief** → `#request` (style as a button)

Delete every old menu item (coaching, pricing, book-online, coming-soon).

## STEP 4 — Redirect the legacy pages (5 min) — kills executive-trust damage
Wix Dashboard → **Settings → SEO → URL Redirect Manager → + New Redirect** (301):

| Old URL (path) | Redirect to |
|----------------|-------------|
| `/coming-soon-03` | `/` |
| `/shield-assessment` | `/` (or `/#request`) |
| `/pricing-plans/list` | `/` |
| `/book-online` | `/#request` |
| any other "Coming Soon" page | `/` |

Then in the Editor, delete/hide those old pages and remove any footer text saying
**"Powered by Solomon Dynamics"** and any **$10 IT support** / coaching / JustBe /
ABM pricing copy. → **Publish.**

**You are now LIVE.** Steps 5–7 make it airtight.

## STEP 5 — Per-page SEO (5 min)
Dashboard → **Marketing & SEO → SEO Tools → Site pages**. For the homepage set:
- Title: `The HIT™ Executive Brief | RSI Advisory | RaviSphere Innovations`
- Description: (the meta line in `RAVISPHERE_LAUNCH_KIT.md` §3)
Set the other pages' titles/meta from §3. Mark the **Thank-You** page **noindex**.

## STEP 6 — Booking fix (5 min)
**Bookings → Services**: delete the **$10 IT support** service. Create ONE service:
- Name: **15-Minute HIT Brief Alignment Call**
- Duration: 15 min · Price: hidden/free
- Description: *A short executive alignment call to determine whether RSI should
  build your HIT™ Executive Brief.*
Put its link **only** on the thank-you page (the built page already scopes it there).

## STEP 7 — Email automation (10 min)
Dashboard → **Automations → + New Automation**:
- Trigger: **Form submitted** (your HIT Brief request form)
- Action 1 (immediate): send **Email 1** (subject + body from LAUNCH_KIT §4)
- Add 3 more automations with **Delay** 24h / 48h / 72h → Emails 2, 3, 4.
Set sender to `lamar@ravisphere.com`.

## Sitemap + favicon (2 min)
- Marketing & SEO → **SEO Tools → Google Search Console** → connect + **Submit sitemap**.
- Settings → SEO → **Social Share**: upload favicon (RSI hexagon) + 1200×630 share image.

---

### Fastest-to-live subset (if you only have 15 minutes)
Steps **1 → 2 → 4 → Publish**. That gives you a live premium homepage with the
form working and the legacy damage redirected. Nav, SEO, emails, booking can
follow tonight.
