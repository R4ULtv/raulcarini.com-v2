"use client";

import {
  BeakerIcon,
  ChartPieIcon,
  DocumentMagnifyingGlassIcon,
  HomeIcon,
  MapIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { projects } from "@/components/utils/projects";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Transition,
} from "@headlessui/react";
import { useTheme } from "next-themes";

const homePage = [
  {
    title: "Home",
    slug: "/",
    icon: <HomeIcon className="size-4" />,
  },
  {
    title: "Stats",
    slug: "stats",
    icon: <ChartPieIcon className="size-4" />,
  },
];

export default function CommandMenu({ posts, repos }) {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState("home");
  const router = useRouter();

  const changeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const down = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((open) => !open);
        if (open) {
          setPage("home");
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "f") {
        e.preventDefault();
        setPage("blog");
        setOpen(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "L") {
        e.preventDefault();
        changeTheme();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [theme, setTheme]);

  const handleSubmitPage = (slug) => {
    setOpen(false);
    if (page === "home") {
      router.push(`/${slug}`);
    }
  };

  const handleSubmitBlog = (slug) => {
    setOpen(false);
    router.push(`/blog/${slug}`);
  };

  const handleSubmit = (slug) => {
    setOpen(false);
    router.push(slug);
  };

  return (
    <>
      <button
        className="flex justify-center items-center gap-1.5 text-xs"
        onClick={() => setOpen((open) => !open)}
      >
        <span className="px-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 ring-1 ring-zinc-500 rounded-md min-w-[20px] h-5 flex justify-center items-center">
          ⌘K
        </span>
      </button>

      <Dialog
        open={open}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={setOpen}
        onKeyDown={(e) => {
          if (e.key === "Escape" || (e.key === "Tab" && e.shiftKey)) {
            e.preventDefault();
            if (page === "home") {
              setOpen(false);
            }
            setPage("home");
          }
        }}
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-zinc-900/50 transition duration-150 ease-out data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="max-w-xl w-full rounded-lg overflow-y-auto bg-zinc-100/95 dark:bg-zinc-900/95 backdrop-blur-xl ring-zinc-200 dark:ring-zinc-800 ring-2 shadow-2xl shadow-zinc-900/50 outline-none transition duration-150 ease-out data-[closed]:opacity-0 data-[closed]:scale-90"
            >
              <Command
                label="Global Command Menu"
                className="outline-none"
                loop
              >
                <Command.Input
                  className="w-full text-sm bg-transparent font-semibold outline-none py-3 px-4 border-b-2 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-700 dark:placeholder:text-zinc-300"
                  placeholder="Search..."
                  data-headlessui-state="autofocus"
                  data-autofocus
                />
                <Command.List className="overflow-y-auto command-menu-list py-2 max-h-96 [&_div[cmdk-group]]:px-2 [&_div[cmdk-group-heading]]:mb-2 [&_div[cmdk-group-heading]]:text-sm [&_div[cmdk-group-heading]]:font-semibold [&_div[cmdk-group-heading]]:text-zinc-400">
                  <Command.Empty className="py-2 ml-3 my-1 text-sm">
                    No results found.
                  </Command.Empty>
                  {page === "home" && (
                    <>
                      <Command.Group heading="Suggestions" label="Suggestions">
                        {homePage.map((item) => (
                          <Command.Item
                            onSelect={() => handleSubmitPage(item.slug)}
                            key={item.slug}
                            className="flex justify-between items-center rounded-md px-2 cursor-pointer select-none text-zinc-950 dark:text-zinc-50 data-[selected=true]:bg-zinc-800/5 dark:data-[selected=true]:bg-zinc-200/5"
                          >
                            <div className="flex items-center gap-2 py-2 my-1 text-sm">
                              <div className="p-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 ring-1 ring-zinc-500 rounded-md">
                                {item.icon}
                              </div>
                              {item.title}
                            </div>
                          </Command.Item>
                        ))}
                      </Command.Group>

                      <Command.Separator className="h-0.5 my-2 bg-zinc-200 dark:bg-zinc-800" />

                      <Command.Group heading="Search" label="Search">
                        <Command.Item
                          onSelect={() => setPage("blog")}
                          className="flex justify-between items-center rounded-md px-2 cursor-pointer select-none data-[selected=true]:bg-zinc-800/5 dark:data-[selected=true]:bg-zinc-200/5"
                        >
                          <div className="flex items-center gap-2 py-2 my-1 text-sm">
                            <div className="p-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 ring-1 ring-zinc-500 rounded-md">
                              <DocumentMagnifyingGlassIcon className="size-4" />
                            </div>
                            Blog Posts
                          </div>
                          <div className="flex justify-center items-center gap-1.5 text-xs">
                            <span className="px-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 ring-1 ring-zinc-500 rounded-md min-w-[20px] h-5 flex justify-center items-center">
                              ⌘
                            </span>
                            <span className="px-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 ring-1 ring-zinc-500 rounded-md min-w-[20px] h-5 flex justify-center items-center">
                              F
                            </span>
                          </div>
                        </Command.Item>
                        <Command.Item
                          onSelect={() => setPage("repositories")}
                          className="flex justify-between items-center rounded-md px-2 cursor-pointer select-none data-[selected=true]:bg-zinc-800/5 dark:data-[selected=true]:bg-zinc-200/5"
                        >
                          <div className="flex items-center gap-2 py-2 my-1 text-sm">
                            <div className="p-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 ring-1 ring-zinc-500 rounded-md">
                              <MapIcon className="size-4" />
                            </div>
                            Public Repositories
                          </div>
                        </Command.Item>
                        <Command.Item
                          onSelect={() => setPage("projects")}
                          className="flex justify-between items-center rounded-md px-2 cursor-pointer select-none data-[selected=true]:bg-zinc-800/5 dark:data-[selected=true]:bg-zinc-200/5"
                        >
                          <div className="flex items-center gap-2 py-2 my-1 text-sm">
                            <div className="p-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 ring-1 ring-zinc-500 rounded-md">
                              <BeakerIcon className="size-4" />
                            </div>
                            Active Projects
                          </div>
                        </Command.Item>
                      </Command.Group>

                      <Command.Separator className="h-0.5 my-2 bg-zinc-200 dark:bg-zinc-800" />

                      <Command.Group heading="Utility" label="Utility">
                        <Command.Item
                          onSelect={() => changeTheme()}
                          className="group flex justify-between items-center rounded-md px-2 cursor-pointer select-none data-[selected=true]:bg-zinc-800/5 dark:data-[selected=true]:bg-zinc-200/5"
                        >
                          <div className="flex items-center gap-2 py-2 my-1 text-sm">
                            <div className="p-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 ring-1 ring-zinc-500 rounded-md">
                              {theme === "light" ? (
                                <SunIcon className="size-4 group-hover:scale-110 duration-150" />
                              ) : (
                                <MoonIcon className="size-4 group-hover:scale-110 duration-150" />
                              )}
                            </div>
                            Change Theme
                          </div>
                          <div className="flex justify-center items-center gap-1.5 text-xs">
                            <span className="px-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 ring-1 ring-zinc-500 rounded-md min-w-[20px] h-5 flex justify-center items-center">
                              ⌘
                            </span>
                            <span className="px-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 ring-1 ring-zinc-500 rounded-md min-w-[20px] h-5 flex justify-center items-center">
                              ⇧
                            </span>
                            <span className="px-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 ring-1 ring-zinc-500 rounded-md min-w-[20px] h-5 flex justify-center items-center">
                              L
                            </span>
                          </div>
                        </Command.Item>
                      </Command.Group>
                    </>
                  )}

                  {page === "blog" && (
                    <Command.Group label="Blog Posts">
                      {posts
                        .sort((a, b) => {
                          if (
                            new Date(a.metadata.createdAt) >
                            new Date(b.metadata.createdAt)
                          ) {
                            return -1;
                          }
                          return 1;
                        })
                        .map((item) => (
                          <Command.Item
                            onSelect={() => handleSubmitBlog(item.slug)}
                            key={item.slug}
                            value={item.slug}
                            className="flex flex-col items-start rounded-md px-2 cursor-pointer select-none py-2 my-1 data-[selected=true]:bg-zinc-800/5 dark:data-[selected=true]:bg-zinc-200/5"
                          >
                            <div className="flex items-center gap-1 text-sm">
                              {item.metadata.title}
                              <span className="font-normal">
                                •{" "}
                                {new Date(
                                  item.metadata.createdAt
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                })}
                              </span>
                            </div>
                            <div className="text-xs text-zinc-700 dark:text-zinc-300">
                              {item.metadata.description}
                            </div>
                          </Command.Item>
                        ))}
                    </Command.Group>
                  )}

                  {page === "repositories" && (
                    <Command.Group label="Public Repositories">
                      {repos.map((item) => (
                        <Command.Item
                          onSelect={() => handleSubmit(item.html_url)}
                          key={item.name}
                          value={item.name}
                          className="flex flex-col items-start rounded-md px-2 cursor-pointer select-none py-2 my-1 data-[selected=true]:bg-zinc-800/5 dark:data-[selected=true]:bg-zinc-200/5"
                        >
                          <div className="flex items-center gap-1 text-sm">
                            {item.name}
                            <span className="font-normal">
                              •{" "}
                              {new Date(item.created_at).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                }
                              )}
                            </span>
                            {item.archived && (
                              <div className="ml-1.5 opacity-90 px-1 text-xs bg-orange-200/50 dark:bg-orange-800/50 text-orange-600 dark:text-orange-400 ring-1 ring-orange-500/50 rounded-md min-w-[20px] flex justify-center items-center">
                                Archived
                              </div>
                            )}
                          </div>
                          <div className="text-xs text-zinc-700 dark:text-zinc-300">
                            {item.description
                              ? item.description
                              : "No description."}
                          </div>
                        </Command.Item>
                      ))}
                    </Command.Group>
                  )}

                  {page === "projects" && (
                    <Command.Group label="Active Projects">
                      {projects.map((item) => (
                        <Command.Item
                          onSelect={() => handleSubmit(item.link)}
                          key={item.name}
                          value={item.name}
                          className="flex flex-col items-start rounded-md px-2 cursor-pointer select-none py-2 my-1 data-[selected=true]:bg-zinc-800/5 dark:data-[selected=true]:bg-zinc-200/5"
                        >
                          <div className="flex items-center gap-1 text-sm">
                            {item.name}
                            <span className="font-normal">
                              •{" "}
                              {new Date(item.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                              })}
                            </span>
                            {item.archived && (
                              <div className="ml-1.5 opacity-90 px-1 text-xs bg-orange-200/50 dark:bg-orange-800/50 text-orange-600 dark:text-orange-400 ring-1 ring-orange-500/50 rounded-md min-w-[20px] flex justify-center items-center">
                                Archived
                              </div>
                            )}
                          </div>
                          <div className="text-xs text-zinc-700 dark:text-zinc-300">
                            {item.description
                              ? item.description
                              : "No description."}
                          </div>
                        </Command.Item>
                      ))}
                    </Command.Group>
                  )}
                </Command.List>
                <div className="w-full text-sm px-3 py-2 border-t-2 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="px-1 text-xs bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 ring-1 ring-zinc-500 rounded flex justify-center items-center">
                        Home
                      </span>
                      <Transition show={page !== "home"}>
                        <span className="px-1 text-xs bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 ring-1 ring-zinc-500 rounded flex justify-center items-center transition ease-in-out duration-100 data-[closed]:opacity-0 data-[enter]:data-[closed]:translate-x-full data-[leave]:data-[closed]:translate-x-full">
                          {page.charAt(0).toUpperCase() + page.slice(1)}
                        </span>
                      </Transition>
                    </div>
                    <div className="flex items-center gap-1.5 select-none">
                      <span className="text-xs font-bold">Open Page</span>
                      <span className="px-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 ring-1 ring-zinc-500 rounded-md w-5 h-5 flex justify-center items-center">
                        ↵
                      </span>
                    </div>
                  </div>
                </div>
              </Command>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
