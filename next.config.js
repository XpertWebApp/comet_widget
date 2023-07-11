/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  experimental: {
    appDir: true,
  },
  env: {
    FRONTEND_PORT: "3000",
    // WEB_API_URL: "http://localhost:5000",
    WEB_API_URL: "http://3.210.234.148:5000",
    // WEB_APP_URL: "http://localhost:3000",
    IPDATA_KEY: "9f41d6f4795852feac8ab106aede039f0485748978ed1749ced3ac4d",
  },
};

module.exports = nextConfig;
