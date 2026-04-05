import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You\u2019re In | The HIT\u2122 Executive Brief | RSI Advisory",
};

export default function ThanksPage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="w-full bg-brand-dark/80 backdrop-blur-md border-b border-brand-dark-border">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center">
          <span className="text-sm font-semibold tracking-wide text-white">
            RSI<span className="text-brand-gold">&nbsp;Advisory</span>
          </span>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-lg w-full">
          {/* Success indicator */}
          <div className="text-center mb-10">
            <div className="mx-auto w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-8">
              <svg
                className="w-7 h-7 text-brand-gold"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
              You&rsquo;re on the list.
            </h1>
            <p className="text-gray-400 leading-relaxed">
              Your request for The HIT&#8482; Executive Brief has been received.
              We review every submission personally and follow up within{" "}
              <span className="text-white font-medium">2 business days</span>.
            </p>
          </div>

          {/* Divider */}
          <div className="gold-divider mb-10" />

          {/* Next Steps */}
          <div className="space-y-4 mb-10">
            <p className="uppercase tracking-[0.2em] text-brand-gold/60 text-[10px] font-semibold">
              What Happens Next
            </p>

            {[
              {
                step: "1",
                text: "Check your inbox for a confirmation email from RSI Advisory",
              },
              {
                step: "2",
                text: "We\u2019ll review your submission and assess fit",
              },
              {
                step: "3",
                text: "If accepted, your custom brief arrives within 5 business days",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-4 py-3 border-b border-brand-dark-border last:border-0"
              >
                <span className="w-6 h-6 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-brand-gold">
                  {item.step}
                </span>
                <p className="text-gray-300 text-sm">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Primary CTA */}
          <div className="bg-brand-dark-card border border-brand-dark-border rounded-xl p-8 text-center mb-6">
            <p className="uppercase tracking-[0.2em] text-brand-gold/60 text-[10px] font-semibold mb-3">
              Optional
            </p>
            <h3 className="text-white font-bold text-lg mb-2">
              Book a HIT&#8482; Strategic Debrief
            </h3>
            <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
              30-minute call to walk through your brief with a senior
              strategist. Available after your brief is delivered.
            </p>
            <a
              href="https://calendly.com/your-placeholder/hit-strategic-debrief"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium inline-block px-8 py-3.5 bg-brand-gold text-brand-dark font-bold rounded-lg text-sm tracking-wide"
            >
              Schedule Debrief &rarr;
            </a>
          </div>

          {/* Secondary CTA */}
          <div className="bg-brand-dark-card/50 border border-brand-dark-border rounded-xl p-6 text-center">
            <p className="text-sm text-gray-300 mb-1 font-medium">
              Want to accelerate your brief?
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              Reply to the confirmation email with your{" "}
              <span className="text-white font-medium">
                top 2 technology constraints
              </span>{" "}
              and we&rsquo;ll prioritize your analysis.
            </p>
          </div>

          {/* Back link */}
          <div className="text-center mt-10">
            <a
              href="/"
              className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
            >
              &larr; Back to home
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-brand-dark-border">
        <div className="max-w-5xl mx-auto px-6 py-8 text-center">
          <p className="text-xs text-gray-700">
            &copy; {new Date().getFullYear()} RSI Advisory. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
