import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getBlogPosts } from "@/app/blog/utils";
import { CustomMDX } from "@/components/mdx";
import PageViews from "@/components/PageViews";
import FormattedDate from "@/components/utils/FormattedDate";

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
    openGraph: {
      title: post.metadata.title + " - Raul Carini",
      description: post.metadata.description,
      url: new URL(`${process.env.HOST_NAME}/posts/shortly`),
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
    <>
      <h1 className="mb-1 font-bold">{post.metadata.title}</h1>

      <div className="flex items-center justify-between mb-1.5">
        <FormattedDate date={new Date(post.metadata.createdAt)} />
        {post.content !== "" &&
          new Date(post.metadata.createdAt) < new Date() && (
            <Suspense fallback={<span className="h-5 w-9"></span>}>
              <PageViews path={params.slug} />
            </Suspense>
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
    </>
  );
}
