/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
  fileExtensions: ["jpg", "jpeg", "png", "gif", "ico", "svg"],
};

const withImages = require("next-images");

module.exports = withImages(nextConfig);
