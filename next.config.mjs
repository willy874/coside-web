/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://8d20-13-115-215-106.ngrok-free.app/:path*',
        basePath: false,
      },
    ]
  },

};

export default nextConfig;
