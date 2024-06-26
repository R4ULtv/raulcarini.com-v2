import Repositories from "@/components/Repositories";
import Link from "next/link";
import { getBlogPosts } from "@/app/blog/utils";
import {
  ArrowRightCircleIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { projects } from "@/components/utils/projects";
import { ArchiveBoxIcon, MegaphoneIcon } from "@heroicons/react/16/solid";

export default function Home() {
  const allBlogs = getBlogPosts();

  return (
    <div className="space-y-20">
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
            className="underline-offset-2 underline font-medium text-zinc-700 hover:text-zinc-600 dark:text-zinc-300 dark:hover:text-zinc-400 duration-150"
          >
            Shortly
          </a>{" "}
          and the{" "}
          <a
            href="https://kits.pedebeats.com"
            target="_blank"
            className="underline-offset-2 underline font-medium text-zinc-700 hover:text-zinc-600 dark:text-zinc-300 dark:hover:text-zinc-400 duration-150"
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
            href="https://open.spotify.com/artist/21DbatkhkYpxIpLfQ4LeUo"
            target="_blank"
            className="underline-offset-2 underline font-medium text-zinc-700 hover:text-zinc-600 dark:text-zinc-300 dark:hover:text-zinc-400 duration-150"
          >
            here
          </a>
          .
        </p>
      </div>

      <div>
        <a
          href={"#blog"}
          className="py-5 sm:py-4 block font-medium text-zinc-800 dark:text-zinc-200 group"
          id="blog"
        >
          Blog{" "}
          <span className="opacity-0 group-hover:opacity-90 duration-150">
            #
          </span>
        </a>
        <div className="flex flex-col gap-6 md:gap-4">
          {allBlogs
            .sort((a, b) => {
              if (
                new Date(a.metadata.createdAt) > new Date(b.metadata.createdAt)
              ) {
                return -1;
              }
              return 1;
            })
            .map((post, idx) => (
              <Link
                href={"/blog/" + post.slug}
                key={idx}
                className="flex justify-between items-center gap-4 py-1 sm:py-3 px-3 -mx-3 group rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 duration-150"
              >
                <div className="flex-1 flex flex-col">
                  <span className="flex items-center gap-1.5 font-medium text-zinc-800 dark:text-zinc-200">
                    {post.metadata.title}{" "}
                    <span className="font-normal">
                      •{" "}
                      {new Date(post.metadata.createdAt).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "long" }
                      )}
                    </span>
                    {post.content === "" && (
                      <div className="ml-1.5 opacity-90 px-1 text-sm bg-blue-200/50 dark:bg-blue-800/50 text-blue-600 dark:text-blue-400 ring-1 ring-blue-500/50 rounded-md min-w-[20px] flex justify-center items-center gap-1">
                        <MegaphoneIcon className="size-3" />
                        Coming Soon
                      </div>
                    )}
                  </span>
                  <span className="text-zinc-600 dark:text-zinc-400">
                    {post.metadata.description}
                  </span>
                </div>
                <ArrowRightCircleIcon className="h-5 w-5 stroke-2 text-zinc-600 dark:text-zinc-400 opacity-0 group-hover:opacity-50 duration-150" />
              </Link>
            ))}
        </div>
      </div>

      <div>
        <a
          href={"#projects"}
          className="py-5 sm:py-4 block font-medium text-zinc-800 dark:text-zinc-200 group"
          id="projects"
        >
          Active Projects{" "}
          <span className="opacity-0 group-hover:opacity-90 duration-150">
            #
          </span>
        </a>
        <div className="flex flex-col gap-6 md:gap-4">
          {projects.map((project, idx) => (
            <a
              href={project.link}
              target="_blank"
              key={idx}
              className="flex justify-between items-center gap-4 py-1 sm:py-3 px-3 -mx-3 group rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 duration-150"
            >
              <div className="flex flex-col no-underline flex-1">
                <div className="flex items-center gap-1.5 font-medium text-zinc-800 dark:text-zinc-200">
                  {project.name}
                  <span className="font-normal">
                    •{" "}
                    {project.date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })}
                  </span>
                  {project.archived && (
                    <div className="ml-1.5 opacity-90 px-1 text-sm bg-orange-200/50 dark:bg-orange-800/50 text-orange-600 dark:text-orange-400 ring-1 ring-orange-500/50 rounded-md min-w-[20px] flex justify-center items-center gap-1">
                      <ArchiveBoxIcon className="size-3" />
                      Archived
                    </div>
                  )}
                </div>
                <span className="text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </span>
              </div>
              <ArrowTopRightOnSquareIcon className="h-5 w-5 stroke-2 text-zinc-600 dark:text-zinc-400 opacity-0 group-hover:opacity-50 duration-150" />
            </a>
          ))}
        </div>
      </div>

      <div>
        <a
          href={"#repositories"}
          className="py-5 sm:py-4 block font-medium text-zinc-800 dark:text-zinc-200 group"
          id="repositories"
        >
          Public Repositories{" "}
          <span className="opacity-0 group-hover:opacity-90 duration-150">
            #
          </span>
        </a>

        <Repositories />
      </div>

      <div>
        <a
          href={"#more"}
          className="py-5 sm:py-4 block font-medium text-zinc-800 dark:text-zinc-200 group"
          id="more"
        >
          More{" "}
          <span className="opacity-0 group-hover:opacity-90 duration-150">
            #
          </span>
        </a>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2">
          Feel free to get in touch with me! You can reach me at{" "}
          <a
            href="mailto:contact@raulcarini.dev"
            className="underline-offset-2 underline font-medium text-zinc-700 hover:text-zinc-600 dark:text-zinc-300 dark:hover:text-zinc-400 duration-150"
          >
            contact@raulcarini.dev
          </a>
          .
        </p>
      </div>
    </div>
  );
}
