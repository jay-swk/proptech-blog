"use client";

import { useState } from "react";
import type { PostMeta } from "@/lib/posts";
import { TagFilter } from "./TagFilter";
import { PostGrid } from "./PostGrid";

interface BlogContentProps {
  posts: PostMeta[];
  tags: { tag: string; count: number }[];
}

export function BlogContent({ posts, tags }: BlogContentProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleToggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleClearAll = () => {
    setSelectedTags([]);
  };

  const filteredPosts =
    selectedTags.length === 0
      ? posts
      : posts.filter((post) =>
          post.frontmatter.tags?.some((tag) => selectedTags.includes(tag))
        );

  const isFiltering = selectedTags.length > 0;

  return (
    <>
      <TagFilter
        tags={tags}
        selectedTags={selectedTags}
        onToggleTag={handleToggleTag}
        onClearAll={handleClearAll}
      />

      {isFiltering && (
        <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-4">
          {filteredPosts.length}개의 포스트
        </p>
      )}

      {filteredPosts.length === 0 && isFiltering ? (
        <div className="py-16 text-center text-zinc-500 dark:text-zinc-500">
          <p>해당 태그의 포스트가 없습니다.</p>
        </div>
      ) : (
        <PostGrid posts={filteredPosts} />
      )}
    </>
  );
}
