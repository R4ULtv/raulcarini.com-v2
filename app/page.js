import Repositories from "@/components/Repositories";
import Link from "next/link";
import { getBlogPosts } from "@/app/blog/utils";
import {
  ArrowRightCircleIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { projects } from "@/components/utils/projects";
import { ArchiveBoxIcon, MegaphoneIcon } from "@heroicons/react/16/solid";
import Image from "next/image";

import dlynr from "@/public/assets/dlynr.png";
import dlynr2 from "@/public/assets/dlynr2.png";
import mont from "@/public/assets/mont.png";
import campfire from "@/public/assets/campfire.png";
import lake from "@/public/assets/lake.png";
import tree from "@/public/assets/tree.png";

import lake2 from "@/public/assets/lake2.png";
import city from "@/public/assets/city.png";
import sea from "@/public/assets/sea.png";

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
          e-commerce platform. Soon, more projects that I am building in secret
          will arrive.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-3">
          <div className="relative">
            <Image
              src={campfire}
              width={320}
              alt="Campfire"
              placeholder="blur"
              className="rounded-lg"
            />
          </div>
          <div className="relative sm:row-span-2 row-span-1">
            <Image
              src={dlynr}
              width={320}
              alt="Raul Carini"
              placeholder="blur"
              className="rounded-lg object-cover object-center absolute w-full h-full"
            />
          </div>
          <div className="relative">
            <Image
              src={mont}
              width={320}
              alt="Mountains"
              placeholder="blur"
              className="rounded-lg"
            />
          </div>
          <div className="relative row-span-2 col-span-1">
            <Image
              src={dlynr2}
              width={320}
              alt="Raul Carini"
              placeholder="blur"
              className="rounded-lg"
            />
          </div>
          <div className="relative row-span-2 col-span-1">
            <Image
              src={tree}
              width={320}
              alt="Raul Carini"
              placeholder="blur"
              className="rounded-lg"
            />
          </div>
          <div className="relative">
            <Image
              src={lake}
              width={320}
              alt="Lake"
              placeholder="blur"
              className="rounded-lg"
            />
          </div>
        </div>

        <p className="text-zinc-600 dark:text-zinc-400 mt-2">
          My true passion lies in crafting websites that solve problems. But
          there's more to me than code! When I'm not developing, music takes
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
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3">
          <div className="relative">
            <Image
              src={sea}
              width={320}
              alt="Sea view"
              placeholder="blur"
              className="rounded-lg"
            />
          </div>
          <div className="relative">
            <Image
              src={lake2}
              width={320}
              alt="Lake view"
              placeholder="blur"
              className="rounded-lg"
            />
          </div>
          <div className="relative col-span-2 sm:col-span-1">
            <Image
              src={city}
              width={640}
              alt="City with montains"
              placeholder="blur"
              className="rounded-lg"
            />
          </div>
        </div>
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
                    <p>
                      {post.metadata.title}{" "}
                      <span className="font-normal">
                        •{" "}
                        {new Date(post.metadata.createdAt).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "long" }
                        )}
                      </span>
                    </p>
                    {post.content === "" && (
                      <div className="shrink-0 ml-1.5 opacity-90 px-1 text-sm bg-blue-200/50 dark:bg-blue-800/50 text-blue-600 dark:text-blue-400 ring-1 ring-blue-500/50 rounded-md min-w-[20px] flex justify-center items-center gap-1">
                        <MegaphoneIcon className="size-3" />
                        Coming Soon
                      </div>
                    )}
                  </span>
                  <span className="text-zinc-600 dark:text-zinc-400">
                    {post.metadata.description}
                  </span>
                </div>
                <ArrowRightCircleIcon className="h-5 w-5 stroke-2 text-zinc-600 dark:text-zinc-400 opacity-0 group-hover:opacity-50 duration-150 hidden group-hover:block" />
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
                  <p>
                    {project.name}{" "}
                    <span className="font-normal">
                      •{" "}
                      {project.date.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                      })}
                    </span>
                  </p>
                  {project.archived && (
                    <div className="shrink-0 ml-1.5 opacity-90 px-1 text-sm bg-orange-200/50 dark:bg-orange-800/50 text-orange-600 dark:text-orange-400 ring-1 ring-orange-500/50 rounded-md min-w-[20px] flex justify-center items-center gap-1">
                      <ArchiveBoxIcon className="size-3" />
                      Archived
                    </div>
                  )}
                </div>
                <span className="text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </span>
              </div>
              <ArrowTopRightOnSquareIcon className="h-5 w-5 stroke-2 text-zinc-600 dark:text-zinc-400 opacity-0 group-hover:opacity-50 duration-150 hidden group-hover:block" />
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
