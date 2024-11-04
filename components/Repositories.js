import { ArrowTopRightOnSquareIcon } from "@heroicons/react/16/solid";
import getRepositories from "@/components/utils/getRepositories";
import { Archived } from "@/components/ui/badges";

const lang = [
  {
    name: "JavaScript",
    color: "#f1e05a",
  },
  {
    name: "Python",
    color: "#3572b0",
  },
  {
    name: "C++",
    color: "#f34b7d",
  },
  {
    name: "Ruby",
    color: "#701516",
  },
  {
    name: "TypeScript",
    color: "#2b7489",
  },
  {
    name: "MDX",
    color: "#fcb32c",
  },
];

export default async function Repositories() {
  const data = await getRepositories();

  if (!data || data?.message) return <div>No repositories found.</div>;

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
