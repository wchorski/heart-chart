/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  experimental: {
    images: {
      unoptimized: true,
    },
  }
}

module.exports = nextConfig
