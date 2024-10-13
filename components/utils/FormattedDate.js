"use client";

import { formatRelativeTime } from "@/components/utils/moment";

export default function FormattedDate({ date }) {
  return (
    <span className="text-sm flex items-center gap-1">
      {date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })}{" "}
      ({formatRelativeTime(date)})
    </span>
  );
}
