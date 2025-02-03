/** @type {import('next').NextConfig} */
module.exports = {
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
      // [
      //   "@preact-signals/safe-react/swc",
      //   {
      //     // you should use `auto` mode to track only components which uses `.value` access.
      //     // Can be useful to avoid tracking of server side components
      //     mode: "auto",
      //   } /* plugin options here */,
      // ]
    ]
  }
};
