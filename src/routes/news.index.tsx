import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { PostCard } from "@/components/site/PostCard";
import { posts, categories, type CategorySlug } from "@/lib/content";

export const Route = createFileRoute("/news/")({
  head: () => ({
    meta: [
      { title: "الأخبار والمنشورات | جمعية خطى الأمان" },
      { name: "description", content: "آخر أخبار جمعية خطى الأمان: المبادرات، الورشات، البرامج، والقصص الملهمة." },
      { property: "og:title", content: "الأخبار والمنشورات" },
      { property: "og:description", content: "آخر أخبار ومنشورات الجمعية." },
    ],
  }),
  component: NewsListPage,
});

function NewsListPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<"all" | CategorySlug>("all");

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      if (active !== "all" && p.category !== active) return false;
      if (query.trim()) {
        const q = query.trim();
        return p.title.includes(q) || p.excerpt.includes(q);
      }
      return true;
    });
  }, [query, active]);

  return (
    <Layout>
      <PageHeader
        eyebrow="منشورات"
        title="الأخبار والمنشورات"
        description="تابع آخر أخبار الجمعية ومبادراتها وبرامجها التدريبية."
      />

      <section className="py-12">
        <div className="container-narrow">
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 -translate-y-1/2 start-3 size-4 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث في الأخبار..."
                className="w-full rounded-xl border border-input bg-card ps-10 pe-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div className="flex gap-2 flex-wrap mb-10">
            <button
              onClick={() => setActive("all")}
              className={
                "px-4 py-2 text-sm rounded-full font-semibold transition-colors " +
                (active === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-foreground/70 hover:text-primary hover:border-primary")
              }
            >
              الكل
            </button>
            {categories.map((c) => (
              <button
                key={c.slug}
                onClick={() => setActive(c.slug)}
                className={
                  "px-4 py-2 text-sm rounded-full font-semibold transition-colors " +
                  (active === c.slug
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-foreground/70 hover:text-primary hover:border-primary")
                }
              >
                {c.title}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="bg-card border border-border rounded-2xl p-12 text-center">
              <p className="text-muted-foreground">لا توجد نتائج مطابقة لبحثك.</p>
              <Link to="/news" className="mt-3 inline-block text-primary font-bold">عرض جميع الأخبار</Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => <PostCard key={p.slug} post={p} />)}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
