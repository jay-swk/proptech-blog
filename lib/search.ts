import type { PostMeta } from "./posts";

function normalize(text: string): string {
  return text.toLowerCase().trim();
}

function postToSearchableText(post: PostMeta): string {
  const { title, description, category, tags } = post.frontmatter;
  return normalize(
    [title, description, category, ...(tags ?? [])].join(" ")
  );
}

export function searchPosts(query: string, posts: PostMeta[]): PostMeta[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const terms = trimmed.split(/\s+/).map(normalize);

  return posts.filter((post) => {
    const text = postToSearchableText(post);
    return terms.every((term) => text.includes(term));
  });
}
