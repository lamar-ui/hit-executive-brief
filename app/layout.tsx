import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ravisphere.com"),
  title: "RaviSphere Innovations | A trusted CIO partner in the room",
  description:
    "RSI puts a sitting CIO on your side of the table: bill reconciliation and sourcing, security baseline, fractional CIO, acquisition integration and vendor oversight for multi-site companies, PE portfolios and agencies.",
  openGraph: {
    title: "RaviSphere Innovations | A trusted CIO partner in the room",
    description: "We solve, stabilize and secure. A sitting CIO on your side of the table.",
    type: "website",
    url: "https://ravisphere.com",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@500;600&family=Public+Sans:wght@400;500;600&display=swap"
        />
      </head>
      <body className="min-h-screen antialiased" style={{ background: "#f6f7fb", color: "#1b2130" }}>
        {children}
      </body>
    </html>
  );
}
