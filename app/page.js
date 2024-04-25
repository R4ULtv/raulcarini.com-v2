import Repositories from "@/components/Repositories";

export const dynamic = "force-static";

export default function Home() {
  return (
    <main className="space-y-20">
      <div>
        <a
          href={"#about"}
          className="py-5 sm:py-4 block font-medium text-zinc-800 dark:text-zinc-200 group"
          id="about"
        >
          About{" "}
          <span className="opacity-0 group-hover:opacity-90 duration-150">
            #
          </span>
        </a>
        <p className="text-zinc-600 dark:text-zinc-400">
          Hi! I'm a full-stack developer based in Milan, currently juggling
          projects and studies. On the professional side, I'm diving into
          exciting ventures like{" "}
          <a
            href="https://www.shrly.cc/"
            target="_blank"
            className="underline-offset-2 underline hover:text-zinc-500"
          >
            Shortly
          </a>{" "}
          and the{" "}
          <a
            href="https://www.shrly.cc/"
            target="_blank"
            className="underline-offset-2 underline hover:text-zinc-500"
          >
            PedeBeats
          </a>{" "}
          e-commerce platform.
        </p>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2">
          My true passion lies in crafting websites that solve problems. But
          there's more to me than code! When I'm not building, music takes
          center stage. I love producing tracks and experimenting with fresh
          sounds. If you are interested in my music check{" "}
          <a
            href="/r/spotify"
            target="_blank"
            className="underline-offset-2 underline hover:text-zinc-500"
          >
            here
          </a>
          .
        </p>
      </div>
      <div>
        <a
          href={"#projects"}
          className="py-5 sm:py-4 block font-medium text-zinc-800 dark:text-zinc-200 group"
          id="projects"
        >
          Projects{" "}
          <span className="opacity-0 group-hover:opacity-90 duration-150">
            #
          </span>
        </a>
        <div className="flex flex-col gap-6 md:gap-4">
          <a
            href="https://kits.pedebeats.com"
            target="_blank"
            className="-mx-3 flex flex-col rounded-md px-3 no-underline py-1 sm:py-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 duration-150"
          >
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              PedeBeats <span className="font-normal">• Dec 2023</span>
            </span>
            <span className="text-zinc-600 dark:text-zinc-400">
              E-Commerce website for selling music production kits.
            </span>
          </a>

          <a
            href="https://www.shrly.cc/"
            target="_blank"
            className="-mx-3 flex flex-col rounded-md px-3 no-underline py-1 sm:py-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 duration-150"
          >
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              Shortly <span className="font-normal">• Aug 2023</span>
            </span>
            <span className="text-zinc-600 dark:text-zinc-400">
              URL shortener website built with Next.js and Vercel, with
              analytics.
            </span>
          </a>

          <a
            href="https://preview.beatslab.net/"
            target="_blank"
            className="-mx-3 flex flex-col rounded-md px-3 no-underline py-1 sm:py-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 duration-150"
          >
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              BeatsLab <span className="font-normal">• Jun 2023</span>
            </span>
            <span className="text-zinc-600 dark:text-zinc-400">
              A website that sells beats and kits for producers and rappers.
            </span>
          </a>
        </div>
      </div>
      <div>
        <a
          href={"#repositories"}
          className="py-5 sm:py-4 block font-medium text-zinc-800 dark:text-zinc-200 group"
          id="repositories"
        >
          Repositories{" "}
          <span className="opacity-0 group-hover:opacity-90 duration-150">
            #
          </span>
        </a>

        <Repositories />
      </div>
    </main>
  );
}
