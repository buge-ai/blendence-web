import type { NextConfig } from "next";

// Vercel also serves the site on its own *.vercel.app production aliases.
// Google indexed those as duplicates of www.blendence.com (a canonical tag is
// only a hint), so permanently redirect them to the real domain. Per-deployment
// URLs (blendence-<hash>-bugefoods.vercel.app) are left alone: they are behind
// Vercel's deployment protection and still work for previews.
const VERCEL_ALIASES = [
  'blendence-web.vercel.app',
  'blendence-web-bugefoods.vercel.app',
  'blendence-web-git-main-bugefoods.vercel.app',
];

const nextConfig: NextConfig = {
  async redirects() {
    return VERCEL_ALIASES.map((host) => ({
      source: '/:path*',
      has: [{ type: 'host' as const, value: host }],
      destination: 'https://www.blendence.com/:path*',
      permanent: true,
    }));
  },
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
