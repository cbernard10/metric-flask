/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  rewrites: async () => {
    return [
      {
        source: "/python/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/python/:path*"
            : "/python/",
      },
    ];
  },
};

module.exports = nextConfig;
