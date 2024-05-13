import Link from "next/link";
import Date from "@/components/Date";
import PageViews from "@/components/PageViews";
import { Suspense } from "react";

export default function TopNavPost({ title, date, path }) {
  return (
    <>
      <h1 className="mb-1 font-bold">{title}</h1>

      <div className="flex items-center justify-between mb-1.5">
        <Date date={date} />
        <Suspense fallback={<></>}>
          <PageViews path={path} />
        </Suspense>
      </div>
    </>
  );
}
