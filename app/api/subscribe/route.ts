import { NextResponse } from "next/server";

const KIT_API_KEY = process.env.KIT_API_KEY || "0WsI3-Dleh5UsqsceP8u3g";
const KIT_TAG_ID = process.env.KIT_TAG_ID || "18767608";

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
    const kitRes = await fetch(
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

    if (!kitRes.ok) {
      const err = await kitRes.json().catch(() => ({}));
      console.error("[Kit API Error]", kitRes.status, err);
    } else {
      console.log("[Kit Success]", email, "tagged with HIT Executive Brief");
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
