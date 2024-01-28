/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        protocol: "https",
      },
      {
        hostname: "admin.sthapattya-o-nirman.com",
        protocol: "https",
      },
      {
        hostname: "directus-production-616f.up.railway.app",
        protocol: "https",
      },
      {
        hostname: "admin.sthapattya-o-nirman.com",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
