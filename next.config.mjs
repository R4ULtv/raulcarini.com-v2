/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'pbs.twimg.com' },
      { protocol: 'https', hostname: 'abs.twimg.com' },
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
        source: "/r/youtube",
        destination: "https://www.youtube.com/@lil-poop",
        permanent: true,
      },
      {
        source: "/r/twitter",
        destination: "https://twitter.com/lil_poop__",
        permanent: true,
      },
      {
        source: "/r/github",
        destination: "https://github.com/R4ULtv",
        permanent: true,
      },
      {
        source: "/r/instagram",
        destination: "https://www.instagram.com/lil.poop__/",
        permanent: true,
      },
      {
        source: "/r/spotify",
        destination: "https://open.spotify.com/artist/21DbatkhkYpxIpLfQ4LeUo",
        permanent: true,
      },
      {
        source: "/g/:path*",
        destination: "https://github.com/R4ULtv/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig
