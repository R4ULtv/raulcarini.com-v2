import { Link } from "next-view-transitions";

import { ExternalLink } from "@/components/ui/badges";
import { getBlogPosts } from "@/app/blog/utils";
import RowPost from "@/components/ui/RowPost";
import NewsLetterForm from "@/components/NewsLetterForm";
import Repositories from "@/components/Repositories";

import dlynr from "@/public/assets/dlynr.png";
import dlynr2 from "@/public/assets/dlynr2.png";
import mont from "@/public/assets/mont.png";
import campfire from "@/public/assets/campfire.png";
import lake from "@/public/assets/lake.png";
import tree from "@/public/assets/tree.png";

import lake2 from "@/public/assets/lake2.png";
import city from "@/public/assets/city.png";
import sea from "@/public/assets/sea.png";
import FullScreenImage from "@/components/FullScreenImage";
import GithubTable from "@/components/GithubTable";

export default function Home() {
  const posts = getBlogPosts();
  const projectPosts = posts.filter((post) => post.metadata.type === "project");
  const lastUpdate = posts
    .filter((post) => post.metadata.type === "update")
    .sort(
      (a, b) => new Date(b.metadata.createdAt) - new Date(a.metadata.createdAt),
    )[0];

  return (
    <div className="space-y-10 sm:space-y-16">
      <div>
        <a
          href={"#about"}
          className="py-5 sm:py-4 block font-medium text-zinc-800 dark:text-zinc-200 group"
          id="about"
        >
          About{" "}
          <span className="opacity-0 group-hover:opacity-90 transition-opacity ease-out">
            #
          </span>
        </a>
        <p className="text-zinc-600 dark:text-zinc-400">
          Hi! I'm a full-stack developer based in Milan, currently juggling
          projects and studies. On the professional side, I'm diving into
          exciting ventures like{" "}
          <ExternalLink
            href={"https://www.shrly.cc"}
            src={"/assets/icons/shortly.png"}
            alt={"shortly logo"}
            text={"Shortly"}
          />{" "}
          ,{" "}
          <ExternalLink
            href="https://colors.raulcarini.dev"
            src="https://colors.raulcarini.dev/favicon.ico"
            alt="colors icon"
            text="Tailwind CSS Colors"
          />{" "}
          and the{" "}
          <ExternalLink
            href="https://learn-the-web.vercel.app"
            src="https://learn-the-web.vercel.app/favicon.ico"
            alt="learn-the-web icon"
            text="Learn The Web"
          />{" "}
          a learning platform. Soon, more projects that I am building in secret
          will arrive.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-3">
          <div className="relative">
            <FullScreenImage
              src={campfire}
              width={320}
              alt="Campfire"
              placeholder="blur"
            />
          </div>
          <div className="relative sm:row-span-2 row-span-1">
            <FullScreenImage
              src={dlynr}
              width={320}
              alt="Raul Carini"
              placeholder="blur"
              className="object-cover object-center absolute w-full h-full"
            />
          </div>
          <div className="relative">
            <FullScreenImage
              src={mont}
              width={320}
              alt="Mountains"
              placeholder="blur"
            />
          </div>
          <div className="relative row-span-2 col-span-1">
            <FullScreenImage
              src={dlynr2}
              width={320}
              alt="Raul Carini"
              placeholder="blur"
            />
          </div>
          <div className="relative row-span-2 col-span-1">
            <FullScreenImage
              src={tree}
              width={320}
              alt="Raul Carini"
              placeholder="blur"
            />
          </div>
          <div className="relative">
            <FullScreenImage
              src={lake}
              width={320}
              alt="Lake"
              placeholder="blur"
            />
          </div>
        </div>

        <p className="text-zinc-600 dark:text-zinc-400 mt-2">
          My true passion lies in crafting websites that solve problems. But
          there's more to me than code! When I'm not developing, music takes
          center stage. I love producing tracks and experimenting with fresh
          sounds. If you are interested in my music check out on my{" "}
          <ExternalLink
            href={"https://open.spotify.com/artist/21DbatkhkYpxIpLfQ4LeUo"}
            src={"/assets/icons/spotify.png"}
            alt={"spotify logo"}
            text={"Spotify"}
          />{" "}
          profile.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3">
          <div className="relative">
            <FullScreenImage
              src={sea}
              width={320}
              alt="Sea view"
              placeholder="blur"
            />
          </div>
          <div className="relative">
            <FullScreenImage
              src={lake2}
              width={320}
              alt="Lake view"
              placeholder="blur"
            />
          </div>
          <div className="relative col-span-2 sm:col-span-1">
            <FullScreenImage
              src={city}
              width={640}
              alt="City with montains"
              placeholder="blur"
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
          <span className="opacity-0 group-hover:opacity-90 transition-opacity ease-out">
            #
          </span>
        </a>
        <div className="flex flex-col gap-6 md:gap-4">
          <RowPost post={lastUpdate} />
          {projectPosts
            .sort((a, b) => {
              if (
                new Date(a.metadata.createdAt) > new Date(b.metadata.createdAt)
              ) {
                return -1;
              }
              return 1;
            })
            .slice(0, 4)
            .map((post, idx) => (
              <RowPost key={idx} post={post} />
            ))}
          <div className="flex items-center justify-start">
            <Link
              href="/blog/categories"
              className="py-1 text-sm text-zinc-700 dark:text-zinc-300"
            >
              Load more blog posts...
            </Link>
          </div>
        </div>
      </div>

      <div>
        <a
          href={"#contributions"}
          className="py-5 sm:py-4 block font-medium text-zinc-800 dark:text-zinc-200 group"
          id="contributions"
        >
          Github Contributions{" "}
          <span className="opacity-0 group-hover:opacity-90 transition-opacity ease-out">
            #
          </span>
        </a>
        <GithubTable />
      </div>

      <div>
        <a
          href={"#repositories"}
          className="py-5 sm:py-4 block font-medium text-zinc-800 dark:text-zinc-200 group"
          id="repositories"
        >
          Public Repositories{" "}
          <span className="opacity-0 group-hover:opacity-90 transition-opacity ease-out">
            #
          </span>
        </a>

        <Repositories />
      </div>

      <div>
        <a
          href={"#newsletter"}
          className="py-5 sm:py-4 block font-medium text-zinc-800 dark:text-zinc-200 group"
          id="newsletter"
        >
          Newsletter{" "}
          <span className="opacity-0 group-hover:opacity-90 transition-opacity ease-out">
            #
          </span>
        </a>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2">
          If you want to stay updated on my latest projects and blog posts,
          subscribe to my newsletter! You will receive an email every time that
          there is a new post.
        </p>
        <NewsLetterForm />
      </div>

      <div>
        <a
          href={"#more"}
          className="py-5 sm:py-4 block font-medium text-zinc-800 dark:text-zinc-200 group"
          id="more"
        >
          More{" "}
          <span className="opacity-0 group-hover:opacity-90 transition-opacity ease-out">
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
