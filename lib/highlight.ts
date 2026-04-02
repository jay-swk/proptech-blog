import { codeToHtml } from "shiki";

export async function highlightCode(code: string, lang: string): Promise<string> {
  try {
    return await codeToHtml(code, {
      lang: lang || "text",
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      defaultColor: false,
    });
  } catch {
    // 알 수 없는 언어는 plain text로 fallback
    return await codeToHtml(code, {
      lang: "text",
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      defaultColor: false,
    });
  }
}
