"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function getGithubContribution() {
  const { data, error, isLoading } = useSWR(
    `https://github-contributions-api.jogruber.de/v4/R4ULtv?y=last`,
    fetcher,
    {
      revalidate: 43200,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return { data, error, isLoading };
}
