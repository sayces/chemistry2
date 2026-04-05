import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    additionalData: `@use "styles/theme" as *;`,
    includePaths: [path.join(__dirname, "src")],
  },
};

export default nextConfig;
