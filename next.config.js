/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['api-placeholder.herokuapp.com', 'res.cloudinary.com'],
  },
}

module.exports = nextConfig
