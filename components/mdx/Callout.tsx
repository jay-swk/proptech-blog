interface CalloutProps {
  type?: "info" | "warning" | "tip" | "danger";
  children: React.ReactNode;
}

const styles = {
  info: "bg-blue-50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800 text-blue-900 dark:text-blue-100",
  warning: "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-100",
  tip: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100",
  danger: "bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-800 text-red-900 dark:text-red-100",
};

const icons = {
  info: "ℹ",
  warning: "⚠",
  tip: "💡",
  danger: "🚨",
};

export function Callout({ type = "info", children }: CalloutProps) {
  return (
    <div className={`my-6 flex gap-3 rounded-lg border-l-4 px-4 py-3 ${styles[type]}`}>
      <span className="mt-0.5 shrink-0 text-base">{icons[type]}</span>
      <div className="text-sm leading-relaxed [&>p]:m-0">{children}</div>
    </div>
  );
}
