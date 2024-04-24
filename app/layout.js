import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";

import "./globals.css";
import Link from "next/link";
import ThemeChanger from "@/components/ThemeChanger";

export const metadata = {
  title: "Raul Carini",
  description:
    "Full Stack Developer working on solo projects and freelancing, currently based in Milan, Italy",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="antialiased scroll-smooth"
      suppressHydrationWarning
    >
      <body className={GeistSans.className + " bg-zinc-100 dark:bg-zinc-900"}>
        <ThemeProvider attribute="class" enableSystem={false}>
          <div className="max-w-2xl my-12 px-6 mx-auto">
            <header className="mb-32 flex items-start justify-between">
              <div className="flex flex-col items-start">
                <Link
                  href={"/"}
                  className="text-base inline-block font-medium no-underline text-zinc-800 dark:text-zinc-200"
                >
                  Raul Carini
                </Link>
                <span className="text-base font-medium leading-none text-zinc-600 dark:text-zinc-400">
                  Full Stack Developer
                </span>
              </div>
              <ThemeChanger />
            </header>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
