# Welcome Email Setup — 5 Minutes

The code is ready. You just need to create a free Resend account and add one API key.

## Step 1: Create Resend Account (2 min)

1. Go to [resend.com](https://resend.com)
2. Sign up (free — 100 emails/day, no credit card)
3. Go to **API Keys** in the sidebar
4. Click **Create API Key**
5. Name it: `HIT Executive Brief`
6. Copy the key

## Step 2: Add Domain in Resend (2 min)

1. In Resend, go to **Domains** > **Add Domain**
2. Enter: `rsiadvisory.com`
3. Resend will show you DNS records to add in Cloudflare
4. Add those records in Cloudflare (similar to what you did for Vercel)
5. Wait for verification (usually 1-5 min)

This lets emails come from `lamar@rsiadvisory.com` instead of a generic address.

## Step 3: Add API Key to Vercel (1 min)

1. Go to Vercel > hit-executive-brief > Settings > Environment Variables
2. Add: `RESEND_API_KEY` = (paste your Resend API key)
3. Redeploy (Deployments > ... > Redeploy)

## Step 4: Test

1. Go to www.rsiadvisory.com
2. Submit the form with a test email
3. Check your inbox — you should receive the branded welcome email

## What the Email Looks Like

- Dark premium design matching the website
- Subject: "Your HIT™ Executive Brief Request — Received"
- From: Lamar Dunn <lamar@rsiadvisory.com>
- Content: 3-step process, accelerate CTA, Strategic Debrief booking button
- Fully branded RSI Advisory footer

## Without Resend

If you skip Resend, everything still works — leads still go to Kit,
the form still works, users still see the thank-you page. They just
won't get an automated confirmation email.
