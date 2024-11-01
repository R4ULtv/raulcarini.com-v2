import { notFound } from "next/navigation";
import { generateShortSlug, getBlogPosts } from "@/app/blog/utils";
import { CustomMDX } from "@/components/mdx";
import PageViews from "@/components/PageViews";
import FormattedDate from "@/components/utils/FormattedDate";
import AiAssistanceInfo from "@/components/ui/AiAssistanceInfo";
import ShareDialog from "@/components/ShareDialog";

export async function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }) {
  const post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  return {
    metadataBase: process.env.HOST_NAME,
    title: post.metadata.title + " - Raul Carini",
    description: post.metadata.description,
    keywords: post.metadata.keywords,
    openGraph: {
      title: post.metadata.title + " - Raul Carini",
      description: post.metadata.description,
      url: new URL(`${process.env.HOST_NAME}/posts/${params.slug}`),
      images: [
        {
          url: `${process.env.HOST_NAME}/api/dynamic-og?title=${post.metadata.title}&description=${post.metadata.description}`,
          width: 843,
          height: 441,
        },
      ],
    },
  };
}

export default function Blog({ params }) {
  const post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="prose max-w-none prose-hr:my-6 prose-strong:text-zinc-700 dark:prose-strong:text-zinc-300 prose-img:rounded-md prose-a:underline-offset-2 prose-a:underline prose-a:font-medium prose-a:text-zinc-700 dark:prose-a:text-zinc-300 dark:prose-invert prose-zinc mx-auto prose-headings:font-semibold dark:prose-headings:text-zinc-200 prose-headings:text-zinc-800 prose-p:text-zinc-600 dark:prose-p:text-zinc-400 prose-li:text-zinc-600 dark:prose-li:text-zinc-400 prose-h1:text-3xl prose-h1:font-bold prose-h2:text-xl prose-h3:text-lg prose-img:shadow-lg prose-pre:bg-transparent prose-figure:bg-zinc-800 dark:prose-figure:bg-black/50 prose-figcaption:px-3 prose-figcaption:py-2 prose-figcaption:border-b prose-figcaption:border-zinc-600 dark:prose-figcaption:border-zinc-800 prose-figcaption:text-zinc-400 prose-figure:rounded-md duration-150">
      <div className="flex items-center justify-between gap-1.5 mb-1">
        <div className="flex items-center gap-1.5">
          <h1 className="mb-0 font-bold ">{post.metadata.title}</h1>
          <AiAssistanceInfo />
        </div>
        <ShareDialog
          slug={
            post.metadata.shortSlug || generateShortSlug(post.metadata.title)
          }
        />
      </div>

      <div className="flex items-center justify-between mb-1.5">
        <FormattedDate date={new Date(post.metadata.createdAt)} />
        {post.content !== "" &&
          new Date(post.metadata.createdAt) < new Date() && (
            <PageViews path={params.slug} />
          )}
      </div>

      {post.content !== "" ? (
        <CustomMDX source={post.content} />
      ) : (
        <div className="my-32 flex flex-col items-center justify-center gap-1.5">
          <div className="text-3xl font-black tracking-wide bg-gradient-to-b from-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            Coming Soon
          </div>
          <div className="max-w-lg text-center mx-auto">
            This article still needs to be completed, just a little more to go
            and you will be able to read it.
          </div>
        </div>
      )}
    </article>
  );
}
