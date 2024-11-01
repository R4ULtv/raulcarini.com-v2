import { getBlogPosts } from "@/app/blog/utils";

export default function sitemap() {
  const posts = getBlogPosts();

  return [
    {
      url: "https://www.raulcarini.dev",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...posts.map((blog) => ({
      url: `https://www.raulcarini.dev/blog/${blog.slug}`,
      lastModified: new Date(blog.metadata.createdAt),
      changeFrequency: "monthly",
      priority: blog.metadata.type === "project" ? 0.8 : 0.5,
    })),
  ];
}
