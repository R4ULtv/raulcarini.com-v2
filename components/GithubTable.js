"use client";

import numeral from "numeral";
import { Link } from "next-view-transitions";
import getGithubContribution from "@/components/utils/getContributions";
import getRepositories from "@/components/utils/getRepositories";
import { TableCellsIcon } from "@heroicons/react/16/solid";

export default function GithubTable() {
  const { data, isLoading } = getGithubContribution();
  const { data: repos, isLoading: isLoadingRepos } = getRepositories();

  if (isLoading || isLoadingRepos) {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-sm text-zinc-800 dark:text-zinc-200">
          <span className="font-semibold w-10 h-4 bg-zinc-200 dark:bg-zinc-700 motion-safe:animate-pulse rounded inline-block align-middle" />{" "}
          contributions in the last year and{" "}
          <span className="font-semibold w-3 h-4 bg-zinc-200 dark:bg-zinc-700 motion-safe:animate-pulse rounded inline-block align-middle" />{" "}
          new public repositories.
        </p>
        <div className="w-full h-[106px] border border-zinc-200 dark:border-zinc-800 rounded-md motion-safe:animate-pulse flex items-center justify-center">
          <TableCellsIcon className="size-6 text-zinc-300 dark:text-zinc-700" />
        </div>
        <div className="flex items-center justify-between gap-3 w-full text-xs text-zinc-700 dark:text-zinc-300">
          <Link
            href="/blog/github-contributions"
            className="hover:underline underline-offset-2"
          >
            Learn how we count contributions
          </Link>
          <div className="flex items-center gap-1">
            Less{" "}
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className="size-2.5 p-0 rounded-sm bg-zinc-200 dark:bg-zinc-700 motion-safe:animate-pulse"
              />
            ))}{" "}
            More
          </div>
        </div>
      </div>
    );
  }

  const oneYearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
  const recentRepos = repos.filter(
    (repo) => new Date(repo.created_at) > oneYearAgo
  );

  const renderRow = (dayNum) => (
    <tr key={dayNum} className="h-2.5">
      {dayNum === 0 && <td></td>}
      {dayNum % 2 === 1 && (
        <td rowSpan={2} className="text-xs font-semibold pr-6 sm:pr-8 relative">
          <div className="absolute -top-1 -left-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dayNum]}
          </div>
        </td>
      )}
      {data.contributions
        .filter(
          (contribution) => new Date(contribution.date).getDay() === dayNum
        )
        .map((contribution, index) => (
          <td
            key={index}
            className={`w-2.5 p-0 rounded-sm -outline-offset-1 level-${contribution.level}`}
            title={`${contribution.count} contributions on ${new Date(contribution.date).toLocaleDateString("en-US", { month: "long", day: "numeric" })}`}
          />
        ))}
    </tr>
  );

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-zinc-800 dark:text-zinc-200">
        <span className="font-semibold">
          {numeral(data.total.lastYear).format("0,0")}
        </span>{" "}
        contributions in the last year and{" "}
        <span className="font-semibold">
          {recentRepos.length > 0 ? recentRepos.length : 0}{" "}
        </span>{" "}
        new public repositories.
      </p>
      <div className="overflow-x-auto max-w-full">
        <table className="border-separate border-spacing-0.5 w-max mx-auto px-2 text-zinc-700 dark:text-zinc-300">
          <thead>
            <tr>
              <td></td>
              {data.contributions.map((contribution, i) => {
                const date = new Date(contribution.date);
                const firstDayOfMonth = i === 0 || date.getDate() === 1;
                if (firstDayOfMonth) {
                  const month = date.toLocaleString("default", {
                    month: "short",
                  });
                  return (
                    <td
                      key={i}
                      colSpan={4}
                      className="text-xs font-semibold first-letter:uppercase"
                    >
                      {month}
                    </td>
                  );
                }
              })}
            </tr>
          </thead>
          <tbody>{[0, 1, 2, 3, 4, 5, 6].map((day) => renderRow(day))}</tbody>
        </table>
      </div>
      <div className="flex items-center justify-between gap-3 w-full text-xs text-zinc-700 dark:text-zinc-300">
        <Link
          href="/blog/github-contributions"
          className="hover:underline underline-offset-2"
        >
          Learn how we count contributions
        </Link>
        <div className="flex items-center gap-1">
          Less{" "}
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`size-2.5 p-0 rounded-sm level-${level}`}
            />
          ))}{" "}
          More
        </div>
      </div>
    </div>
  );
}
