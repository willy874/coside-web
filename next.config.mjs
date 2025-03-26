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
    domains: [`6181-13-115-215-106.ngrok-free.app`],
  },
};

export default nextConfig;
