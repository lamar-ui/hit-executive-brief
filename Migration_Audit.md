# RSI Email Migration Audit — Wix → Microsoft 365 / Teams

**Prepared for:** Lamar Dunn, RaviSphere Innovations (RSI) LLC
**Date:** 2026-07-13
**Author:** RSI billing/ops engineer
**Decision requested:** Approve migration of RSI mailboxes off Wix onto Microsoft 365 Business Basic (includes Teams), and stand up a free `billing@` shared mailbox.

---

## 1. Executive summary

RSI is paying a **premium markup** for email by hosting mailboxes through Wix (Wix resells Google Workspace and marks it up per box). We can cut that to **one paid license (~$6/mo)** by moving to **Microsoft 365 Business Basic**, because:

- **Shared mailboxes are FREE on Microsoft 365** — `billing@`, `info@`, `support@` cost **$0** (no license, up to 50 GB each). On Wix/Google every box is a paid seat.
- **Teams is included** in Business Basic at no extra cost — this is the "migrate to Teams asap" goal, bundled in.
- DNS already lives on **Cloudflare**, so cutover is a clean MX/record swap — no registrar transfer, no downtime if staged correctly.
- Website transactional email (**Resend**, `lamar@rsiadvisory.com` welcome emails) is a **separate system and stays exactly as-is** — this migration does not touch it.

**Bottom line:** Likely **60–90% reduction** in monthly email cost, plus Teams, plus a free automated `billing@` box — for roughly **$6/user/month**.

> ⚠️ **One number to confirm before we pull the trigger:** your *actual current Wix email bill* (per box, monthly vs. annual). Log into Wix → Billing and note it. The savings math below uses typical Wix pricing until you confirm.

---

## 2. Current state (verified vs. to-confirm)

| Item | Status | Source |
|---|---|---|
| Primary domain | **rsiadvisory.com** | `DEPLOY_DNS_SETUP.md` ✅ |
| Registrar / DNS | **Cloudflare** | `DEPLOY_DNS_SETUP.md` ✅ |
| Website host | **Vercel** (hit-executive-brief) | `DEPLOY_DNS_SETUP.md` ✅ |
| Transactional/website email | **Resend** → `lamar@rsiadvisory.com` | `EMAIL_SETUP.md` ✅ |
| Mailbox hosting (human inboxes) | **Wix** (resold Google Workspace) | Reported — **confirm plan & cost** ⚠️ |
| Current mailboxes in use | e.g. `lamar@…` — **confirm full list** | ⚠️ |
| Secondary domain | **ravisphere.com** (referenced) — in use for email? | **confirm** ⚠️ |
| `billing@` automated box | **Does not exist yet** | — |

**Action to confirm (5 min):** In Wix Billing, capture (a) monthly/annual price, (b) number of boxes, (c) exactly which addresses forward or receive mail. This is the only blocker to a firm savings figure.

---

## 3. The cost problem

Wix does not run its own mail — it **resells Google Workspace and adds a margin**. So RSI pays:

- **Per-box pricing** (every alias/role address that needs to receive mail tends to become a paid seat), **plus**
- A **reseller markup** over Google's own $6–7/user list price, **plus**
- You're locked into Wix's billing and admin console for something Wix isn't specialized in.

The structural issue: **role addresses** (`billing@`, `info@`, `support@`) shouldn't cost a full seat each. On Microsoft 365 they don't.

---

## 4. Options compared

| Option | Monthly cost (RSI scenario) | Teams? | Free shared boxes? | Effort | Verdict |
|---|---|---|---|---|---|
| **Stay on Wix** | Highest (per-box + markup) | No | No | None | ❌ Status quo — the problem |
| **Microsoft 365 Business Basic** | **~$6 / licensed user** + $0 shared boxes | ✅ Included | ✅ Yes (50 GB each) | Medium (MX cutover) | ✅ **Recommended** |
| Google Workspace (direct, drop Wix markup) | ~$6–7 / user, **every box a seat** | No (uses Meet) | Only via Groups (clunky) | Medium | ➖ Cheaper than Wix, no Teams, no free role boxes |
| Zoho Mail | ~$1–3 / user (or free tier, 1 domain) | No (Zoho Cliq) | Limited | Medium | ➖ Cheapest, but off the Microsoft/Teams path you want |
| Cloudflare Email Routing | **$0** (receive-only forwarding) | No | ✅ Unlimited forwards | Low | ➕ Great **complement** — see §6 |

