import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
