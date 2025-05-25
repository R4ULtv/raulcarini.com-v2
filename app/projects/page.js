import { Link } from "next-view-transitions";
import Image from "next/image";

import { projects } from "@/lib/projects";
import {
  CalendarDateRangeIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  PhotoIcon,
  UsersIcon,
} from "@heroicons/react/16/solid";

export default function ProjectsPage() {
  return (
    <div className="flex flex-col items-center gap-6 md:gap-6">
      {projects.map((project) => (
        <div
          key={project.name}
          className="flex flex-col md:flex-row items-start justify-start w-full gap-3"
        >
          {project.image ? (
            <a
              href={project.url}
              target="_blank"
              className="rounded-lg overflow-hidden group w-full h-auto md:w-60 md:h-auto shrink-0"
            >
              <Image
                src={project.image}
                alt={project.name}
                width={240}
                height={135}
                quality={100}
                className="group-hover:scale-105 w-full h-auto transition-transform duration-150 ease-out"
              />
            </a>
          ) : (
            <div className="w-full aspect-video md:aspect-auto md:w-60 md:h-32 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 flex flex-col items-center justify-center">
              <PhotoIcon className="size-5" />
              <span className="text-xs">No photo available.</span>
            </div>
          )}
          <div className="space-y-1.5 px-2 md:px-0">
            <a
              href={project.url}
              target="_blank"
              className="text-xl font-semibold hover:underline underline-offset-2 text-zinc-900 dark:text-zinc-100"
            >
              {project.name}
            </a>
            <p className="text-zinc-700 dark:text-zinc-300">
              {project.description}
            </p>
            <div className="flex items-center flex-wrap gap-x-3 gap-y-1">
              <div className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400 text-sm">
                <CalendarDateRangeIcon className="size-4" />
                <span className="hidden md:block">Created on</span>
                <span className="md:hidden">
                  {new Date(project.createdAt).toLocaleDateString("en-US")}
                </span>
                <span className="hidden md:block">
                  {new Date(project.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400 text-sm">
                <UsersIcon className="size-4" />
                <span className="hidden md:block">Monthly Visitors</span>
                <span>{project.monthlyVisitors}</span>
              </div>
              {project.moneyEarned >= 0 && (
                <div className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400 text-sm">
                  <CurrencyDollarIcon className="size-4" />
                  <span className="hidden md:block">Money Earned</span>
                  <span>{project.moneyEarned}</span>
                </div>
              )}
            </div>
            <div className="flex items-center flex-wrap gap-x-3 gap-y-1">
              {project.blogPost && (
                <Link
                  href={`/blog/${project.blogPost}`}
                  className="flex items-center gap-1 text-zinc-500 text-sm hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors duration-75 ease-out"
                >
                  <DocumentTextIcon className="size-4" />
                  Read Blog Post
                </Link>
              )}
              {project.openSource && (
                <a
                  href={`https://github.com/r4ultv/${project.openSource}`}
                  target="_blank"
                  className="flex items-center gap-1 text-zinc-500 text-sm hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors duration-75 ease-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512"
                    fill="currentColor"
                    className="size-4"
                  >
                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                  </svg>
                  View Source
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
