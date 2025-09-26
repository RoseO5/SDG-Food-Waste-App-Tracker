/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    forceSwcTransforms: false, // tell Next.js not to force native SWC
  },
};

export default nextConfig;
