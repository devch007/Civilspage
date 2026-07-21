import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-9c3572c4a825401b8917e1fae30f7d98.r2.dev',
        pathname: '/**',
      },
    ],
  },
  // Allow large file uploads through Next.js API routes
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
};

export default nextConfig;
