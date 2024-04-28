import { CalendarIcon } from "@heroicons/react/24/outline";

export default function CustomDate({ date }) {
  return (
    <span className="text-sm mb-1.5 flex items-center gap-1">
      <CalendarIcon className="w-4 h-4" />{" "}
      {date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })}
    </span>
  );
}
