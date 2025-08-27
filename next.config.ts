import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'ac.goit.global' },
      { protocol: 'https', hostname: 'seocom.agency' },
      { protocol: 'https', hostname: 'abrakadabra.fun' },
    ],
  },
};

export default nextConfig;
