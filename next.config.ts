import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable static export for now to fix routing issues
  // output: 'export',
  
  // Enable React Strict Mode
  reactStrictMode: true,
  
  // Configure images
  images: {
    unoptimized: true, // Required for static exports
  },
  
  // Configure base path if your app is not served from the root
  // basePath: '/your-base-path',
  
  // Configure asset prefix for static exports
  assetPrefix: process.env.NODE_ENV === 'production' ? '/_next' : '',
  
  // Enable webpack configuration
  webpack: (config, { isServer }) => {
    // Important: return the modified config
    return config;
  },
  
  // Configure redirects if needed
  async redirects() {
    return [];
  },
  
  // Configure rewrites if needed
  async rewrites() {
    return [];
  },
};

export default nextConfig;