### Why Microsoft 365 Business Basic wins for RSI
- **$6/user/mo (annual)** gets Lamar a real 50 GB Exchange mailbox, Teams, web+mobile Office, 1 TB OneDrive.
- **`billing@`, `info@`, `support@` = free shared mailboxes** — full inboxes multiple people can watch, no seat cost.
- **Teams included** → satisfies "migrate to Teams asap" with zero extra spend.
- Professional admin console, strong deliverability (SPF/DKIM/DMARC), calendar, and the Microsoft ecosystem clients expect from a CIO-advisory firm.
- If you later want desktop Office apps, upgrade that one seat to **Business Standard (~$12.50/mo)** — no re-migration.

---

## 5. Recommendation

**Migrate RSI mailboxes to Microsoft 365 Business Basic. One licensed seat for Lamar; `billing@` and other role addresses as free shared mailboxes. Keep DNS on Cloudflare. Leave Resend untouched.**

Target end-state on **rsiadvisory.com**:

| Address | Type | Cost | Purpose |
|---|---|---|---|
| `lamar@rsiadvisory.com` | Licensed mailbox (Business Basic) | ~$6/mo | Primary inbox, Teams, calendar |
| `billing@rsiadvisory.com` | **Shared mailbox** | **$0** | Invoices, Stripe/CC replies, payment confirmations |
| `info@rsiadvisory.com` | Shared mailbox | $0 | General/inbound |
| `support@rsiadvisory.com` | Shared mailbox (optional) | $0 | Client support |

**Estimated new cost: ~$6/month** (one seat) vs. today's Wix bill. Confirm the delta once you pull the Wix number.

---

## 6. `billing@` — two ways, pick based on timing

**Option A — Do it the day M365 is live (best):** Create `billing@rsiadvisory.com` as a **free shared mailbox** in M365. Grant Lamar (and anyone else) access. It sends *and* receives, shows in Outlook/Teams, and is the clean home for Stripe invoice replies and payment confirmations. **This is the target.**

