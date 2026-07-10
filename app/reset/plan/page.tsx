import { CSSProperties } from "react";

export const metadata = {
  title: "Your 5-Day Energy Reset",
  description: "The free 5-day plan to kill the afternoon crash and start dropping fat.",
};

const VOLT = "#c2f542";
const BG = "#0a0b09";
const PANEL = "#131512";
const INK = "#f2f4ec";
const SOFT = "#a9b09c";
const FAINT = "#71786a";
const LINE = "#262a20";
const MONO = "ui-monospace, Menlo, monospace";

const page: CSSProperties = {
  background: BG,
  color: INK,
  minHeight: "100vh",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  lineHeight: 1.65,
};
const wrap: CSSProperties = { maxWidth: 720, margin: "0 auto", padding: "48px 22px 80px" };
const eyebrow: CSSProperties = {
  fontFamily: MONO,
  fontSize: 12,
  letterSpacing: ".14em",
  textTransform: "uppercase",
  color: VOLT,
  fontWeight: 600,
};
const h1: CSSProperties = { fontSize: 34, fontWeight: 800, letterSpacing: "-.02em", margin: "12px 0 8px", lineHeight: 1.05 };
const lead: CSSProperties = { color: SOFT, fontSize: 17, margin: "0 0 30px" };
const box: CSSProperties = { background: PANEL, border: `1px solid ${LINE}`, borderRadius: 14, padding: "20px 22px", margin: "16px 0" };
const dayTag: CSSProperties = { fontFamily: MONO, fontSize: 12, color: VOLT, textTransform: "uppercase", letterSpacing: ".06em" };
const dayH: CSSProperties = { fontSize: 19, fontWeight: 800, margin: "5px 0 8px" };
const p: CSSProperties = { color: SOFT, fontSize: 15.5, margin: "0 0 8px" };
const li: CSSProperties = { color: SOFT, fontSize: 15, marginBottom: 5 };
const cta: CSSProperties = { background: "linear-gradient(180deg,rgba(194,245,66,.08),transparent)", border: `1px solid ${VOLT}`, borderRadius: 14, padding: "22px", marginTop: 30, textAlign: "center" };

const days = [
  { d: "Day 1", t: "Reset your fuel", body: "Cut the 2pm crash at the source: swap the sugary/“healthy” cereal for eggs + fruit, and drink a big glass of water before every meal. That’s it for today.", moves: ["Protein at breakfast", "Water before meals", "Walk 6,000 steps"] },
  { d: "Day 2", t: "The Plate Formula", body: "No counting. Build every plate: ½ veggies, 1 palm protein, 1 fist smart carbs, 1 thumb healthy fat. Eat protein first.", moves: ["Use the plate formula all 3 meals", "8,000 steps"] },
  { d: "Day 3", t: "20-minute burn", body: "One short home workout — no gym. 3 rounds: 15 squats, 10 push-ups, 10 reverse lunges/leg, 30-sec plank. Done in 20.", moves: ["The 20-min circuit", "Stop eating 2–3 hrs before bed"] },
  { d: "Day 4", t: "Kill the energy leaks", body: "Cut one sneaky liquid-calorie source (sweet coffee, soda, juice, or that 3rd drink). Notice the afternoon crash fading.", moves: ["Swap 1 liquid-calorie habit", "8,000 steps"] },
  { d: "Day 5", t: "Lock it in", body: "Repeat the plate formula + the 20-min circuit. Pick the ONE habit that felt best and commit to keeping it past today.", moves: ["Circuit + plate formula", "Choose your keeper habit"] },
];

export default function ResetPlan() {
  return (
    <main style={page}>
      <div style={wrap}>
        <span style={eyebrow}>Your Free Plan</span>
        <h1 style={h1}>The 5-Day Energy Reset</h1>
        <p style={lead}>
          Five days to kill the afternoon crash and start dropping fat &mdash;
          20 minutes a day, no crash diets, no 2-hour gym. Built for busy men
          &amp; women over 30. Start today.
        </p>

        <div style={box}>
          <div style={dayTag}>{"// the one rule"}</div>
          <div style={dayH}>Protein first. Water first. Move daily.</div>
          <p style={{ ...p, margin: 0 }}>
            If you do nothing else this week: eat protein at every meal, drink
            water before you eat, and get your steps in. That alone starts the
            reset.
          </p>
        </div>

        {days.map((day) => (
          <div style={box} key={day.d}>
            <div style={dayTag}>{day.d}</div>
            <div style={dayH}>{day.t}</div>
            <p style={p}>{day.body}</p>
            <ul style={{ margin: "6px 0 0", paddingLeft: 18 }}>
              {day.moves.map((m) => (
                <li style={li} key={m}>{m}</li>
              ))}
            </ul>
          </div>
        ))}

        <div style={cta}>
          <div style={{ ...dayH, color: VOLT }}>Want the full 30 days?</div>
          <p style={{ ...p, margin: "6px 0 0" }}>
            This is the reset. The full PRIME 30 program takes you the rest of
            the way. Follow{" "}
            <a href="https://instagram.com/trainwithlamar" style={{ color: VOLT }}>
              @trainwithlamar
            </a>{" "}
            &mdash; comment <b style={{ color: INK }}>RESET</b> and I&rsquo;ll
            point you to it.
          </p>
        </div>

        <p style={{ color: FAINT, fontSize: 12.5, fontStyle: "italic", marginTop: 26 }}>
          General fitness &amp; nutrition guidance for healthy adults. Not
          medical advice. Consult your physician before starting any new
          exercise or nutrition program.
        </p>
      </div>
    </main>
  );
}
