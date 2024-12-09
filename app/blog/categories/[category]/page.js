import { notFound } from "next/navigation";

import { getBlogPosts } from "@/app/blog/utils";
import RowPost from "@/components/ui/RowPost";

export async function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    category: post.metadata.category,
  }));
}

export default async function BlogPage(props) {
  const params = await props.params;
  const posts = getBlogPosts().filter(
    (post) => post.metadata.type === params.category,
  );

  if (!posts.length) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 md:gap-3">
      {posts
        .sort((a, b) => {
          if (new Date(a.metadata.createdAt) > new Date(b.metadata.createdAt)) {
            return -1;
          }
          return 1;
        })
        .map((post, idx) => (
          <RowPost key={idx} post={post} category={false} />
        ))}
    </div>
  );
}
