import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { createElement } from "react";
import { Link } from "next-view-transitions";
import { YouTubeEmbed } from "@next/third-parties/google";
import { Tweet } from "react-tweet";

import remarkGfm from "remark-gfm";
import { codeToHtml } from "shiki/bundle/web";
import { CopyToClipboard } from "@/components/ui/CopyToClipboard";
import { TwitterBadge } from "@/components/ui/badges";

function CustomTweet(props) {
  const components = {
    AvatarImg: (props) => <Image {...props} className="my-0" />,
    MediaImg: (props) => <Image {...props} fill className="my-0" />,
  };

  return (
    <div className="flex justify-center">
      <Tweet {...props} components={components} />
    </div>
  );
}

function CustomYoutubeEmbed(props) {
  return (
    <div className="rounded-md w-full aspect-video overflow-hidden my-8">
      <YouTubeEmbed {...props} />
    </div>
  );
}

function CustomImage(props) {
  return <Image {...props} />;
}

function CustomLink(props) {
  let href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

export function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level) {
  const Heading = ({ children }) => {
    let slug = slugify(children);
    return createElement(
      `h${level}`,
      { id: slug },
      [
        createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

async function CustomCode({ language, code }) {
  const html = await codeToHtml(code, {
    lang: language,
    themes: { dark: "vitesse-dark", light: "vitesse-light" },
  });

  return (
    <div className="relative">
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <CopyToClipboard code={code} />
    </div>
  );
}

export function CustomMDX(props) {
  const components = {
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    Image: CustomImage,
    YouTubeEmbed: CustomYoutubeEmbed,
    Tweet: CustomTweet,
    TwitterBadge: TwitterBadge,
    a: CustomLink,
    pre: (props) => {
      return (
        <CustomCode
          language={props.children.props.className.replace("language-", "")}
          code={props.children.props.children.trim()}
        />
      );
    },
    code: (props) => (
      <code className="bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 rounded-sm text-zinc-700 dark:text-zinc-300">
        {props.children}
      </code>
    ),
    table: (props) => (
      <table className="table-auto prose-td:text-zinc-700 dark:prose-td:text-zinc-300">
        {props.children}
      </table>
    ),
  };

  return (
    <MDXRemote
      {...props}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
