/** @type {import('next').NextConfig} */

const nextConfig = {
  // i18n,
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
        {
          protocol: 'https',
          hostname: 'www.princeton.edu',
          port: '',
        },
        {
          protocol: 'http',
          hostname: 'localhost'
        }
      ],
  },
};

module.exports = nextConfig;
