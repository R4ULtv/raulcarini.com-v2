import { ImageResponse } from "next/og";
export const runtime = "edge";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Raul Carini";
  const description = searchParams.get("description") || "Full-Stack Developer";
  const theme = searchParams.get("theme") || "light";

  const fontData = await fetch(
    new URL("/assets/Geist-Black.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        tw={
          "h-full w-full flex flex-col justify-center items-center p-14 " +
          (theme === "light" ? "bg-zinc-100" : "bg-zinc-900")
        }
      >
        <div
          tw={
            "flex absolute top-10 right-10 " +
            (theme === "light" ? "text-zinc-800" : "text-zinc-200")
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <span
          tw={
            "text-center text-7xl " +
            (theme === "light" ? "text-zinc-800" : "text-zinc-200")
          }
        >
          {title}
        </span>
        <span
          tw={
            "mt-6 text-center text-4xl " +
            (theme === "light" ? "text-zinc-700" : "text-zinc-300")
          }
        >
          {description}
        </span>
      </div>
    ),
    {
      width: 843,
      height: 441,
      fonts: [
        {
          name: "GeistVF",
          data: fontData,
          style: "normal",
        },
      ],
    },
  );
}
