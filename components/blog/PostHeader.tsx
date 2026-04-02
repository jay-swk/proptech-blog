import type { PostFrontmatter } from "@/lib/posts";
import { Tag } from "@/components/ui/Tag";

interface PostHeaderProps {
  frontmatter: PostFrontmatter;
}

export function PostHeader({ frontmatter }: PostHeaderProps) {
  const { title, description, date, category, tags } = frontmatter;

  const formattedDate = new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="mb-10 pb-8 border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-1 rounded-md">
          {category}
        </span>
        <time className="text-sm text-zinc-400 dark:text-zinc-500">{formattedDate}</time>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 leading-snug mb-4">
        {title}
      </h1>
      <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
        {description}
      </p>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Tag key={tag} name={tag} size="md" />
          ))}
        </div>
      )}
    </header>
  );
}
