"use client";

import { CheckIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import { useState, useCallback } from "react";

export const CopyToClipboard = ({ code }) => {
  const [copied, setCopiedState] = useState(false);

  const handleCopy = useCallback(async () => {
    if (copied) return;

    try {
      await navigator.clipboard.writeText(code);
      setCopiedState(true);
      setTimeout(() => setCopiedState(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [code, copied]);

  const iconClass = "size-6 scale-[.70] stroke-zinc-600 dark:stroke-zinc-400";

  return (
    <button
      className="absolute right-2 top-2 p-0.5 border border-zinc-200 dark:border-zinc-800 rounded-md z-2 bg-white dark:bg-[#121212]"
      onClick={handleCopy}
    >
      {copied ? (
        <CheckIcon className={iconClass} />
      ) : (
        <ClipboardIcon className={iconClass} />
      )}
    </button>
  );
};
