
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Proxy all API requests
        destination: "https://j20-blueapi.diamond.ac.uk/:path*", // Target API server
      },
    ];
  },
};

module.exports = nextConfig;
