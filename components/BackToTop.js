"use client";

import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
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
      style={{ display: showBackToTop ? "block" : "none" }}
      className="fixed bottom-0 right-0 z-50 bg-zinc-700 dark:bg-zinc-300 p-1.5 m-1.5 rounded-md"
    >
      <ChevronUpIcon className="h-5 w-5 text-zinc-300 dark:text-zinc-700 stroke-2" />
    </button>
  );
}
