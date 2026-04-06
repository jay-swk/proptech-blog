"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import type { PostMeta } from "@/lib/posts";
import { TagFilter } from "./TagFilter";
import { PostGrid } from "./PostGrid";

interface BlogContentProps {
  posts: PostMeta[];
  tags: { tag: string; count: number }[];
}

function parseTagsFromURL(): string[] {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("tags");
  return raw ? raw.split(",").filter(Boolean) : [];
}

function updateURL(tags: string[]) {
  const url = new URL(window.location.href);
  if (tags.length > 0) {
    url.searchParams.set("tags", tags.join(","));
  } else {
    url.searchParams.delete("tags");
  }
  window.history.pushState({}, "", url.toString());
}

export function BlogContent({ posts, tags }: BlogContentProps) {
  const searchParams = useSearchParams();
  const initialTags = searchParams.get("tags");

  const [selectedTags, setSelectedTags] = useState<string[]>(() =>
    initialTags ? initialTags.split(",").filter(Boolean) : []
  );

  // 브라우저 뒤로가기/앞으로가기 시 URL에서 상태 복원
  useEffect(() => {
    const handlePopState = () => {
      setSelectedTags(parseTagsFromURL());
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleToggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) => {
      const next = prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag];
      updateURL(next);
      return next;
    });
  }, []);

  const handleClearAll = useCallback(() => {
    setSelectedTags([]);
    updateURL([]);
  }, []);

  const filteredPosts =
    selectedTags.length === 0
      ? posts
      : posts.filter((post) =>
          (post.frontmatter.tags ?? []).some((tag) => selectedTags.includes(tag))
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
