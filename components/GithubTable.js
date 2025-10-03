"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  TableCellsIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/16/solid";
import numeral from "numeral";

// Constants
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const CONTRIBUTION_LEVEL_CLASSES = [
  "level-0",
  "level-1",
  "level-2",
  "level-3",
  "level-4",
];

const ContributionCell = React.memo(function ContributionCell({
  contribution,
}) {
  const date = new Date(contribution.date);
  const formattedDate = new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
  });
  const label = `${contribution.count} contributions on ${formattedDate}`;

  return (
    <td
      role="gridcell"
      aria-label={label}
      className={cn(
        "w-2.5 p-0 rounded-xs -outline-offset-1",
        CONTRIBUTION_LEVEL_CLASSES[contribution.level],
      )}
      title={label}
    />
  );
});

const WeekdayLabel = React.memo(function WeekdayLabel({ day }) {
  return (
    <td rowSpan={2} className="text-xs font-semibold pr-6 sm:pr-8 relative">
      <div className="absolute -top-1 -left-1">{WEEKDAYS[day]}</div>
    </td>
  );
});

const MonthLabel = React.memo(function MonthLabel({ date, colSpan }) {
  if (!date) return <td colSpan={colSpan} />;
  return (
    <td
      colSpan={colSpan}
      className="text-xs font-semibold first-letter:uppercase"
    >
      {new Date(date).toLocaleString("en-US", { month: "short" })}
    </td>
  );
});

const StatusDisplay = ({ icon, message, additionalClasses }) => {
  return (
    <div
      className={`w-full max-w-[688px] min-h-[160px] border rounded-md flex flex-col items-center justify-center gap-1 ${
        additionalClasses || ""
      }`}
    >
      {icon}
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
};

function ContributionGrid({ data }) {
  const contributionsByDay = React.useMemo(() => {
    return data.reduce((acc, contribution) => {
      const day = new Date(contribution.date).getDay();
      if (!acc[day]) acc[day] = [];
      acc[day].push(contribution);
      return acc;
    }, {});
  }, [data]);

  const monthLabels = React.useMemo(
    () =>
      data.reduce((acc, contribution, i) => {
        const date = new Date(contribution.date);
        const isStartOfWeek = i % 7 === 0;
        const isWithinFirstWeekOfMonth =
          date.getDate() >= 1 && date.getDate() <= 7;
        const isBeforeLastWeek =
          date < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

        if (
          i === 0 ||
          (isStartOfWeek && isWithinFirstWeekOfMonth && isBeforeLastWeek)
        ) {
          const daysInMonth = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0,
          ).getDate();
          const remainingDays = daysInMonth - date.getDate();

          acc[i] = (
            <MonthLabel
              key={i}
              date={remainingDays > 14 ? date : undefined}
              colSpan={
                i === 0
                  ? Math.ceil(remainingDays / 7)
                  : remainingDays >= 28
                    ? 5
                    : 4
              }
            />
          );
        } else {
          acc[i] = null;
        }
        return acc;
      }, []),
    [data],
  );

  const renderRow = React.useCallback(
    (dayNum) => (
      <tr key={dayNum} className="h-2.5" role="row">
        {dayNum === 0 && <td />}
        {dayNum % 2 === 1 && <WeekdayLabel day={dayNum} />}
        {contributionsByDay[dayNum]?.map((contribution, index) => (
          <ContributionCell key={index} contribution={contribution} />
        ))}
      </tr>
    ),
    [contributionsByDay],
  );

  return (
    <div
      className="overflow-x-auto max-w-full"
      role="region"
      aria-label="GitHub contributions calendar"
    >
      <table
        className="border-separate border-spacing-0.5 w-max mx-auto px-2 text-foreground"
        role="grid"
      >
        <thead>
          <tr role="row">
            <td />
            {monthLabels}
          </tr>
        </thead>
        <tbody>{Array.from({ length: 7 }, (_, i) => renderRow(i))}</tbody>
      </table>
    </div>
  );
}

export default function GitHubContributions({ username }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [fetchedData, setFetchedData] = React.useState(null);
  const [fetchedRepoCount, setFetchedRepoCount] = React.useState(null);

  const data = fetchedData;
  const repoCount = fetchedRepoCount;

  const totalContributions = React.useMemo(
    () => data?.reduce((acc, item) => acc + item.count, 0) || 0,
    [data],
  );

  React.useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [contributionsResponse, reposResponse] = await Promise.all([
          fetch(
            `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
          ),
          fetch(`https://api.github.com/users/${username}/repos?sort=created`),
        ]);

        if (!contributionsResponse.ok) {
          throw new Error("Failed to fetch contributions");
        }

        if (!reposResponse.ok) {
          throw new Error("Failed to fetch repositories");
        }

        const contributionsResult = await contributionsResponse.json();
        const reposResult = await reposResponse.json();

        const publicReposCount = reposResult.filter(
          (repo) =>
            new Date(repo.created_at) >
            new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
        ).length;

        setFetchedData(contributionsResult.contributions);
        setFetchedRepoCount(publicReposCount);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unknown error occurred"));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (loading) {
    return (
      <StatusDisplay
        icon={<TableCellsIcon className="size-6 stroke-muted-foreground" />}
        message={`Loading contribution data for ${username}...`}
        additionalClasses="motion-safe:animate-pulse"
      />
    );
  }

  if (error) {
    return (
      <StatusDisplay
        icon={<ExclamationTriangleIcon className="size-6 stroke-destructive" />}
        message={`Error: ${error.message}`}
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <StatusDisplay
        icon={
          <ExclamationTriangleIcon className="size-6 stroke-muted-foreground" />
        }
        message="No contribution data available."
      />
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full md:w-min">
      <p className="text-sm text-foreground">
        <span className="font-semibold">
          {numeral(totalContributions).format("0,0")}
        </span>{" "}
        contributions in the last year
        {repoCount !== null && repoCount !== undefined && (
          <>
            {" "}
            and <span className="font-semibold">{repoCount}</span> new public
            repositories
          </>
        )}
        .
      </p>
      <ContributionGrid data={data} />
      <div className="flex items-center justify-between gap-3 w-full text-xs text-muted-foreground">
        <a
          href="https://docs.github.com/articles/why-are-my-contributions-not-showing-up-on-my-profile"
          className="hover:underline underline-offset-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn how we count contributions
        </a>

        <div className="flex items-center gap-1">
          Less
          <div className="size-2.5 p-0 rounded-xs level-0"></div>
          <div className="size-2.5 p-0 rounded-xs level-1"></div>
          <div className="size-2.5 p-0 rounded-xs level-2"></div>
          <div className="size-2.5 p-0 rounded-xs level-3"></div>
          <div className="size-2.5 p-0 rounded-xs level-4"></div>
          More
        </div>
      </div>
    </div>
  );
}
