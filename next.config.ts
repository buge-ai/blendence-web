import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'r4t2ruiygwedeai0.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
