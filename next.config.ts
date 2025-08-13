import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use a custom build output directory to avoid Windows file-lock issues on .next
  distDir: "build",
  // Environment variables configuration
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },

  images: {
    domains: ["xhgelalprghkkuonkokr.supabase.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xhgelalprghkkuonkokr.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/products-images/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
