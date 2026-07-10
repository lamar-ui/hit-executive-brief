"use client";

import { useState, CSSProperties, FormEvent } from "react";

const VOLT = "#c2f542";
const BG = "#0a0b09";
const PANEL = "#131512";
const INK = "#f2f4ec";
const SOFT = "#a9b09c";
const LINE = "#262a20";

const wrap: CSSProperties = {
  minHeight: "100vh",
  background: BG,
  color: INK,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
};
const card: CSSProperties = {
  width: "100%",
  maxWidth: 460,
  background: PANEL,
  border: `1px solid ${LINE}`,
  borderRadius: 18,
  padding: "34px 30px",
  boxShadow: "0 24px 60px -30px rgba(0,0,0,.9)",
};
const eyebrow: CSSProperties = {
  fontFamily: "ui-monospace, Menlo, monospace",
  fontSize: 12,
  letterSpacing: ".14em",
  textTransform: "uppercase",
  color: VOLT,
  fontWeight: 600,
};
const h1: CSSProperties = {
  fontSize: 30,
  fontWeight: 800,
  letterSpacing: "-.02em",
  margin: "10px 0 8px",
  lineHeight: 1.1,
};
const sub: CSSProperties = { color: SOFT, fontSize: 15.5, margin: "0 0 22px" };
const input: CSSProperties = {
  width: "100%",
  background: "#1a1d17",
  border: `1px solid ${LINE}`,
  borderRadius: 10,
  padding: "13px 15px",
  color: INK,
  fontSize: 15,
  marginBottom: 12,
  outline: "none",
};
const btn: CSSProperties = {
  width: "100%",
  background: VOLT,
  color: "#0a0b09",
  fontWeight: 800,
  fontSize: 16,
  textTransform: "uppercase",
  letterSpacing: ".02em",
  border: "none",
  borderRadius: 10,
  padding: "14px",
  cursor: "pointer",
};
const fine: CSSProperties = {
  color: "#71786a",
  fontSize: 12,
  textAlign: "center",
  marginTop: 12,
  fontFamily: "ui-monospace, Menlo, monospace",
};

type Status = "idle" | "loading" | "done" | "error";

export default function ResetOptin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [err, setErr] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErr("");
    try {
      const res = await fetch("/api/reset-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErr(data.error || "Something went wrong. Try again.");
        setStatus("error");
        return;
      }
      setStatus("done");
    } catch {
      setErr("Network error — please try again.");
      setStatus("error");
    }
  }

  return (
    <main style={wrap}>
      <div style={card}>
        {status === "done" ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🔥</div>
            <h1 style={h1}>You&rsquo;re in.</h1>
            <p style={sub}>
              Your 5-Day Energy Reset is ready. Start today — it takes 20
              minutes.
            </p>
            <a href="/reset/plan" style={{ ...btn, display: "block", textDecoration: "none", textAlign: "center" }}>
              Open my free plan →
            </a>
            <p style={fine}>Also on its way to your inbox.</p>
          </div>
        ) : (
          <form onSubmit={submit}>
            <span style={eyebrow}>Free · 5-Day Reset</span>
            <h1 style={h1}>Kill the 2pm crash. Start dropping fat.</h1>
            <p style={sub}>
              The exact 5-day plan I give busy men &amp; women over 30 — no
              crash diets, no 2-hour gym. Enter your email and it&rsquo;s yours,
              free.
            </p>
            <input
              style={input}
              type="text"
              placeholder="First name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="given-name"
            />
            <input
              style={input}
              type="email"
              required
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            {status === "error" && (
              <p style={{ color: "#ff6a1a", fontSize: 13, margin: "0 0 10px" }}>
                {err}
              </p>
            )}
            <button style={btn} type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Sending…" : "Get the free 5-day plan"}
            </button>
            <p style={fine}>No spam. Unsubscribe anytime.</p>
          </form>
        )}
      </div>
    </main>
  );
}
