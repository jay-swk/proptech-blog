import Link from "next/link";

interface TagProps {
  name: string;
  asLink?: boolean;
  size?: "sm" | "md";
}

export function Tag({ name, asLink = true, size = "sm" }: TagProps) {
  const className =
    size === "sm"
      ? "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors"
      : "inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors";

  if (asLink) {
    return (
      <Link href={`/tags/${encodeURIComponent(name)}`} className={className}>
        #{name}
      </Link>
    );
  }
  return <span className={className}>#{name}</span>;
}
