import { NextResponse } from "next/server";

const KIT_API_KEY = process.env.KIT_API_KEY;
const KIT_TAG_ID = process.env.KIT_TAG_ID;

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

    // ── Send to Kit (ConvertKit) ──
    if (KIT_API_KEY) {
      const endpoint = KIT_TAG_ID
        ? `https://api.convertkit.com/v3/tags/${KIT_TAG_ID}/subscribe`
        : "https://api.convertkit.com/v3/forms"; // fallback

      const res = await fetch(
        `https://api.convertkit.com/v3/tags/${KIT_TAG_ID}/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify({
            api_key: KIT_API_KEY,
            email,
            first_name: name.split(" ")[0],
            fields: {
              last_name: name.split(" ").slice(1).join(" "),
              company,
              role,
              source: "hit-executive-brief",
            },
          }),
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("[Kit API Error]", err);
        // Don't expose Kit errors to the client — still show success
        // since we logged the lead below
      }
    }

    // Always log to server as backup
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
