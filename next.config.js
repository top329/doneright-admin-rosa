/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  env: {
    DONE_RIGHT_BACKEND_URL: process.env.DONE_RIGHT_BACKEND_URL,
  },
};

module.exports = nextConfig;
