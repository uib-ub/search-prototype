/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['data.ub.uib.no'],
  },
}

module.exports = nextConfig
