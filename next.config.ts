import type { NextConfig } from "next";
import { imageHostPatterns } from "./src/lib/imageHosts";

const nextConfig: NextConfig = {
  images: {
    // Kept in sync with `isAllowedImageSrc` in src/lib/imageHosts.ts, which
    // swaps anything not listed here for the fallback before it reaches
    // <Image> — an unconfigured host makes next/image throw and kills the page.
    remotePatterns: imageHostPatterns,
  },
};

export default nextConfig;
