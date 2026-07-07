import { NextResponse } from "next/server";
import { getWelcomeEmailHtml, getWelcomeEmailText } from "./email-template";

// Secrets come from env only (set in Vercel). The previously hard-coded Kit
// key was leaked via git history and MUST be rotated in Kit → Settings → Developer.
const KIT_API_KEY = process.env.KIT_API_KEY || "";
const KIT_TAG_ID = process.env.KIT_TAG_ID || "18767608";
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

export async function POST(request: Request) {
  try {
    const { name, email, company, role } = await request.json();

    // Validate
    if (!name || !email || !company || !role) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email" },
        { status: 400 }
      );
    }

    const firstName = name.split(" ")[0];
    const lastName = name.split(" ").slice(1).join(" ");

        // — Send email notification to lamar@ravisphere.com —
        try {
                await fetch("https://formsubmit.co/ajax/lamar@ravisphere.com", {
                          method: "POST",
                          headers: { "Content-Type": "application/json", "Accept": "application/json" },
                          body: JSON.stringify({ name, email, company, role, _subject: "New HIT Brief Request" })
                });
        } catch (emailErr) {
                console.error("[Email Notification Error]", emailErr);
        }

    // ── 1. Subscribe to Kit ──
    try {
      const kitRes = await fetch(
        `https://api.convertkit.com/v3/tags/${KIT_TAG_ID}/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify({
            api_key: KIT_API_KEY,
            email,
            first_name: firstName,
            fields: {
              last_name: lastName,
              company,
              role,
              source: "hit-executive-brief",
            },
          }),
        }
      );

      if (!kitRes.ok) {
        const err = await kitRes.json().catch(() => ({}));
        console.error("[Kit API Error]", kitRes.status, err);
      } else {
        console.log("[Kit Success]", email, "tagged with HIT Executive Brief");
      }
    } catch (kitErr) {
      console.error("[Kit Connection Error]", kitErr);
    }

    // ── 2. Send Welcome Email via Resend ──
    if (RESEND_API_KEY) {
      try {
        const emailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Lamar Dunn <lamar@rsiadvisory.com>",
            to: [email],
            subject:
              "Your HIT\u2122 Executive Brief Request \u2014 Received",
            html: getWelcomeEmailHtml(firstName),
            text: getWelcomeEmailText(firstName),
          }),
        });

        if (!emailRes.ok) {
          const err = await emailRes.json().catch(() => ({}));
          console.error("[Resend Error]", emailRes.status, err);
        } else {
          console.log("[Email Sent]", email);
        }
      } catch (emailErr) {
        console.error("[Resend Connection Error]", emailErr);
      }
    } else {
      console.log("[Email Skipped] No RESEND_API_KEY configured");
    }

    // Always log as backup
    console.log("[HIT Brief Request]", {
      name,
      email,
      company,
      role,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
