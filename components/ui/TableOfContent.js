"use client";

import { Button } from "@headlessui/react";
import { Bars3BottomRightIcon } from "@heroicons/react/16/solid";
import { useCallback, useState } from "react";
import { Drawer } from "vaul";

export default function TableOfTable({ headings }) {
  const [open, setOpen] = useState(false);

  const scrollToHeading = useCallback(async (id) => {
    setOpen(false);

    // wait 350ms
    await new Promise((resolve) => setTimeout(resolve, 350));

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  return (
    <Drawer.Root direction="right" open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <Button
          aria-label="Table of Contents"
          className="flex justify-center items-center cursor-pointer group duration-150 text-gray-800 dark:text-gray-200"
        >
          <Bars3BottomRightIcon className="size-4 group-hover:scale-110 duration-150" />
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="flex flex-col rounded-l-xl h-full w-[400px] mt-24 fixed bottom-0 right-0 bg-zinc-100 dark:bg-zinc-900 outline-none">
          <div className="p-4 flex-1 h-full overflow-auto">
            <div className="max-w-md mx-auto">
              <Drawer.Title className="font-medium mb-4">
                Table of Contents
              </Drawer.Title>
              <ul className="space-y-2">
                {headings.map((heading) => (
                  <li
                    key={heading.id}
                    style={{ marginLeft: `${(heading.level - 2) * 16}px` }}
                  >
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToHeading(heading.id);
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
