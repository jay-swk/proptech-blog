import { Hero } from "@/components/landing/Hero";
import { RecentPosts } from "@/components/landing/RecentPosts";
import { Skills } from "@/components/landing/Skills";

export default function HomePage() {
  return (
    <>
      <Hero />
      <RecentPosts />
      <Skills />
    </>
  );
}
