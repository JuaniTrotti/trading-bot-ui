/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  basePath: '/api/trading-bot-ui',
  skipTrailingSlashRedirect: true, // Evita que Next.js responda con 308 al recibir o no recibir la / final
  allowedDevOrigins: ['jtrotti.com'],
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
