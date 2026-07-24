import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/cases/verum-center", destination: "/cases/nexus", permanent: true },
      { source: "/cases/verum-global-vs-vsg", destination: "/cases/ship-it-to-scale-it", permanent: true },
      { source: "/cases/verum-supply", destination: "/cases/flowops", permanent: true },
      { source: "/cases/pneustore", destination: "/cases/tire-platform", permanent: true },
    ];
  },
};

export default nextConfig;
