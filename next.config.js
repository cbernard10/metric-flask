/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  rewrites: async () => {
    return [
      {
        source: "/api/auth/:path*",
        destination: "/api/auth/:path*"
      },
      {
        source: "/api/metric/:path*",
        destination: "/api/metric/:path*"
      },
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/api/:path*"
            : "/api/",
      },
    ];
  },
};

module.exports = nextConfig;
