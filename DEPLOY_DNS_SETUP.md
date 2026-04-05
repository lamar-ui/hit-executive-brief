# Deploy rsiadvisory.com -- DNS and Vercel Setup

Domain: **rsiadvisory.com**
Registrar: **Cloudflare**
Host: **Vercel** (project: hit-executive-brief)

---

## Step 1: Add the Domain in Vercel

1. Go to https://vercel.com/dashboard
2. Click on the **hit-executive-brief** project
3. Go to **Settings** > **Domains**
4. Type `rsiadvisory.com` and click **Add**
5. Type `www.rsiadvisory.com` and click **Add**
6. Vercel will show a "pending verification" status -- that is normal until DNS is configured

---

## Step 2: Set Up DNS Records in Cloudflare

1. Log in to https://dash.cloudflare.com
2. Select the **rsiadvisory.com** domain
3. Click **DNS** > **Records** in the left sidebar
4. Delete any existing A or CNAME records for `@` or `www` if present

**Add Record 1 (root domain):**

| Field   | Value            |
|---------|------------------|
| Type    | A                |
| Name    | @                |
| Content | 76.76.21.21      |
| Proxy   | **DNS only** (grey cloud -- NOT proxied) |
| TTL     | Auto             |

**Add Record 2 (www subdomain):**

| Field   | Value                    |
|---------|--------------------------|
| Type    | CNAME                    |
| Name    | www                      |
| Target  | cname.vercel-dns.com     |
| Proxy   | **DNS only** (grey cloud -- NOT proxied) |
| TTL     | Auto                     |

**Important:** The orange cloud (Proxied) must be OFF for both records. Click the cloud icon so it turns grey. Vercel needs direct DNS access to issue SSL certificates.

---

## Step 3: Wait and Verify

DNS changes can take 5-30 minutes to propagate. To confirm everything is working:

1. Go back to Vercel **Settings** > **Domains** -- both domains should show a green checkmark
2. Open https://rsiadvisory.com in your browser -- the site should load
3. Open https://www.rsiadvisory.com -- this should redirect to the root domain
4. Check the padlock icon in the browser address bar to confirm SSL is active

**Command-line check (optional):**
```
nslookup rsiadvisory.com
```
The result should show `76.76.21.21`.

---

## Notes

- **SSL is automatic.** Vercel provisions a free SSL certificate once DNS records are verified. No action needed on your part.
- **Do not enable Cloudflare proxy (orange cloud).** This will break Vercel's SSL provisioning and cause certificate errors.
- If the site does not load after 30 minutes, double-check that both DNS records are set to "DNS only" (grey cloud) in Cloudflare.
