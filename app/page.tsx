"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/* ── Icons ── */

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`w-5 h-5 flex-shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      className="w-5 h-5 text-brand-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      className="w-5 h-5 text-brand-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      className="w-5 h-5 text-brand-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

/* ── Page ── */

export default function LandingPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }
      router.push("/thanks");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <main className="min-h-screen overflow-hidden">
      {/* ━━━ NAV BAR ━━━ */}
      <nav className="fixed top-0 w-full z-50 bg-brand-dark/80 backdrop-blur-md border-b border-brand-dark-border">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-wide text-white">
            RSI<span className="text-brand-gold">&nbsp;Advisory</span>
          </span>
          <a
            href="#get-brief"
            className="text-xs font-medium text-brand-gold hover:text-brand-gold-light transition-colors"
          >
            Request Brief &rarr;
          </a>
        </div>
      </nav>

      {/* ━━━ HERO ━━━ */}
      <section className="relative hero-glow pt-32 pb-24 sm:pt-40 sm:pb-32">
        {/* Decorative grid lines */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="animate-fade-in-up opacity-0">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-gold/20 bg-brand-gold/5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse-slow" />
              <span className="uppercase tracking-[0.25em] text-brand-gold text-[10px] font-semibold">
                By Invitation &amp; Request Only
              </span>
            </div>
          </div>

          <h1 className="animate-fade-in-up opacity-0 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
            The HIT&#8482;{" "}
            <span className="text-gold-gradient">Executive Brief</span>
          </h1>

          <p className="animate-fade-in-up-delay opacity-0 mt-7 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
            Executive-grade technology clarity&mdash;delivered in{" "}
            <span className="text-white font-medium">10 minutes</span>.
            <br className="hidden sm:block" />
            Stop guessing. Start deciding.
          </p>

          <div className="animate-fade-in-up-delay-2 opacity-0 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#get-brief"
              className="btn-premium inline-block px-10 py-4 bg-brand-gold text-brand-dark font-bold rounded-md text-sm tracking-wide"
            >
              Get the Executive Brief
            </a>
            <a
              href="#what-you-get"
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
            >
              See what&rsquo;s inside &darr;
            </a>
          </div>

          {/* Trust badges */}
          <div className="animate-fade-in-up-delay-2 opacity-0 mt-16 flex flex-wrap items-center justify-center gap-8 text-[11px] text-gray-600 uppercase tracking-wider">
            <span className="flex items-center gap-2">
              <ShieldIcon />
              NDA Available
            </span>
            <span className="flex items-center gap-2">
              <LockIcon />
              Confidential
            </span>
            <span className="flex items-center gap-2">
              <ClockIcon />
              10-Minute Read
            </span>
          </div>
        </div>
      </section>

      {/* ━━━ SOCIAL PROOF BAR ━━━ */}
      <section className="border-y border-brand-dark-border bg-brand-dark-card/30">
        <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { number: "200+", label: "Executive Briefs Delivered" },
            { number: "92%", label: "Action Rate Within 30 Days" },
            { number: "$4.2M", label: "Avg. Tech Spend Guided" },
            { number: "8", label: "Briefs Accepted Per Month" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="metric-number text-2xl sm:text-3xl font-bold text-white">
                {stat.number}
              </p>
              <p className="mt-1 text-[11px] text-gray-500 uppercase tracking-wider leading-tight">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━ THE PROBLEM ━━━ */}
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <p className="uppercase tracking-[0.2em] text-brand-gold/60 text-[10px] font-semibold mb-4">
          The Problem
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-6">
          You&rsquo;re making million-dollar technology decisions<br className="hidden sm:block" />
          with thousand-dollar clarity.
        </h2>
        <p className="text-gray-400 leading-relaxed max-w-xl mx-auto">
          Your team says &ldquo;we need to modernize.&rdquo; Vendors say
          &ldquo;buy our platform.&rdquo; Consultants say &ldquo;it
          depends.&rdquo; Meanwhile, you&rsquo;re signing six-figure contracts
          based on PowerPoints and gut feel.
        </p>
        <div className="gold-divider max-w-xs mx-auto mt-12" />
      </section>

      {/* ━━━ WHAT IT IS / WHO IT'S FOR / NOT FOR ━━━ */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          {/* What It Is */}
          <div className="card-hover bg-brand-dark-card border border-brand-dark-border rounded-xl p-8">
            <div className="w-10 h-10 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-5">
              <svg className="w-5 h-5 text-brand-gold" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg mb-3">
              What It Is
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              A concise, custom-built strategic PDF that distills your most
              pressing technology decisions into clear options, quantified risks,
              and recommended next moves&mdash;built for leaders who don&rsquo;t
              have time to become technologists.
            </p>
          </div>

          {/* Who It's For */}
          <div className="card-hover bg-brand-dark-card border border-brand-dark-border rounded-xl p-8">
            <div className="w-10 h-10 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-5">
              <svg className="w-5 h-5 text-brand-gold" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg mb-3">
              Built For
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {[
                "CEOs & Founders making technology bets",
                "COOs scaling operations with software",
                "Board members evaluating tech investments",
                "Non-technical leaders managing tech teams",
              ].map((item) => (
                <li key={item} className="flex gap-2.5">
                  <CheckIcon className="text-brand-gold/70 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not For */}
          <div className="card-hover bg-brand-dark-card border border-brand-dark-border rounded-xl p-8">
            <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-brand-dark-border-light flex items-center justify-center mb-5">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
            <h3 className="text-gray-500 font-semibold text-lg mb-3">
              Not For You If&hellip;
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              {[
                "You want generic \"tech trends\" listicles",
                "You need hands-on development work",
                "You're looking for a free consultation",
                "You want a second opinion on your IT hire",
              ].map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span className="mt-0.5 text-gray-700">&times;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ━━━ WHAT YOU GET ━━━ */}
      <section
        id="what-you-get"
        className="border-y border-brand-dark-border bg-brand-dark-card/40"
      >
        <div className="max-w-4xl mx-auto px-6 py-24">
          <p className="uppercase tracking-[0.2em] text-brand-gold/60 text-[10px] font-semibold mb-4 text-center">
            What&rsquo;s Inside
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">
            One PDF. Weeks of Research. Zero Fluff.
          </h2>
          <p className="text-gray-400 text-center mb-14 max-w-lg mx-auto text-sm leading-relaxed">
            Engineered to compress complex technology landscapes into decisive,
            board-ready intelligence.
          </p>

          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
            {[
              {
                title: "Technology Landscape Assessment",
                desc: "Where you stand today\u2014mapped against where you need to be",
              },
              {
                title: "Risk-Ranked Decision Matrix",
                desc: "Your top priorities scored by impact, cost, and urgency",
              },
              {
                title: "Vendor-Agnostic Recommendations",
                desc: "We don\u2019t sell software. We sell clarity.",
              },
              {
                title: "90-Day Action Roadmap",
                desc: "Clear milestones your team can execute immediately",
              },
              {
                title: "Plain-English Explanations",
                desc: "No jargon. No filler. Written for executives, not engineers.",
              },
              {
                title: "Executive Summary + Board Slide",
                desc: "Ready to present\u2014no reformatting needed",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="mt-1">
                  <div className="w-6 h-6 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                    <CheckIcon className="w-3.5 h-3.5 text-brand-gold" />
                  </div>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{item.title}</p>
                  <p className="text-gray-500 text-sm mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ HOW IT WORKS ━━━ */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <p className="uppercase tracking-[0.2em] text-brand-gold/60 text-[10px] font-semibold mb-4 text-center">
          Process
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-14">
          From Request to Roadmap in 5 Days
        </h2>

        <div className="space-y-0">
          {[
            {
              step: "01",
              title: "Submit Your Request",
              desc: "Fill out the brief intake form. Takes 60 seconds.",
            },
            {
              step: "02",
              title: "Discovery Call (Optional)",
              desc: "15-minute call to align on your biggest technology pressure points.",
            },
            {
              step: "03",
              title: "We Build Your Brief",
              desc: "Senior strategists research, analyze, and craft your custom executive brief.",
            },
            {
              step: "04",
              title: "You Receive Your HIT\u2122 Brief",
              desc: "A PDF engineered for your specific decisions, delivered to your inbox.",
            },
          ].map((item, i) => (
            <div
              key={item.step}
              className="flex gap-6 py-6 border-b border-brand-dark-border last:border-0"
            >
              <span className="metric-number text-2xl font-bold text-brand-gold/30 w-10 flex-shrink-0">
                {item.step}
              </span>
              <div>
                <p className="text-white font-semibold">{item.title}</p>
                <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━ SCARCITY + CONFIDENTIALITY ━━━ */}
      <section className="border-y border-brand-dark-border bg-brand-dark-card/40">
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-gold/20 bg-brand-gold/5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-shimmer" />
            <span className="uppercase tracking-[0.2em] text-brand-gold text-[10px] font-semibold">
              Limited Capacity
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            We Accept 8 Briefs Per Month.
            <br />
            <span className="text-gray-500 font-normal text-xl">
              No exceptions.
            </span>
          </h2>

          <p className="text-gray-400 leading-relaxed max-w-lg mx-auto mb-12 text-sm">
            Every HIT&#8482; Executive Brief is hand-built by senior
            strategists with 20+ years in enterprise technology. We cap intake
            to protect quality and the confidentiality of the leaders we serve.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 text-sm max-w-2xl mx-auto">
            {[
              {
                icon: <ShieldIcon />,
                title: "Mutual NDA",
                desc: "Signed before any data exchange",
              },
              {
                icon: <LockIcon />,
                title: "SOC 2 Aligned",
                desc: "Enterprise-grade data handling",
              },
              {
                icon: <ClockIcon />,
                title: "5-Day Delivery",
                desc: "From intake to inbox",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="card-hover bg-brand-dark border border-brand-dark-border rounded-xl px-5 py-6"
              >
                <div className="flex justify-center mb-3">{item.icon}</div>
                <p className="text-white font-semibold text-sm">
                  {item.title}
                </p>
                <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ TESTIMONIAL / AUTHORITY ━━━ */}
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <p className="uppercase tracking-[0.2em] text-brand-gold/60 text-[10px] font-semibold mb-6">
          From the Desk of
        </p>
        <blockquote className="text-lg sm:text-xl text-gray-300 leading-relaxed font-light italic max-w-2xl mx-auto">
          &ldquo;I&rsquo;ve spent 20 years watching executives sign off on
          technology decisions they don&rsquo;t fully understand. The HIT&#8482;
          Brief exists to change that&mdash;one leader at a time.&rdquo;
        </blockquote>
        <div className="mt-8">
          <p className="text-white font-semibold">Lamar Dunn</p>
          <p className="text-gray-500 text-sm">
            Founder, RSI Advisory &bull; Former CIO/CTO
          </p>
        </div>
        <div className="gold-divider max-w-xs mx-auto mt-12" />
      </section>

      {/* ━━━ EMAIL CAPTURE FORM ━━━ */}
      <section
        id="get-brief"
        className="border-y border-brand-dark-border bg-brand-dark-card/40"
      >
        <div className="max-w-md mx-auto px-6 py-24">
          <div className="text-center mb-10">
            <p className="uppercase tracking-[0.2em] text-brand-gold/60 text-[10px] font-semibold mb-4">
              Start Here
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Request Your Brief
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Submit the form below. If we&rsquo;re a fit, your personalized
              brief arrives within 5 business days.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              {
                id: "name",
                label: "Full Name",
                type: "text",
                placeholder: "Jane Smith",
              },
              {
                id: "email",
                label: "Work Email",
                type: "email",
                placeholder: "jane@company.com",
              },
              {
                id: "company",
                label: "Company",
                type: "text",
                placeholder: "Acme Corp",
              },
              {
                id: "role",
                label: "Your Role",
                type: "text",
                placeholder: "CEO, COO, VP Engineering\u2026",
              },
            ].map((field) => (
              <div key={field.id}>
                <label
                  htmlFor={field.id}
                  className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1.5"
                >
                  {field.label}
                </label>
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  required
                  placeholder={field.placeholder}
                  value={form[field.id as keyof typeof form]}
                  onChange={(e) => updateField(field.id, e.target.value)}
                  className="w-full bg-brand-dark-card border border-brand-dark-border rounded-lg px-4 py-3 text-gray-200 placeholder:text-gray-700 focus:outline-none focus:border-brand-gold/40 focus:ring-1 focus:ring-brand-gold/10 transition-all text-sm"
                />
              </div>
            ))}

            {error && (
              <p className="text-red-400 text-sm text-center py-1">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn-premium w-full py-4 bg-brand-gold disabled:opacity-50 disabled:cursor-not-allowed text-brand-dark font-bold rounded-lg text-sm tracking-wide mt-2"
            >
              {submitting
                ? "Submitting\u2026"
                : "Get the Executive Brief \u2192"}
            </button>

            <div className="flex items-center justify-center gap-4 pt-2 text-[10px] text-gray-600">
              <span className="flex items-center gap-1">
                <LockIcon /> Encrypted
              </span>
              <span>&bull;</span>
              <span>No spam. Ever.</span>
              <span>&bull;</span>
              <span>Unsubscribe anytime.</span>
            </div>
          </form>
        </div>
      </section>

      {/* ━━━ FINAL CTA ━━━ */}
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
          Still on the fence?
        </h2>
        <p className="text-gray-500 text-sm max-w-md mx-auto mb-8 leading-relaxed">
          The executives who request the HIT&#8482; Brief aren&rsquo;t looking
          for more information. They&rsquo;re looking for the{" "}
          <span className="text-white">right</span> information.
        </p>
        <a
          href="#get-brief"
          className="btn-premium inline-block px-10 py-4 bg-brand-gold text-brand-dark font-bold rounded-md text-sm tracking-wide"
        >
          Request Your Brief &rarr;
        </a>
      </section>

      {/* ━━━ FOOTER ━━━ */}
      <footer className="border-t border-brand-dark-border">
        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-gray-700">
            &copy; {new Date().getFullYear()} RSI Advisory. All rights reserved.
            HIT&#8482; is a trademark of RSI Advisory.
          </span>
          <span className="text-xs text-gray-700">
            Built with precision. Delivered with confidentiality.
          </span>
        </div>
      </footer>
    </main>
  );
}
