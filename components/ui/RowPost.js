import { Link } from "next-view-transitions";
import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";
import {
  Article,
  ComingSoon,
  NewPost,
  Project,
  Updates,
} from "@/components/ui/badges";

export default function RowPost({ post, category = true }) {
  const createdAt = new Date(post.metadata.createdAt);
  const now = new Date();
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const isComingSoon = post.content === "" || createdAt > now;
  const isNew = createdAt > weekAgo && createdAt < now;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="flex justify-between items-center gap-4 py-1 sm:py-3 px-3 -mx-3 group rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 duration-150"
    >
      <div className="flex-1 flex flex-col">
        <div className="flex items-start md:items-center flex-col md:flex-row gap-0.5 md:gap-3">
          <div className="flex items-center justify-start gap-1.5 mb-1 order-1 md:order-2">
            {post.metadata.type === "project" && category && <Project />}
            {post.metadata.type === "update" && category && <Updates />}
            {post.metadata.type === "article" && category && <Article />}
            {isComingSoon && <ComingSoon />}
            {isNew && <NewPost />}
          </div>
          <p className="font-medium text-zinc-800 dark:text-zinc-200 order-2 md:order-1">
            {post.metadata.title}{" "}
            <span className="font-normal">
              •{" "}
              {createdAt.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </span>
          </p>
        </div>
        <span className="text-zinc-600 dark:text-zinc-400">
          {post.metadata.description}
        </span>
      </div>
      <ChevronDoubleRightIcon className="h-5 w-5 stroke-2 text-zinc-600 dark:text-zinc-400 opacity-0 group-hover:opacity-50 duration-150 hidden sm:group-hover:block" />
    </Link>
  );
}
