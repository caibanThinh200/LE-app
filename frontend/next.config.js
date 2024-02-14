/** @type {import('next').NextConfig} */

const nextConfig = {
  // i18n,
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.princeton.edu",
        port: "",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "le-server.onrender.com",
      },
    ],
  },
};

module.exports = nextConfig;
