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
        destination: `${process.env.API_URL}/:path*`
      }
    ];
  }
} satisfies NextConfig;
