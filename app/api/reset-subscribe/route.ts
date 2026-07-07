import { NextResponse } from "next/server";

// Reuses the same Kit account/key that already works for the HIT brief.
// Set KIT_RESET_TAG_ID in Vercel to a dedicated "Fitness Reset" tag for clean
// segmentation; falls back to the existing tag so it still captures leads.
const KIT_API_KEY = process.env.KIT_API_KEY || "";
const KIT_RESET_TAG_ID =
  process.env.KIT_RESET_TAG_ID || process.env.KIT_TAG_ID || "18767608";

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email" },
        { status: 400 }
      );
    }

    const firstName = (name || "").split(" ")[0] || "";

    // ── Subscribe to Kit (tagged fitness-reset) ──
    try {
      const kitRes = await fetch(
        `https://api.convertkit.com/v3/tags/${KIT_RESET_TAG_ID}/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify({
            api_key: KIT_API_KEY,
            email,
            first_name: firstName,
            fields: { source: "fitness-reset" },
          }),
        }
      );

      if (!kitRes.ok) {
        const err = await kitRes.json().catch(() => ({}));
        console.error("[Kit Reset Error]", kitRes.status, err);
      } else {
        console.log("[Kit Reset Success]", email);
      }
    } catch (kitErr) {
      console.error("[Kit Reset Connection Error]", kitErr);
    }

    // Backup log so no lead is ever lost even if Kit hiccups
    console.log("[Reset Optin]", {
      name,
      email,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
