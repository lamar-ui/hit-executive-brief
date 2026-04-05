# HIT Executive Brief - Remaining Tasks

> Repo: `lamar-ui/hit-executive-brief`
> Created: 2026-04-04
> Assignee: @lamar-ui

---

## HIGH Priority

### 1. Connect rsiadvisory.com domain to Vercel

- [ ] Add `rsiadvisory.com` domain in Vercel Settings > Domains
- [ ] Add DNS records in Cloudflare:
  - A record `@` -> `76.76.21.21`
  - CNAME `www` -> `cname.vercel-dns.com`
- [ ] Verify SSL provisioning completes successfully

**Labels:** `infrastructure`, `high-priority`

---

### 2. Add Kit (ConvertKit) environment variables to Vercel

- [ ] Add `KIT_API_KEY` from Kit Settings > Developer
- [ ] Add `KIT_TAG_ID` from Kit Subscribers > Tags
- [ ] Redeploy after adding environment variables
- [ ] Test form submission end-to-end

**Labels:** `infrastructure`, `high-priority`

---

## MEDIUM Priority

### 3. Set up Calendly for HIT Strategic Debrief

- [ ] Create Calendly account
- [ ] Create 30-min "HIT Strategic Debrief" event type
- [ ] Update thank-you page placeholder URL with real Calendly link
- [ ] Push code update

**Labels:** `feature`, `medium-priority`

---

### 4. Set up Kit welcome email automation

- [ ] Create automation: Tag "HIT Executive Brief" added -> send welcome email
- [ ] Email subject: "Your HIT Executive Brief Request -- Received"
- [ ] Email body: confirm receipt, set 5-day delivery expectation, invite reply with top 2 tech constraints
- [ ] Test automation end-to-end

**Labels:** `feature`, `medium-priority`

---

## LOW Priority

### 5. Add analytics to the site

- [ ] Enable Vercel Analytics (free tier) in project settings

**Labels:** `enhancement`, `low-priority`

---

### 6. Plan Wix migration for alwaysbeme.com and ravisphere.com

> Start after HIT launch is complete.

- [ ] Audit current Wix sites for content and functionality
- [ ] Plan migration to Next.js + Vercel

**Labels:** `planning`, `low-priority`

---

## Summary

| # | Task | Priority | Status |
|---|------|----------|--------|
| 1 | Connect rsiadvisory.com domain to Vercel | HIGH | Pending |
| 2 | Add Kit (ConvertKit) env vars to Vercel | HIGH | Pending |
| 3 | Set up Calendly for HIT Strategic Debrief | MEDIUM | Pending |
| 4 | Set up Kit welcome email automation | MEDIUM | Pending |
| 5 | Add analytics to the site | LOW | Pending |
| 6 | Plan Wix migration (alwaysbeme.com, ravisphere.com) | LOW | Pending |
