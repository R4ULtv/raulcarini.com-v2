"use client";

import { CheckIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export const CopyToClipboard = ({ code }) => {
  const [copied, setCopiedState] = useState(false);

  return (
    <>
      <button
        className="absolute right-2 top-2 p-0.5 border border-zinc-200 dark:border-zinc-800 rounded-md z-[2] backdrop-blur-2xl"
        onClick={() => {
          if (copied) return;
          navigator.clipboard.writeText(code);

          setCopiedState(true);
          setTimeout(() => {
            setCopiedState(false);
          }, 2000);
        }}
      >
        {copied ? (
          <CheckIcon className="size-6 scale-[.70] stroke-zinc-600 dark:stroke-zinc-400" />
        ) : (
          <ClipboardIcon className="size-6 scale-[.70] stroke-zinc-600 dark:stroke-zinc-400" />
        )}
      </button>
    </>
  );
};
