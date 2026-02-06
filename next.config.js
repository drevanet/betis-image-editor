/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
 async redirects() {
    return [
      {
        source: '/live-football-tv-hd', // The path the user visits on your site
        destination: 'https://sub.graciousgrace.biz/', // The external URL to redirect to
        permanent: false, // Set to 'true' for a 308 permanent redirect, 'false' for a 307 temporary redirect
        basePath: false, // Must be false for external redirects
      },
    ];
  },
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bettystore.store', // No http/https protocol here
        port: ''
      },
    ],
  },

    ignoreBuildErrors: true,
};

export default config;
