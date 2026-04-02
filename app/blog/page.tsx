import { getAllPosts, getAllTags } from "@/lib/posts";
import { PostGrid } from "@/components/blog/PostGrid";
import { Tag } from "@/components/ui/Tag";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "블로그 | Keunsik",
  description: "프롭테크 개발자의 기술 블로그",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">블로그</h1>
        <p className="text-zinc-500 dark:text-zinc-500 text-sm">
          총 {posts.length}개의 포스트
        </p>
      </div>

      {tags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {tags.map(({ tag, count }) => (
            <span key={tag} className="inline-flex items-center gap-1">
              <Tag name={tag} size="md" />
              <span className="text-xs text-zinc-400 dark:text-zinc-600">{count}</span>
            </span>
          ))}
        </div>
      )}

      <PostGrid posts={posts} />
    </div>
  );
}
