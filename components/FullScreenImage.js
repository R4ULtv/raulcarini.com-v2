"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function FullScreenImage(props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          {...props}
          className={"cursor-pointer rounded-lg " + props.className}
        />
      </DialogTrigger>
      <DialogContent
        closeButton={false}
        className="p-0 border-0 max-w-none flex items-center justify-center w-fit outline-none bg-transparent dark:bg-transparent"
      >
        <DialogTitle className="sr-only">FullScreen Image</DialogTitle>
        <DialogDescription className="sr-only">{props.alt}</DialogDescription>
        <div className="absolute -z-10">
          <svg
            className="motion-safe:animate-spin size-6 text-zinc-200"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
        <Image
          {...props}
          quality={100}
          width={1080}
          className="w-full h-full max-w-[90vw] max-h-[90vh] rounded-lg"
        />
      </DialogContent>
    </Dialog>
  );
}
