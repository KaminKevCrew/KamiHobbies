/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    output: 'export',
    basePath: '/repository-name',
    images: {
        unoptimized: true,
    },
};

const isProd = process.env.NODE_ENV === 'production';

export const assetPrefix = isProd ? '/your-repository-name' : '';
