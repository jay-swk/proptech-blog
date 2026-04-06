"use client";

interface TagFilterProps {
  tags: { tag: string; count: number }[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  onClearAll: () => void;
}

export function TagFilter({
  tags,
  selectedTags,
  onToggleTag,
  onClearAll,
}: TagFilterProps) {
  if (tags.length === 0) return null;

  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {tags.map(({ tag, count }) => {
        const isSelected = selectedTags.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => onToggleTag(tag)}
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              isSelected
                ? "bg-indigo-600 text-white dark:bg-indigo-500 dark:text-white"
                : "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900"
            }`}
          >
            <span>#{tag}</span>
            <span
              className={`text-xs ${
                isSelected
                  ? "text-indigo-200 dark:text-indigo-200"
                  : "text-zinc-400 dark:text-zinc-600"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
      {selectedTags.length > 0 && (
        <button
          onClick={onClearAll}
          className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          전체 해제
        </button>
      )}
    </div>
  );
}
