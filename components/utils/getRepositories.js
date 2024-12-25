"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function getRepositories() {
  const { data, error, isLoading } = useSWR(
    `https://api.github.com/users/R4ULtv/repos?sort=created`,
    fetcher,
    {
      revalidate: 43200,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return { data, error, isLoading };
}
