import type { PostMeta } from "@/lib/posts";
import { PostCard } from "./PostCard";

interface PostGridProps {
  posts: PostMeta[];
}

export function PostGrid({ posts }: PostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="py-16 text-center text-zinc-500 dark:text-zinc-500">
        <p>포스트가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
