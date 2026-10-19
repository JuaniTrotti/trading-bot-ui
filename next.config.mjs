/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  basePath: '/api/trading-bot-ui',
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
