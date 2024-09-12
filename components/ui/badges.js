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
