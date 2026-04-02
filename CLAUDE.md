# PropTech Blog

프롭테크 연구 블로그. 부동산 × 기술의 교차점을 탐구하는 개인 블로그.

## Language
- Claude는 사용자에게 항상 **한국어**로 응답한다.

## Stack
- Next.js 16 (App Router, SSG, output: export)
- TypeScript 6
- Tailwind CSS v4 + @tailwindcss/typography
- next-themes (다크모드)
- next-mdx-remote (MDX 렌더링)
- gray-matter (frontmatter 파싱)
- Shiki (코드 하이라이팅, 서버사이드)
- pnpm

## Structure
- / — 랜딩 (Hero + RecentPosts + Skills)
- /blog — 포스트 목록 (카드 그리드)
- /blog/[slug] — 포스트 뷰어
- /tags/[tag] — 태그별 필터
- content/posts/*.mdx — 블로그 포스트 (frontmatter: title, description, date, category, tags, published)

## 포스트 작성법
content/posts/ 에 MDX 파일 추가 후 git push → 자동 빌드 반영.

## Build & Deploy
```bash
pnpm dev -p 4200          # 로컬 개발
pnpm build                # 정적 빌드 (out/)
```
- GitHub Pages 배포: main push → GitHub Actions 자동 빌드
- URL: https://jay-swk.github.io/proptech-blog/
- basePath: /proptech-blog

## Design System
- 라이트/다크 모드 (next-themes)
- 미니멀, 콘텐츠 중심
- 폰트: Geist Sans + Geist Mono

## Git Convention
feat: 새 기능 | fix: 버그 수정 | update: 기존 개선 | docs: 문서 | chore: 설정
