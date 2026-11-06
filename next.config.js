/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for Netlify deployment
  output: 'export',
  trailingSlash: false,
  basePath: '', // Add your subdirectory here if needed, e.g., '/portfolio'
  assetPrefix: '', // Add your domain here if using CDN, e.g., 'https://yourdomain.com'
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    scrollRestoration: true,
    optimizeCss: true,
    optimizeServerReact: true,
  },

  // Configure allowed dev origins for cross-origin requests
  allowedDevOrigins: [
    'localhost:3000',
    '127.0.0.1:3000',
    '192.168.0.119:3000',
    '0.0.0.0:3000'
  ],
  serverExternalPackages: ['three'],
  images: {
    unoptimized: true, // Required for static export
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  eslint: {
    // Lint is run separately; legacy components are being retired incrementally.
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },

  // Ultra-fast SSR optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{member}}',
    },
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}

// Bundle analyzer (optional for production builds)
let finalConfig = nextConfig

try {
  if (process.env.ANALYZE === 'true') {
    const withBundleAnalyzer = require('@next/bundle-analyzer')({
      enabled: true,
    })
    finalConfig = withBundleAnalyzer(nextConfig)
  }
} catch (error) {
  // Bundle analyzer not available, continue without it
  console.log('Bundle analyzer not available, continuing without analysis')
}

module.exports = finalConfig