**Option B — Want `billing@` working TODAY, before migrating (zero cost):** Because DNS is already on Cloudflare, turn on **Cloudflare Email Routing** and forward `billing@rsiadvisory.com → cldunn2377@gmail.com` (or Lamar's inbox). Receive-only, live in ~5 minutes, $0. When M365 goes live, replace the forward with the real shared mailbox.

> This directly supports the Stripe work: once `billing@rsiadvisory.com` exists, it becomes the Stripe account's billing/reply-to address so Mattress Warehouse payment confirmations land in a dedicated, monitored box instead of a personal inbox.

---

## 7. Migration plan (phased, low-risk)

**Phase 0 — Prep (before touching anything)**
1. Confirm current Wix email cost + full list of live addresses (§2).
2. Confirm whether `ravisphere.com` also carries mail (if yes, repeat the domain steps for it, or forward it to rsiadvisory.com).
3. Buy **Microsoft 365 Business Basic**, 1 seat, at admin.microsoft.com. Do **not** cancel Wix yet.

**Phase 1 — Stand up M365 (no mail flow change yet)**
4. Add domain `rsiadvisory.com` in the M365 admin center; Microsoft issues a **TXT verification** record → add it in Cloudflare DNS.
5. Create `lamar@` (licensed) and `billing@` / `info@` (shared mailboxes).
6. **Do not switch MX yet** — mail still flows to Wix. Everything is staged.

**Phase 2 — Migrate existing mail (avoid data loss)**
7. Export/import existing Wix (Google) mailbox content into the new M365 mailbox (IMAP migration or export-then-import). Verify Lamar's history is present.

**Phase 3 — Cutover (the ~15-minute window)**
8. In **Cloudflare DNS**, replace Wix's MX records with Microsoft's, and add SPF / DKIM / DMARC / Autodiscover (records provided by M365 setup wizard — see §8).
9. Send a test email in and out of each box. Confirm delivery, no spam-flagging.
10. Verify Teams login for `lamar@`.

**Phase 4 — Decommission (after 1–2 clean days)**
11. Confirm no new mail is arriving at Wix and history migrated correctly.
12. **Cancel Wix email plan.** (Keep the Wix *site/domain* only if you still use it for anything else — cancel just the mailboxes.)
13. Update the **Stripe account billing/reply-to** to `billing@rsiadvisory.com`.

> **Timing:** run Phase 3 **off-hours** (evening/weekend) and **after** the Mattress Warehouse invoice is settled, so nothing competes with live client billing. Invoice V0NA2PZC-0001 is due **Jul 23** — cut over after that clears.

---

## 8. DNS records (Cloudflare) — reference

Microsoft's setup wizard generates the exact values; typical set:

| Type | Name | Value (example — use M365's) | Purpose |
|---|---|---|---|
| TXT | @ | `MS=msXXXXXXXX` | Domain verification |
| MX | @ | `rsiadvisory-com.mail.protection.outlook.com` (priority 0) | Inbound mail → Microsoft |
| TXT (SPF) | @ | `v=spf1 include:spf.protection.outlook.com -all` | Anti-spoof |
| CNAME | autodiscover | `autodiscover.outlook.com` | Client auto-config |
| CNAME | selector1._domainkey | (M365 DKIM value) | DKIM signing |
| CNAME | selector2._domainkey | (M365 DKIM value) | DKIM signing |
| TXT (DMARC) | _dmarc | `v=DMARC1; p=quarantine; rua=mailto:billing@rsiadvisory.com` | Deliverability/reporting |

**Two cautions:**
- **Remove the old Wix MX records** at cutover — two MX sets = split/lost mail.
- **SPF must be a single record.** If Resend added an SPF entry for `rsiadvisory.com`, **merge**, don't add a second — combine Microsoft + Resend includes into one `v=spf1 … -all` line. (Resend's DKIM/CNAMEs are separate and stay put.)

---

## 9. Risks & rollback

| Risk | Likelihood | Mitigation |
|---|---|---|
| Lost email during cutover | Low | Stage M365 fully before MX swap; migrate history first (Phase 2) |
| Deliverability dip (new sending domain) | Low–Med | Set SPF/DKIM/DMARC correctly; warm gradually |
| Breaking Resend website emails | Low | Untouched — different sender path; just don't duplicate SPF |
| `ravisphere.com` mail forgotten | Med | Confirm in Phase 0; migrate or forward it too |
| Cancel Wix too early | Med | Wait 1–2 clean days (Phase 4) before cancelling |

**Rollback:** MX/DNS changes are reversible in Cloudflare within minutes. Keeping the Wix plan active through Phase 3 means we can point MX back if anything misbehaves.

---

## 10. Cost summary

| | Today (Wix) | After (M365 Basic) |
|---|---|---|
| Licensed mailbox (Lamar) | resold Workspace + markup | ~$6/mo |
| `billing@` / `info@` / `support@` | per-box paid seats | **$0 (shared)** |
| Teams | not included | **included** |
| **Est. monthly total** | **[confirm Wix bill]** | **~$6/mo** |

Even at Wix's floor, moving role addresses to free shared mailboxes plus getting Teams for free makes this net-positive from month one.

---

## 11. Action checklist

- [ ] Pull actual Wix email cost + address list (unblocks firm savings number)
- [ ] Decide `billing@` timing: today via Cloudflare forward (Option B) or at cutover (Option A)
- [ ] Purchase M365 Business Basic (1 seat)
- [ ] Verify domain + create `lamar@` (licensed) and `billing@` (shared) in M365
- [ ] Migrate existing mail history from Wix
- [ ] Cutover MX/SPF/DKIM/DMARC in Cloudflare (off-hours, **after Jul 23**)
- [ ] Test in/out on every box + Teams login
- [ ] Cancel Wix email plan (after 1–2 clean days)
- [ ] Point Stripe billing/reply-to → `billing@rsiadvisory.com`

---

*Prohibited actions (purchasing the M365 license, entering payment credentials, changing DNS, cancelling Wix) are yours to execute — I'll prep exact values and walk each step, but I won't buy, pay, or flip DNS on your behalf.*
