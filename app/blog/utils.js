import path from "path";
import fs from "fs";
import { slugify } from "@/components/mdx";

function parseFrontmatter(fileContent) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);
  if (!match) {
    return { metadata: {}, content: fileContent };
  }
  let frontMatterBlock = match[1];
  let content = fileContent.replace(frontmatterRegex, "").trim();
  let frontMatterLines = frontMatterBlock.trim().split("\n");
  let metadata = {};

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1");
    metadata[key.trim()] = value;
  });

  return { metadata: metadata, content };
}

function getMDXFiles(dir) {
  return fs
    .readdirSync(dir)
    .filter(
      (file) => path.extname(file) === ".mdx" || path.extname(file) === ".md",
    );
}

function readMDXFile(filePath) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getHeadings(content) {
  let headingRegex = /#{1,6}\s*(.*)/g;
  let match;
  let headings = [];

  while ((match = headingRegex.exec(content)) !== null) {
    let level = match[0].split(" ")[0].length;
    headings.push({ level, text: match[1], id: slugify(match[1]) });
  }

  return headings;
}

function getMDXData(dir) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));
    const headings = getHeadings(content);

    return {
      metadata,
      slug,
      content,
      headings,
    };
  });
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), "app", "blog", "posts"));
}

export function generateShortSlug(string) {
  return string
    .toLowerCase()
    .replace(/[aeiou]/g, "")
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 6);
}
