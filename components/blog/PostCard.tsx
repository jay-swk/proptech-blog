import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { Tag } from "@/components/ui/Tag";

interface PostCardProps {
  post: PostMeta;
}

export function PostCard({ post }: PostCardProps) {
  const { slug, frontmatter } = post;
  const { title, description, date, category, tags } = frontmatter;

  const formattedDate = new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="group flex flex-col gap-3 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-sm transition-all">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded">
          {category}
        </span>
        <time className="text-xs text-zinc-400 dark:text-zinc-500">{formattedDate}</time>
      </div>
      <Link href={`/blog/${slug}`} className="block">
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
          {title}
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
          {description}
        </p>
      </Link>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-auto pt-1">
          {tags.slice(0, 4).map((tag) => (
            <Tag key={tag} name={tag} />
          ))}
        </div>
      )}
    </article>
  );
}
