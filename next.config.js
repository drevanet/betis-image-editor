/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {

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
