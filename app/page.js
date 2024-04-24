import Repositories from "@/components/Repositories";
import Link from "next/link";

export default function Home() {
  return (
    <main className="space-y-20">
      <div>
        <Link
          href={"#projects"}
          className="mb-5 block font-medium sm:mb-4 text-zinc-800 dark:text-zinc-200 group"
          id="projects"
        >
          Projects{" "}
          <span className="opacity-0 group-hover:opacity-90 duration-150">
            #
          </span>
        </Link>
        <div className="flex flex-col gap-7 sm:gap-4">
          <Link
            href="https://kits.pedebeats.com"
            target="_blank"
            className="-mx-3 flex flex-col rounded-md px-3 no-underline sm:py-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 duration-150"
          >
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              PedeBeats <span className="font-normal">• Dec 2023</span>
            </span>
            <span className="text-gray-600 dark:text-zinc-400">
              E-Commerce website for selling music production kits.
            </span>
          </Link>

          <Link
            href="https://www.shrly.cc/"
            target="_blank"
            className="-mx-3 flex flex-col rounded-md px-3 no-underline sm:py-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 duration-150"
          >
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              Shortly <span className="font-normal">• Aug 2023</span>
            </span>
            <span className="text-gray-600 dark:text-zinc-400">
              URL shortener website built with Next.js and Vercel, with
              analytics.
            </span>
          </Link>

          <Link
            href="https://preview.beatslab.net/"
            target="_blank"
            className="-mx-3 flex flex-col rounded-md px-3 no-underline sm:py-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 duration-150"
          >
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              BeatsLab <span className="font-normal">• Jun 2023</span>
            </span>
            <span className="text-gray-600 dark:text-zinc-400">
              A website that sells beats and kits for producers and rappers.
            </span>
          </Link>
        </div>
      </div>
      <div>
        <Link
          href={"#repositories"}
          className="mb-5 block font-medium sm:mb-4 text-zinc-800 dark:text-zinc-200 group"
          id="repositories"
        >
          Repositories{" "}
          <span className="opacity-0 group-hover:opacity-90 duration-150">
            #
          </span>
        </Link>

        <Repositories />
      </div>
    </main>
  );
}
