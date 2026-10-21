/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // These metadata lookups are local and fast. Keep tags in <head> for every crawler,
  // including tools that do not read Next.js streaming metadata from the body.
  htmlLimitedBots: /.*/,
  allowedDevOrigins: ["*.e2b.app"],
  images: {
    formats: ["image/webp"],
    deviceSizes: [320, 480, 640, 768, 1024, 1280, 1600],
    minimumCacheTTL: 86400,
  },
  async redirects() {
    return [
      { source: "/projects", destination: "/work", permanent: true },
      // Match page slugs, never the existing /projects/*.png and *.webp assets.
      {
        source: "/projects/:slug([a-z0-9-]+)",
        destination: "/work/:slug",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};
export default nextConfig;
