import moment from "moment";
import Link from "next/link";

export default function TopNavPost({ title, date, slug }) {
  return (
    <>
      <h1 className="mb-1">
        <Link href="" className="font-bold">
          {title}
        </Link>
      </h1>

      <span className="text-sm mb-1.5 flex items-center gap-1">
        {date.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}{" "}
        ({moment(date).fromNow()})
      </span>
    </>
  );
}
