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
    WEB_API_URL: "http://localhost:5000",
    // WEB_APP_URL: "http://localhost:3000",
    IPDATA_KEY:"ddd2af4694eac7e519fbadc4d166cbf83441f1de5f5184b5bdaaa228"
  },
};

module.exports = nextConfig;
