import type { NextConfig } from "next";

// Disable Turbopack by setting the environment variable
process.env.TURBOPACK = '0';

const nextConfig: NextConfig = {
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
  
  // Disable Turbopack explicitly
  experimental: {
    // @ts-ignore - This is a valid experimental flag but not in the types yet
    turbo: false
  },
};

export default nextConfig;
