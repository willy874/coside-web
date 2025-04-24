const API_URL = process.env.NEXT_PUBLIC_API_URL;
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_URL}/:path*`
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    domains: [`145f2cdec067.ngrok.app`],
  },
};

export default nextConfig;
