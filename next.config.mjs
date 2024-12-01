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
        source: "/blog",
        destination: "/blog/categories",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
