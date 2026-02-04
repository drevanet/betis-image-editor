/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
 output: 'export',
    images: {
        unoptimized: true,
    },
    distDir: 'out', // Where to export all pages
    trailingSlash: true,
  


    // time in seconds of no pages generating during static
    // generation before timing out
    staticPageGenerationTimeout: 1000,
    reactStrictMode: false
     
};

export default config;
