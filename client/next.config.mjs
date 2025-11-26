// Disable Turbopack and SWC completely (Termux fix)

const nextConfig = {
  experimental: {
    turbo: false, // disable turbopack
  },
  swcMinify: false, // disable swc
  compiler: {}, // prevent next from using swc compiler
  webpack(config) {
    return config; // force Webpack only
  },
};

export default nextConfig;
