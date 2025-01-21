/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://c105-13-115-215-106.ngrok-free.app/:path*',
        basePath: false,
      },
    ]
  },
  images: {
    domains: ['images.unsplash.com'], // 新增允許的圖片來源域名
  },
};

export default nextConfig;
