interface CodeBlockProps {
  html: string;
  lang?: string;
}

export function CodeBlock({ html, lang }: CodeBlockProps) {
  return (
    <div className="relative my-6 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700">
      {lang && (
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
          <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">{lang}</span>
        </div>
      )}
      <div
        className="[&>.shiki]:m-0 [&>.shiki]:rounded-none [&>.shiki]:border-0 [&>.shiki]:text-sm [&>.shiki]:p-4 [&>.shiki]:overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
