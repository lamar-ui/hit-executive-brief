/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Consolidate the duplicate: ravisphere.com currently points at the RSI
      // Advisory deployment. 301 it to the canonical rsiadvisory.com so we
      // don't run two identical sites (SEO + brand clarity).
      {
        source: "/:path*",
        has: [{ type: "host", value: "ravisphere.com" }],
        destination: "https://www.rsiadvisory.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.ravisphere.com" }],
        destination: "https://www.rsiadvisory.com/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
