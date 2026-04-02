const SKILLS = [
  { name: "Next.js", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Python", category: "Backend" },
  { name: "FastAPI", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Supabase", category: "Database" },
  { name: "AWS", category: "Infra" },
  { name: "NCP", category: "Infra" },
  { name: "Docker", category: "Infra" },
  { name: "GitHub Actions", category: "DevOps" },
];

const categoryColors: Record<string, string> = {
  Frontend: "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  Backend: "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
  Database: "bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  Infra: "bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
  DevOps: "bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800",
};

export function Skills() {
  return (
    <section className="py-16 border-t border-zinc-100 dark:border-zinc-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">기술 스택</h2>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map((skill) => (
            <span
              key={skill.name}
              className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border ${categoryColors[skill.category]}`}
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
