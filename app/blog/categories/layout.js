"use client";

import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import {
  BriefcaseIcon,
  DocumentTextIcon,
  ListBulletIcon,
  UserGroupIcon,
} from "@heroicons/react/16/solid";

export default function Layout({ children }) {
  const path = usePathname();
  const relativePath = path.replace("/blog/categories", "");

  return (
    <div>
      <div className="flex flex-wrap items-center justify-start gap-1.5 text-sm text-zinc-200 font-semibold mb-3">
        <Link
          href="/blog/categories"
          className={`md:px-2 p-0.5 flex items-center gap-1 text-sm font-semibold border-b-2 ${relativePath === "" ? "text-zinc-800 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700" : "text-zinc-600 dark:text-zinc-400 border-transparent duration-75 transition ease-out hover:border-zinc-300 dark:hover:border-zinc-700"}`}
        >
          <ListBulletIcon className="size-4" />
          All Posts
        </Link>
        <Link
          href="/blog/categories/project"
          className={`md:px-2 p-0.5 flex items-center gap-1 text-sm font-semibold border-b-2 ${relativePath === "/project" ? "text-zinc-800 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700" : "text-zinc-600 dark:text-zinc-400 border-transparent duration-75 transition ease-out hover:border-zinc-300 dark:hover:border-zinc-700"}`}
        >
          <BriefcaseIcon className="size-4" /> Projects
        </Link>
        <Link
          href="/blog/categories/update"
          className={`md:px-2 p-0.5 flex items-center gap-1 text-sm font-semibold border-b-2 ${relativePath === "/update" ? "text-zinc-800 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700" : "text-zinc-600 dark:text-zinc-400 border-transparent duration-75 transition ease-out hover:border-zinc-300 dark:hover:border-zinc-700"}`}
        >
          <UserGroupIcon className="size-4" />
          Updates
        </Link>
        <Link
          href="/blog/categories/article"
          className={`md:px-2 p-0.5 flex items-center gap-1 text-sm font-semibold border-b-2 ${relativePath === "/article" ? "text-zinc-800 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700" : "text-zinc-600 dark:text-zinc-400 border-transparent duration-75 transition ease-out hover:border-zinc-300 dark:hover:border-zinc-700"}`}
        >
          <DocumentTextIcon className="size-4" />
          Articles
        </Link>
      </div>
      <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-3 text-balance">
        {relativePath === "/project"
          ? "Posts showcasing my latest projects and developments."
          : relativePath === "/update"
            ? "Project updates, blog news, and personal insights."
            : "Explore my complete collection of posts."}
      </p>
      {children}
    </div>
  );
}
