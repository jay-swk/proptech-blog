import { MDXRemote } from "next-mdx-remote/rsc";
import React from "react";
import { Callout } from "./Callout";
import { CodeBlock } from "./CodeBlock";
import { highlightCode } from "@/lib/highlight";

interface MDXRendererProps {
  source: string;
}

async function Pre({ children }: { children: React.ReactNode }) {
  // pre > code 구조에서 언어와 코드 문자열 추출
  const codeEl = React.Children.toArray(children).find(
    (child): child is React.ReactElement<{ className?: string; children?: string }> =>
      React.isValidElement(child) && (child as React.ReactElement).type === "code"
  );

  if (codeEl) {
    const lang = codeEl.props.className?.replace("language-", "") ?? "text";
    const code = typeof codeEl.props.children === "string" ? codeEl.props.children : "";
    const html = await highlightCode(code, lang);
    return <CodeBlock html={html} lang={lang} />;
  }

  // code 자식이 없는 예외 케이스 — 기본 pre 렌더
  return (
    <pre className="overflow-x-auto rounded-xl bg-zinc-900 dark:bg-zinc-950 p-4 text-sm leading-relaxed border border-zinc-700">
      {children}
    </pre>
  );
}

const components = {
  Callout,
  pre: Pre,
  code: ({ children, className }: { children: React.ReactNode; className?: string }) => {
    if (className) {
      // 블록 코드 (pre 안의 code) — Pre 컴포넌트가 처리하므로 여기선 그대로 전달
      return <code className={className}>{children}</code>;
    }
    // 인라인 코드
    return (
      <code className="px-1.5 py-0.5 rounded text-sm font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
        {children}
      </code>
    );
  },
};

export function MDXRenderer({ source }: MDXRendererProps) {
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline prose-code:before:content-none prose-code:after:content-none">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
