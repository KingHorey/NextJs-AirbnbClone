import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "github.com",
        protocol: "https",
        pathname: "/shadcn.png",
      },
    ],
  },
};

export default nextConfig;
