import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  cover?: string;
  published: boolean;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
}

export interface PostMeta {
  slug: string;
  frontmatter: PostFrontmatter;
}

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function getPostFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
}

export function getAllPosts(): PostMeta[] {
  const files = getPostFiles();
  const posts = files
    .map((filename) => {
      const slug = filename.replace(/\.(mdx|md)$/, "");
      const filePath = path.join(POSTS_DIR, filename);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        frontmatter: data as PostFrontmatter,
      };
    })
    .filter((p) => p.frontmatter.published !== false)
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const mdPath = path.join(POSTS_DIR, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;

  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    frontmatter: data as PostFrontmatter,
    content,
  };
}

export function getAllTags(): { tag: string; count: number }[] {
  const posts = getAllPosts();
  const tagMap = new Map<string, number>();

  posts.forEach((post) => {
    (post.frontmatter.tags ?? []).forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1);
    });
  });

  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((p) => (p.frontmatter.tags ?? []).includes(tag));
}
