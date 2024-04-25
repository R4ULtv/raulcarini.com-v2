/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
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

export default nextConfig;
