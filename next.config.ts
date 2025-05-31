import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ykzhnkk9vdcjmvf6.public.blob.vercel-storage.com',
        port: '',
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
