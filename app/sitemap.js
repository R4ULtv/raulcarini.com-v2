import { getBlogPosts } from "@/app/blog/utils";

export default function sitemap() {
  const posts = getBlogPosts().sort(
    (a, b) => new Date(a.metadata.createdAt) - new Date(b.metadata.createdAt)
  );

  return [
    {
      url: "https://www.raulcarini.dev",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://www.raulcarini.dev/blog/categories",
      lastModified: new Date(posts[0].metadata.createdAt),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.raulcarini.dev/projects",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...posts.map((blog) => ({
      url: `https://www.raulcarini.dev/blog/${blog.slug}`,
      lastModified: new Date(blog.metadata.createdAt),
      changeFrequency: "yearly",
      priority: blog.metadata.type === "project" ? 0.7 : 0.5,
    })),
  ];
}
