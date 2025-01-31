/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone',
  transpilePackages: ["@repo/ui"],
  webpack: (config, { isServer }) => {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true
    }
    return config;
  },
  experimental: {
    swcPlugins: [
    ]
  }
};
