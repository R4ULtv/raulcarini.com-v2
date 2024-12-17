"use client";

import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { useCallback, useEffect, useState } from "react";

export default function BackToTop() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleScroll = useCallback(() => {
    setShowBackToTop(window.scrollY > 1000);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!showBackToTop) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-2.5 right-2.5 z-50 border border-zinc-200 dark:border-zinc-800 rounded-md bg-zinc-100 dark:bg-zinc-900 p-0.5"
    >
      <ChevronUpIcon className="size-6 text-zinc-600 dark:text-zinc-400" />
    </button>
  );
}
