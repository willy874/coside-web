/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://c105-13-115-215-106.ngrok-free.app/:path*",
        basePath: false,
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
    domains: ['c105-13-115-215-106.ngrok-free.app'],
  },
};

export default nextConfig;
