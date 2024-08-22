"use client";

import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setShowBackToTop(position > 1000);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label="Back to top"
      style={{ display: showBackToTop ? "block" : "none" }}
      className="fixed bottom-0 right-0 z-50 border border-zinc-200 dark:border-zinc-800 rounded-md backdrop-blur-2xl p-0.5 m-1.5"
    >
      <ChevronUpIcon className="size-6 text-zinc-600 dark:text-zinc-400" />
    </button>
  );
}
