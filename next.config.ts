import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["172.25.11.40"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "medicalworldnigeria.com" },
      { protocol: "https", hostname: "oyostate.gov.ng" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "gmldnigeria.org" },
    ],
  },
};

export default nextConfig;
