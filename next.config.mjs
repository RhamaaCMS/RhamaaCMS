import path from "node:path";

/** @type {import("next").NextConfig} */
const nextConfig = {
  distDir: ".next-inertia",
  assetPrefix: "/static",
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      "@": path.resolve(process.cwd(), "frontend"),
    };

    return config;
  },
};

export default nextConfig;
