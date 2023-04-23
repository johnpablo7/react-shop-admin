/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["tailwindui.com", "picsum.photos", "images.unsplash.com"],
  },
};

module.exports = nextConfig;
