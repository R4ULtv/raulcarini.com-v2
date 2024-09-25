"use client";
import { useEffect, useState } from "react";

export default function TableOfContent({ headings }) {
  const [currentId, setCurrentId] = useState("");

  useEffect(() => {
    const handleHashChange = () => {
      const id = window.location.hash.replace("#", "");
      setCurrentId(id);
    };

    // Set initial ID
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div className="not-prose p-4 max-w-sm space-y-3 text-sm max-h-full">
      <h2 className="font-semibold">On This Page</h2>
      <ul className="space-y-2">
        {headings.map((heading, index) => (
          <li
            key={index}
            style={{ marginLeft: `${(heading.level - 2) * 20}px` }}
          >
            <a
              href={"#" + heading.id}
              className={`hover:underline font-medium ${
                currentId === heading.id
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-zinc-700 dark:text-zinc-300"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
