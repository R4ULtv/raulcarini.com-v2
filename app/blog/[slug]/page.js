import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getBlogPosts } from "@/app/blog/utils";
import { CustomMDX } from "@/components/mdx";
import PageViews from "@/components/PageViews";
import FormattedDate from "@/components/FormattedDate";

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
        <Suspense fallback={<span className="h-5 w-9"></span>}>
          <PageViews path={params.slug} />
        </Suspense>
      </div>

      <CustomMDX source={post.content} />
    </>
  );
}
