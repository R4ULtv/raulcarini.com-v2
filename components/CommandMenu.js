"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  BeakerIcon,
  BriefcaseIcon,
  DocumentMagnifyingGlassIcon,
  DocumentTextIcon,
  HomeIcon,
  MapIcon,
  MoonIcon,
  SunIcon,
  UserGroupIcon,
} from "@heroicons/react/16/solid";
import { useTransitionRouter } from "next-view-transitions";
import { useTheme } from "next-themes";
import { lang } from "@/components/Repositories";

const DATE_FORMAT_OPTIONS = {
  year: "numeric",
  month: "long",
};

export default function CommandMenu({ posts, repos }) {
  const router = useTransitionRouter();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("Home");

  const handleChangePage = useCallback(
    (slug) => {
      setOpen(false);
      router.push(slug);
    },
    [router],
  );

  const handleKeyDown = useCallback(
    (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "L") {
        e.preventDefault();
        setTheme(theme === "dark" ? "light" : "dark");
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "F") {
        e.preventDefault();
        setOpen(true);
        setCategory("Blog");
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "G") {
        e.preventDefault();
        setOpen(true);
        setCategory("Repos");
      }
      if (e.key === "ArrowLeft" && category !== "Home") {
        e.preventDefault();
        setCategory("Home");
      }
    },
    [theme, setTheme, category, setCategory],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const groupedPosts = useMemo(() => {
    const grouped = posts.reduce((acc, post) => {
      const category = post.metadata.type;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(post);
      return acc;
    }, {});

    Object.keys(grouped).forEach((category) => {
      grouped[category].sort(
        (a, b) =>
          new Date(b.metadata.createdAt) - new Date(a.metadata.createdAt),
      );
    });

    return grouped;
  }, [posts]);

  const languageColors = useMemo(() => {
    return repos.reduce((acc, repo) => {
      if (!acc[repo.language]) {
        acc[repo.language] = lang.find((l) => l.name === repo.language)?.color;
      }
      return acc;
    }, {});
  }, [repos]);

  const renderPost = useCallback(
    (post, icon) => (
      <CommandItem
        key={post.slug}
        onSelect={() => handleChangePage(`/blog/${post.slug}`)}
      >
        {icon}
        <span>{post.metadata.title}</span>
        <span className="text-xs text-zinc-600 dark:text-zinc-400">
          {new Date(post.metadata.createdAt).toLocaleDateString(
            "en-US",
            DATE_FORMAT_OPTIONS,
          )}
        </span>
      </CommandItem>
    ),
    [handleChangePage],
  );

  return (
    <>
      <button
        className="flex justify-center items-center gap-1.5 text-xs"
        onClick={() => setOpen((open) => !open)}
      >
        <span className="px-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 tracking-widest ring-1 ring-zinc-500 rounded-md min-w-[20px] h-5 flex justify-center items-center">
          ⌘K
        </span>
      </button>

      <CommandDialog
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
          if (!open) setCategory("Home");
        }}
        className="border-zinc-200 dark:border-zinc-800"
      >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {category === "Home" && (
            <>
              <CommandGroup heading="Suggestions">
                <CommandItem onSelect={() => handleChangePage("/")}>
                  <HomeIcon />
                  <span>Home</span>
                </CommandItem>
                <CommandItem
                  onSelect={() => handleChangePage("/blog/categories")}
                >
                  <DocumentTextIcon />
                  <span>Blog Page</span>
                </CommandItem>
                <CommandItem disabled>
                  <BeakerIcon />
                  <span>Projects Page</span>
                </CommandItem>
              </CommandGroup>

              <CommandSeparator />

              <CommandGroup heading="Works">
                <CommandItem onSelect={() => setCategory("Blog")}>
                  <DocumentMagnifyingGlassIcon />
                  <span>Blog Posts</span>
                  <CommandShortcut>⌘ ⇧ F</CommandShortcut>
                </CommandItem>
                <CommandItem onSelect={() => setCategory("Repos")}>
                  <MapIcon />
                  <span>Repositories</span>
                  <CommandShortcut>⌘ ⇧ G</CommandShortcut>
                </CommandItem>
                <CommandItem disabled>
                  <BriefcaseIcon />
                  <span>Projects</span>
                </CommandItem>
              </CommandGroup>

              <CommandSeparator />

              <CommandGroup heading="Utils">
                <CommandItem
                  onSelect={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "light" ? (
                    <SunIcon className="size-4 group-hover:scale-110 duration-150" />
                  ) : (
                    <MoonIcon className="size-4 group-hover:scale-110 duration-150" />
                  )}
                  <span>Change Theme</span>
                  <CommandShortcut>⌘ ⇧ L</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </>
          )}
          {category === "Blog" && (
            <>
              <CommandGroup heading="Projects">
                {groupedPosts["project"]?.map((post) =>
                  renderPost(post, <BriefcaseIcon />),
                )}
              </CommandGroup>

              <CommandSeparator />

              <CommandGroup heading="Articles">
                {groupedPosts["article"]?.map((post) =>
                  renderPost(post, <DocumentTextIcon />),
                )}
              </CommandGroup>

              <CommandSeparator />

              <CommandGroup heading="Updates">
                {groupedPosts["update"]?.map((post) =>
                  renderPost(post, <UserGroupIcon />),
                )}
              </CommandGroup>
            </>
          )}

          {category === "Repos" && (
            <>
              <CommandGroup heading="Repositories">
                {repos.map((repo) => (
                  <CommandItem
                    key={repo.id}
                    onSelect={() => window.open(repo.html_url, "_blank")}
                  >
                    <div className="relative flex h-2 w-2">
                      <span
                        className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                        style={{
                          backgroundColor: languageColors[repo.language],
                        }}
                      ></span>
                      <span
                        className="relative inline-flex rounded-full h-2 w-2 opacity-90"
                        style={{
                          backgroundColor: languageColors[repo.language],
                        }}
                      ></span>
                    </div>
                    <span>{repo.name}</span>
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">
                      {new Date(repo.created_at).toLocaleDateString(
                        "en-US",
                        DATE_FORMAT_OPTIONS,
                      )}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
        </CommandList>

        <div className="w-full text-sm px-3 py-1.5 border-t border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCategory("Home")}
                className="px-1 text-xs bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 ring-1 ring-zinc-500 rounded flex justify-center items-center"
              >
                Home
              </button>
              {category !== "Home" && (
                <span className="px-1 text-xs bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 ring-1 ring-zinc-500 rounded flex justify-center items-center">
                  {category}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 select-none">
              <span className="text-xs font-bold">Open/Use</span>
              <span className="px-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 ring-1 ring-zinc-500 rounded-md w-5 h-5 flex justify-center items-center">
                ↵
              </span>
            </div>
          </div>
        </div>
      </CommandDialog>
    </>
  );
}
