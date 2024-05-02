import createMDX from "@next/mdx";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeShiki from "@shikijs/rehype";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

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

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
      [
        rehypeShiki,
        {
          themes: {
            light: "vitesse-light",
            dark: "vitesse-dark",
          },
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
