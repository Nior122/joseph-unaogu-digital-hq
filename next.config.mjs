/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  allowedDevOrigins: ["*.e2b.app"],
  images: {
    formats: ["image/webp"],
    deviceSizes: [320, 480, 640, 768, 1024, 1280, 1600],
    minimumCacheTTL: 86400,
  },
  async headers() {
    return [{ source: "/:path*", headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    ] }];
  },
};
export default nextConfig;
