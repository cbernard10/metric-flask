/** @type {import('next')***REMOVED***NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination:
          process***REMOVED***env***REMOVED***NODE_ENV === "development"
            ? "http://127***REMOVED***0***REMOVED***0***REMOVED***1:8000/api/:path*"
            : "/api/",
      },
      {
        source: "/docs",
        destination:
          process***REMOVED***env***REMOVED***NODE_ENV === "development"
            ? "http://127***REMOVED***0***REMOVED***0***REMOVED***1:8000/docs"
            : "/api/docs",
      },
      {
        source: "/openapi***REMOVED***json",
        destination:
          process***REMOVED***env***REMOVED***NODE_ENV === "development"
            ? "http://127***REMOVED***0***REMOVED***0***REMOVED***1:8000/openapi***REMOVED***json"
            : "/api/openapi***REMOVED***json",
      },
    ];
  },
};

module***REMOVED***exports = nextConfig;
