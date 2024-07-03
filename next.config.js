/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites(){
      return [
        {
          source:'/api/auth/verify',
          destination: '/api/auth/verify'
        }
      ]
    },
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
        },
      ],
    },
  };
  
  module.exports = nextConfig