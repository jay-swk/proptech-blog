import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/proptech-blog",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
