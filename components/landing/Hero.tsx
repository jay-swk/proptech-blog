import Link from "next/link";

export function Hero() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            PropTech Developer
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight tracking-tight mb-5">
            안녕하세요,
            <br />
            <span className="text-indigo-600 dark:text-indigo-400">Keunsik</span>입니다
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
            프롭테크 개발자로 부동산 × 기술의 교차점을 탐구합니다.
            <br className="hidden sm:block" />
            AI 밸류에이션, 데이터 파이프라인, 모던 웹 개발에 대해 씁니다.
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors"
            >
              블로그 보기
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <a
              href="https://github.com/givepro91"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600 text-sm font-medium transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
