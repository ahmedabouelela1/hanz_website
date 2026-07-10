import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      // Laravel backend media (adjust hostname on deploy)
      {
        protocol: "https",
        hostname: "hanz.thecodehaus.co",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
