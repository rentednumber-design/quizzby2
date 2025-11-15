import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true, // Required for static exports
  },
  // Add any other Vercel-specific configurations here
};

export default nextConfig;
