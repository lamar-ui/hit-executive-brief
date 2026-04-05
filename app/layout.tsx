import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The HIT\u2122 Executive Brief | RSI Advisory",
  description:
    "Executive-grade technology clarity in 10 minutes. Custom strategic intelligence for decision-makers who don\u2019t have time to become technologists.",
  openGraph: {
    title: "The HIT\u2122 Executive Brief | RSI Advisory",
    description:
      "Executive-grade tech clarity in 10 minutes. Built for CEOs, COOs, and board members.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-brand-dark">
      <body className="min-h-screen bg-brand-dark text-gray-300 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
