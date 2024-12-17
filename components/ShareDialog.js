"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ShareIcon } from "@heroicons/react/16/solid";

export default function ShareDialog({ slug }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const link = "https://shrly.cc/" + slug;

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
    });
  }, [link]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="outline-none text-zinc-800 dark:text-zinc-200 p-1 group"
      >
        <ShareIcon className="size-4 group-hover:scale-110 transition duration-75 ease-out" />
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition ease-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 max-w-md overflow-hidden rounded-xl p-6 shadow-xl transition ease-out data-[closed]:opacity-0 data-[closed]:scale-50"
            >
              <DialogTitle
                as="h3"
                className="text-lg font-medium leading-6 text-zinc-800 dark:text-zinc-200"
              >
                Copy the Link
              </DialogTitle>
              <div className="mt-1.5">
                <Description className="text-sm text-zinc-600 dark:text-zinc-400">
                  Copy this link to share this blog post:
                </Description>
                <div className="mt-3 relative text-zinc-800 dark:text-zinc-200">
                  <p className="w-full bg-transparent rounded-lg border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm outline-none">
                    {link.replace("https://", "")}
                  </p>
                  <button
                    onClick={copyToClipboard}
                    className="absolute top-1.5 right-2 p-1 group"
                  >
                    {copied ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        aria-hidden="true"
                        dataslot="icon"
                        className="size-4 group-hover:scale-110 transition duration-75 ease-out"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.986 3H12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h1.014A2.25 2.25 0 0 1 7.25 1h1.5a2.25 2.25 0 0 1 2.236 2ZM9.5 4v-.75a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75V4h3Z
                                M11.354 7.146a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7 10.793l3.646-3.647a.5.5 0 0 1 .708 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        aria-hidden="true"
                        dataslot="icon"
                        className="size-4 group-hover:scale-110 transition duration-75 ease-out"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.986 3H12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h1.014A2.25 2.25 0 0 1 7.25 1h1.5a2.25 2.25 0 0 1 2.236 2ZM9.5 4v-.75a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75V4h3Z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
