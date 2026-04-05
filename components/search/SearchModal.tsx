"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { PostMeta } from "@/lib/posts";
import { searchPosts } from "@/lib/search";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: PostMeta[];
}

export function SearchModal({ isOpen, onClose, posts }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const router = useRouter();

  // Debounce query
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Auto-focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      setQuery("");
      setDebouncedQuery("");
      setActiveIndex(-1);
    }
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  const results = debouncedQuery ? searchPosts(debouncedQuery, posts) : [];

  const navigateToPost = useCallback(
    (slug: string) => {
      router.push(`/blog/${slug}`);
      onClose();
    },
    [router, onClose],
  );

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(-1);
  }, [debouncedQuery]);

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const item = listRef.current.children[activeIndex] as HTMLElement | undefined;
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (results.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
      } else if (e.key === "Enter" && activeIndex >= 0) {
        e.preventDefault();
        navigateToPost(results[activeIndex].slug);
      }
    },
    [results, activeIndex, onClose, navigateToPost],
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
      role="dialog"
      aria-modal="true"
      aria-label="검색"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg mx-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden"
        onKeyDown={handleKeyDown}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 border-b border-zinc-200 dark:border-zinc-800">
          <svg
            className="w-5 h-5 text-zinc-400 dark:text-zinc-500 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="포스트 검색..."
            className="flex-1 py-3 text-sm bg-transparent text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none"
            aria-label="검색어 입력"
            aria-activedescendant={
              activeIndex >= 0 ? `search-result-${activeIndex}` : undefined
            }
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="search-results"
            aria-autocomplete="list"
          />
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">
            ESC
          </kbd>
        </div>

        {/* Results */}
        {debouncedQuery && (
          <ul
            ref={listRef}
            id="search-results"
            role="listbox"
            className="max-h-80 overflow-y-auto p-2"
          >
            {results.length > 0 ? (
              results.map((post, index) => {
                const { slug, frontmatter } = post;
                const { title, description, category, tags } = frontmatter;

                return (
                  <li
                    key={slug}
                    id={`search-result-${index}`}
                    role="option"
                    aria-selected={index === activeIndex}
                    className={`flex flex-col gap-1.5 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                      index === activeIndex
                        ? "bg-indigo-50 dark:bg-indigo-950"
                        : "hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    }`}
                    onClick={() => navigateToPost(slug)}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-1.5 py-0.5 rounded">
                        {category}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-1">
                      {title}
                    </h3>
                    {description && (
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                        {description}
                      </p>
                    )}
                    {tags && tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-medium text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950 px-1.5 py-0.5 rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })
            ) : (
              <li className="px-3 py-8 text-center text-sm text-zinc-400 dark:text-zinc-500">
                검색 결과가 없습니다
              </li>
            )}
          </ul>
        )}

        {/* Footer hint */}
        {debouncedQuery && results.length > 0 && (
          <div className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-400 dark:text-zinc-500 flex items-center gap-3">
            <span>
              <kbd className="px-1 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700 text-[10px]">
                ↑↓
              </kbd>{" "}
              이동
            </span>
            <span>
              <kbd className="px-1 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700 text-[10px]">
                Enter
              </kbd>{" "}
              선택
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
