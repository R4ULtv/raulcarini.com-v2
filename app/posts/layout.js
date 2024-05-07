import BackToTop from "@/components/BackToTop";

export default function MdxLayout({ children }) {
  return (
    <>
      <article className="prose max-w-none prose-strong:text-zinc-800 dark:prose-strong:text-zinc-200 prose-img:rounded-md prose-a:underline prose-a:underline-offset-2 prose-a:text-zinc-700 dark:prose-a:text-zinc-300 dark:prose-invert prose-zinc mx-auto prose-headings:font-semibold dark:prose-headings:text-zinc-200 prose-headings:text-zinc-800 prose-p:text-zinc-600 dark:prose-p:text-zinc-400 prose-li:text-zinc-600 dark:prose-li:text-zinc-400 prose-h1:text-3xl prose-h1:font-bold prose-h2:text-xl prose-h3:text-lg prose-img:shadow-lg prose-pre:bg-transparent prose-figure:bg-zinc-800 dark:prose-figure:bg-black/50 prose-figcaption:px-3 prose-figcaption:py-2 prose-figcaption:border-b prose-figcaption:border-zinc-600 dark:prose-figcaption:border-zinc-800 prose-figcaption:text-zinc-400 prose-figure:rounded-md">
        {children}
      </article>
      <BackToTop />
    </>
  );
}
