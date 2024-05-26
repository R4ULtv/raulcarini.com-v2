import { getBlogPosts } from "@/app/blog/utils";

export default function sitemap() {
  const allBlogs = getBlogPosts();

  return [
    {
      url: "https://www.raulcarini.dev",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...allBlogs.map((blog) => ({
      url: `https://www.raulcarini.dev/blog/${blog.slug}`,
      lastModified: new Date(blog.metadata.createdAt),
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ];
}
