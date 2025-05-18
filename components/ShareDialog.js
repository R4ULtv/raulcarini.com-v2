"use client";

import { useState, useEffect, useCallback } from "react";
import { ShareIcon } from "@heroicons/react/16/solid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function ShareDialog({ slug }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

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

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="outline-hidden text-zinc-800 dark:text-zinc-200 p-1 group">
            <ShareIcon className="size-4 group-hover:scale-110 transition duration-75 ease-out" />
          </button>
        </DialogTrigger>
        <DialogContent className="border-zinc-200 dark:border-zinc-800 outline-hidden gap-0 max-w-md">
          <DialogTitle
            as="h3"
            className="text-lg font-medium leading-6 text-zinc-800 dark:text-zinc-200"
          >
            Copy the Link
          </DialogTitle>
          <div className="mt-1.5">
            <DialogDescription className="text-sm text-zinc-600 dark:text-zinc-400">
              Copy this link to share this blog post:
            </DialogDescription>
            <div className="mt-3 relative text-zinc-800 dark:text-zinc-200">
              <p className="w-full bg-transparent rounded-lg border border-zinc-300 dark:border-zinc-700 px-3 py-2 text-sm outline-hidden">
                {link}
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
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className="outline-hidden text-zinc-800 dark:text-zinc-200 p-1 group">
          <ShareIcon className="size-4 group-hover:scale-110 transition duration-75 ease-out" />
        </button>
      </DrawerTrigger>
      <DrawerContent className="outline-hidden">
        <DrawerHeader className="p-0 px-4 my-4 text-left">
          <DrawerTitle className="text-lg font-medium leading-6 text-zinc-800 dark:text-zinc-200">
            Copy the Link
          </DrawerTitle>
          <DrawerDescription className="text-sm text-zinc-600 dark:text-zinc-400">
            Copy this link to share this blog post:
          </DrawerDescription>
        </DrawerHeader>
        <div className="pb-4 px-4">
          <p className="w-full bg-transparent rounded-lg border border-zinc-300 dark:border-zinc-700 px-3 py-2 text-sm outline-hidden">
            {link}
          </p>
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-zinc-800 dark:bg-zinc-200 text-zinc-200 dark:text-zinc-800 h-10 px-4 py-2"
            >
              Copy Link
            </button>
          </DrawerClose>
          <DrawerClose asChild>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-hidden disabled:pointer-events-none border border-zinc-200 dark:border-zinc-800 h-10 px-4 py-2">
              Cancel
            </button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
