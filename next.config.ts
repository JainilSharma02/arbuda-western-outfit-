import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    appIsrStatus: false,
    buildActivityPosition: "bottom-right",
    buildActivity: false,
  },
};

export default nextConfig;
