import type { NextConfig } from "next";

export default {
  typedRoutes: true,
  reactCompiler: true,
  devIndicators: false,
  reactStrictMode: true,
  poweredByHeader: false,
  rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.API_URL || "http://127.0.0.1:5000/api/:path*"
      }
    ];
  }
} satisfies NextConfig;
