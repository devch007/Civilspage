import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent Clickjacking attacks
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  // Prevent MIME-type sniffing
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Control referrer information sent with requests
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Restrict browser features and APIs
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=()',
  },
  // Enforce HTTPS with long-term HSTS
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

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
  // Apply security headers to all responses
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
