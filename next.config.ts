import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    // Add canvas to externals
    config.externals = [...(config.externals || []), { canvas: 'canvas' }];
    
    // Add fallbacks for Node.js modules
    if (!config.resolve) {
      config.resolve = {};
    }
    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      fs: false,
      path: false,
      stream: false,
      process: false
    };
    
    return config;
  },
}

export default nextConfig;
