import Image from "next/image";
import { Link } from "next-view-transitions";

import {
  ArchiveBoxIcon,
  CursorArrowRaysIcon,
  MegaphoneIcon,
} from "@heroicons/react/16/solid";

const sizes = [
  {
    size: "xs",
    icon: "size-2.5",
    text: "text-xs",
  },
  {
    size: "sm",
    icon: "size-3",
    text: "text-sm",
  },
  {
    size: "md",
    icon: "size-3.5",
    text: "text-base",
  },
];

export function ExternalLink({ href, src, alt, text }) {
  return (
    <Link
      href={href}
      target="_blank"
      className="inline-flex not-prose items-center rounded border border-zinc-200 bg-zinc-50 p-1 text-sm leading-4 text-zinc-700 no-underline dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
    >
      <Image
        src={src}
        alt={alt}
        width={14}
        height={14}
        className="mr-1 rounded-full"
      />
      <span>{text}</span>
    </Link>
  );
}

export function TwitterBadge({ src, username }) {
  return (
    <Link
      href={"https://x.com/" + username}
      target="_blank"
      className="inline-flex not-prose items-center rounded border border-zinc-200 bg-zinc-50 p-1 text-sm leading-4 text-zinc-700 no-underline dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
    >
      <Image
        src={"https://pbs.twimg.com/profile_images/" + src}
        alt={"profile image " + username}
        width={14}
        height={14}
        className="mr-1 rounded-full"
      />
      <span>{username}</span>
    </Link>
  );
}

export function ComingSoon({ className, size = "sm" }) {
  return (
    <div
      className={
        "opacity-90 px-1 bg-blue-200/50 dark:bg-blue-800/50 text-blue-600 dark:text-blue-400 ring-1 ring-blue-500/50 rounded min-w-[20px] flex justify-center items-center gap-1 " +
        className
      }
    >
      <MegaphoneIcon className={sizes.find((s) => s.size === size)["icon"]} />
      <span className={sizes.find((s) => s.size === size)["text"]}>
        Coming Soon
      </span>
    </div>
  );
}

export function Archived({ className, size = "sm" }) {
  return (
    <div
      className={
        "opacity-90 px-1 bg-orange-200/50 dark:bg-orange-800/50 text-orange-600 dark:text-orange-400 ring-1 ring-orange-500/50 rounded min-w-[20px] flex justify-center items-center gap-1 " +
        className
      }
    >
      <ArchiveBoxIcon className={sizes.find((s) => s.size === size)["icon"]} />
      <span className={sizes.find((s) => s.size === size)["text"]}>
        Archived
      </span>
    </div>
  );
}

export function NewPost({ className, size = "sm" }) {
  return (
    <div
      className={
        "opacity-90 px-1 bg-green-200/50 dark:bg-green-800/50 text-green-600 dark:text-green-400 ring-1 ring-green-500/50 rounded min-w-[20px] flex justify-center items-center gap-1 " +
        className
      }
    >
      <CursorArrowRaysIcon
        className={sizes.find((s) => s.size === size)["icon"]}
      />
      <span className={sizes.find((s) => s.size === size)["text"]}>
        New Post
      </span>
    </div>
  );
}
