export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500 dark:text-zinc-500">
        <p>© 2026 Keunsik. 부동산 × 기술의 교차점을 탐구합니다.</p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/givepro91"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            GitHub
          </a>
          <a
            href="mailto:hello@keunsik.dev"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
