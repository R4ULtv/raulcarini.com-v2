import { getBlogPosts } from "@/app/blog/utils";
import RowPost from "@/components/ui/RowPost";

export default function BlogPage() {
  const posts = getBlogPosts();

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
          <RowPost key={idx} post={post} />
        ))}
    </div>
  );
}
