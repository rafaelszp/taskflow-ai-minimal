/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  output: 'standalone',
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
};

module.exports = nextConfig;
