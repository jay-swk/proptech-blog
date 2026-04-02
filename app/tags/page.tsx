import { getAllTags } from "@/lib/posts";
import { Tag } from "@/components/ui/Tag";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "태그 | Keunsik",
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">태그</h1>
        <p className="text-zinc-500 dark:text-zinc-500 text-sm">
          총 {tags.length}개의 태그
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        {tags.map(({ tag, count }) => (
          <div key={tag} className="flex items-center gap-1.5">
            <Tag name={tag} size="md" />
            <span className="text-sm text-zinc-400 dark:text-zinc-600">({count})</span>
          </div>
        ))}
      </div>
    </div>
  );
}
