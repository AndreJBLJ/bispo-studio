import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  // Endereços das versões de teste apontam para a página escolhida.
  async redirects() {
    return [
      { source: "/luz", destination: "/", permanent: false },
      { source: "/estudio", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
