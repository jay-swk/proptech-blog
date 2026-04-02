import { getAllTags, getPostsByTag } from "@/lib/posts";
import { PostGrid } from "@/components/blog/PostGrid";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `#${decodeURIComponent(tag)} | Keunsik`,
  };
}

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag: encodeURIComponent(tag) }));
}

export default async function TagPage({ params }: Props) {
  const { tag: encodedTag } = await params;
  const tag = decodeURIComponent(encodedTag);
  const posts = getPostsByTag(tag);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <Link
        href="/tags"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-8"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        태그 목록
      </Link>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          <span className="text-indigo-600 dark:text-indigo-400">#{tag}</span>
        </h1>
        <p className="text-zinc-500 dark:text-zinc-500 text-sm">
          {posts.length}개의 포스트
        </p>
      </div>
      <PostGrid posts={posts} />
    </div>
  );
}
