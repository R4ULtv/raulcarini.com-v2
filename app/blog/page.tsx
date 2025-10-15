import Link from "next/link";
import { getAllPosts } from "@/lib/content";

export default async function Home() {
  const posts = (await getAllPosts());

  return (
    <section id="blog">
      <div className="flex flex-col gap-6 md:gap-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="flex justify-between items-center gap-4 py-1 sm:py-3 px-3 -mx-3 group rounded-md hover:bg-muted/50 dark:hover:bg-muted/50 duration-200 ease-out"
          >
            <div className="flex-1 flex flex-col">
              <p className="font-medium">
                {post.metadata.title}{" "}
                <span className="font-normal">
                  •{" "}
                  {new Date(post.metadata.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
                </span>
              </p>
              <span className="text-muted-foreground">
                {post.metadata.description}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
