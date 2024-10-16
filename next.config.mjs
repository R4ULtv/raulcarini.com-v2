/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "pbs.twimg.com" },
      { protocol: "https", hostname: "abs.twimg.com" },
    ],
  },

  async redirects() {
    return [
      {
        source: "/posts/:path*",
        destination: "/blog/:path*",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/#blog",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
