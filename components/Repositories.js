"use client";

import { ArrowTopRightOnSquareIcon } from "@heroicons/react/16/solid";
import { Archived } from "@/components/ui/badges";
import getRepositories from "@/components/utils/getRepositories";
import { lang } from "@/lib/utils";

export default function Repositories() {
  const { data, error, isLoading } = getRepositories();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 md:gap-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex justify-between items-center gap-4 py-1 sm:py-3 px-3 -mx-3 rounded-md"
          >
            <div className="flex-1 flex gap-1.5">
              <div className="relative flex h-2 w-2 mt-2">
                <div className="h-2 w-2 rounded-full bg-zinc-200 dark:bg-zinc-700 motion-safe:animate-pulse" />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <div className="h-5 w-32 bg-zinc-200 dark:bg-zinc-700 rounded motion-safe:animate-pulse" />
                <div className="h-5 w-full max-w-96 mt-1 bg-zinc-200 dark:bg-zinc-700 rounded motion-safe:animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-32">
        <p className="text-zinc-600 dark:text-zinc-400">
          Failed to load repositories.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 md:gap-4">
      {data &&
        data.slice(0, 5).map((repo) => (
          <a
            href={repo.html_url}
            rel="noopener noreferrer"
            key={repo.id}
            target="_blank"
            className="flex justify-between items-center gap-4 py-1 sm:py-3 px-3 -mx-3 group rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 duration-150"
          >
            <div className="flex-1 flex gap-1.5">
              <div className="relative flex h-2 w-2 mt-2">
                <span
                  className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{
                    backgroundColor: lang.find((l) => l.name === repo.language)
                      ?.color,
                  }}
                ></span>
                <span
                  className="relative inline-flex rounded-full h-2 w-2 opacity-90"
                  style={{
                    backgroundColor: lang.find((l) => l.name === repo.language)
                      ?.color,
                  }}
                ></span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 font-medium text-zinc-800 dark:text-zinc-200">
                  <p>
                    {repo.name}{" "}
                    <span className="font-normal">
                      •{" "}
                      {new Date(repo.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </p>
                  {repo.archived && (
                    <Archived size="sm" className="shrink-0 ml-1.5" />
                  )}
                </div>
                <span className="text-zinc-600 dark:text-zinc-400">
                  {repo.description ? repo.description : "No description."}
                </span>
              </div>
            </div>
            <ArrowTopRightOnSquareIcon className="size-4 text-zinc-600 dark:text-zinc-400 opacity-0 group-hover:opacity-50 duration-150 hidden group-hover:block" />
          </a>
        ))}
    </div>
  );
}
