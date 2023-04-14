/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "bucket-file-storage-dev-mkplace.s3.amazonaws.com",
      "bucket-file-storage-sandbox-mkplace.s3.amazonaws.com",
    ]
  },
  env: {
    BUCKET_URL: process.env.BUCKET_URL,
    ACCESS_KEY: process.env.ACCESS_KEY
  }
}

module.exports = nextConfig
