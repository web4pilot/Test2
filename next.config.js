/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Privy v3 pulls in wallet libs that ship optional Solana/Farcaster deps it
  // doesn't install. We're EVM-only (Sepolia), so neutralize them at build time.
  webpack: (config, { isServer }) => {
    config.resolve = config.resolve || {};
    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      // optional deps Privy/wallet libs reference but we don't use
      "@farcaster/mini-app-solana": false,
      "@solana/wallet-standard-features": false,
      "@react-native-async-storage/async-storage": false,
      fs: false,
      net: false,
      tls: false,
    };
    // these are Node-only optional logging deps some wallet libs reference
    config.externals = config.externals || [];
    if (Array.isArray(config.externals)) {
      config.externals.push("pino-pretty", "lokijs", "encoding");
    }
    return config;
  },
};

module.exports = nextConfig;
