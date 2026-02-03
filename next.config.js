/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/honeymoney',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
