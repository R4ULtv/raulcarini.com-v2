export default function MdxLayout({ children }) {
  return (
    <article className="prose max-w-none prose-strong:text-zinc-800 dark:prose-strong:text-zinc-200 prose-img:rounded-md prose-a:underline prose-a:underline-offset-2 prose-a:text-zinc-600 dark:prose-a:text-zinc-400 dark:prose-invert prose-zinc mx-auto prose-headings:font-semibold dark:prose-headings:text-zinc-200 prose-headings:text-zinc-800 prose-p:text-zinc-600 dark:prose-p:text-zinc-400 prose-h1:text-3xl prose-h1:font-bold prose-h2:text-xl prose-h3:text-lg prose-img:shadow-lg prose-pre:shadow-lg">
      {children}
    </article>
  );
}
