"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Transition,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";

export default function FullScreenImage(props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Image
        {...props}
        onClick={() => setIsOpen(true)}
        className={"cursor-pointer rounded-lg " + props.className}
      />

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50 group"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 backdrop-blur transition duration-150 ease-out data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
            transition
            className="transition duration-150 ease-out data-[closed]:opacity-0 data-[closed]:scale-75 flex items-center justify-center"
          >
            <Image
              {...props}
              quality={100}
              width={1080}
              className="max-w-[90vw] max-h-[90vh] w-full h-full rounded-lg"
            />
          </DialogPanel>
          <Transition show={isOpen}>
            <button onClick={() => setIsOpen(false)} className="absolute top-5 right-5">
              <XMarkIcon className="size-6 text-zinc-800 dark:text-zinc-200" />
            </button>
          </Transition>
        </div>
      </Dialog>
    </>
  );
}
