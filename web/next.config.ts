import type { NextConfig } from "next";

export default {
  typedRoutes: true,
  reactCompiler: true,
  devIndicators: false,
  reactStrictMode: true,
  poweredByHeader: false,
} satisfies NextConfig;
