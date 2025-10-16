import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of projects I've built, ranging from web applications to learning platforms and developer tools.",
};

interface Project {
  title: string;
  description: string;
  url: string;
  icon?: string;
  tags?: string[];
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "UI Components",
    description:
      "A collection of reusable UI components built with React and Tailwind CSS.",
    url: "https://ui.raulcarini.dev/",
    icon: "https://ui.raulcarini.dev/favicon.ico",
    tags: ["React", "Tailwind CSS", "Components"],
    featured: true,
  },
  {
    title: "lazypr",
    description:
      "A tool to streamline your pull request workflow and make code reviews easier.",
    url: "https://lazypr.vercel.app/",
    icon: "https://lazypr.vercel.app/favicon.ico",
    tags: ["Next.js", "GitHub API", "Developer Tools"],
    featured: true,
  },
  {
    title: "Archive Space",
    description:
      "A personal digital archive for storing and organizing memories, thoughts, and collections.",
    url: "https://archive.raulcarini.dev/",
    icon: "https://archive.raulcarini.dev/favicon.ico",
    tags: ["Next.js", "Archive", "Cloudflare"],
    featured: true,
  },
  {
    title: "Learn The Web",
    description:
      "An interactive learning platform for web development fundamentals and modern practices.",
    url: "https://learn-the-web.vercel.app",
    icon: "https://learn-the-web.vercel.app/favicon.ico",
    tags: ["Education", "Next.js", "MDX"],
    featured: true,
  },
];

export default function ProjectsPage() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <div className="space-y-10 sm:space-y-16">
      <section id="projects">
        <a
          href={"#projects"}
          className="py-5 sm:py-4 block font-medium group after:content-['#'] after:ml-1 after:opacity-0 hover:after:opacity-90 after:transition-opacity after:duration-200 after:ease-out"
        >
          Projects
        </a>
        <p className="text-muted-foreground mb-6">
          A collection of projects I&apos;ve built, ranging from web
          applications to learning platforms and developer tools.
        </p>

        {featuredProjects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-medium text-muted-foreground mb-4">
              Featured
            </h2>
            <div className="flex flex-col gap-4">
              {featuredProjects.map((project) => (
                <a
                  key={project.title}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 py-3 px-3 -mx-3 group rounded-md hover:bg-muted/50 transition-colors duration-200 ease-out"
                >
                  {project.icon && (
                    <div className="flex-shrink-0 mt-1">
                      <Image
                        unoptimized
                        width={20}
                        height={20}
                        alt={`${project.title} Icon`}
                        src={project.icon}
                        className="rounded"
                      />
                    </div>
                  )}
                  <div className="flex-1 flex flex-col min-w-0">
                    <p className="font-medium">{project.title}</p>
                    <span className="text-muted-foreground text-sm">
                      {project.description}
                    </span>
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {project.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs h-5 px-1.5 border border-border"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <svg
                    className="flex-shrink-0 w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        )}

        {otherProjects.length > 0 && (
          <div>
            <h2 className="text-sm font-medium text-muted-foreground mb-4">
              Other Projects
            </h2>
            <div className="flex flex-col gap-4">
              {otherProjects.map((project) => (
                <a
                  key={project.title}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 py-3 px-3 -mx-3 group rounded-md hover:bg-muted/50 transition-colors duration-200 ease-out"
                >
                  {project.icon && (
                    <div className="flex-shrink-0 mt-1">
                      <Image
                        unoptimized
                        width={20}
                        height={20}
                        alt={`${project.title} Icon`}
                        src={project.icon}
                        className="rounded"
                      />
                    </div>
                  )}
                  <div className="flex-1 flex flex-col min-w-0">
                    <p className="font-medium">{project.title}</p>
                    <span className="text-muted-foreground text-sm">
                      {project.description}
                    </span>
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {project.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs h-5 px-1.5 border border-border"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <svg
                    className="flex-shrink-0 w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        )}

        {projects.length === 0 && (
          <p className="text-muted-foreground text-center py-8">
            No projects yet. Check back soon!
          </p>
        )}
      </section>

      <section id="contact">
        <a
          href={"#contact"}
          className="py-5 sm:py-4 block font-medium group after:content-['#'] after:ml-1 after:opacity-0 hover:after:opacity-90 after:transition-opacity after:duration-200 after:ease-out"
        >
          Work Together
        </a>
        <p className="text-muted-foreground">
          Interested in collaborating on a project? Feel free to reach out at{" "}
          <a
            href="mailto:contact@raulcarini.dev"
            className="hover:underline text-foreground"
          >
            contact@raulcarini.dev
          </a>
          .
        </p>
      </section>
    </div>
  );
}
