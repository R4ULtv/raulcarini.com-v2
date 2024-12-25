import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const lang = [
  {
    name: "JavaScript",
    color: "#f1e05a",
  },
  {
    name: "Python",
    color: "#3572b0",
  },
  {
    name: "C++",
    color: "#f34b7d",
  },
  {
    name: "Ruby",
    color: "#701516",
  },
  {
    name: "TypeScript",
    color: "#2b7489",
  },
  {
    name: "MDX",
    color: "#fcb32c",
  },
];