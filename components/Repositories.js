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
    name: "Java",
    color: "#b07219",
  },
  {
    name: "PHP",
    color: "#4f5d95",
  },
  {
    name: "C#",
    color: "#178600",
  },
  {
    name: "Ruby",
    color: "#701516",
  },
  {
    name: "Go",
    color: "#00add8",
  },
];

export default async function Repositories() {
  const res = await fetch(
    "https://api.github.com/users/R4ULtv/repos?sort=updated&per_page=5",
    { next: { revalidate: 604800 } } // Revalidate every week
  );
  const data = await res.json();

  if (!data || data?.message) return <div>No repositories found.</div>;

  return (
    <div className="flex flex-col gap-6 md:gap-4">
      {data &&
        data.map((repo) => (
          <a
            href={repo.html_url}
            rel="noopener noreferrer"
            key={repo.id}
            target="_blank"
            className="-mx-3 flex items-start gap-1.5 rounded-md py-1 px-3 no-underline sm:py-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 duration-150"
          >
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
              <span className="font-medium text-zinc-800 dark:text-zinc-200">
                {repo.name}{" "}
                <span className="font-normal">
                  •{" "}
                  {new Date(repo.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </span>
              <span className="text-zinc-600 dark:text-zinc-400">
                {repo.description ? repo.description : "No description."}
              </span>
            </div>
          </a>
        ))}
    </div>
  );
}
