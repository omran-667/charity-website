import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { categories, getPostsByCategory } from "@/lib/content";

export const Route = createFileRoute("/categories/")({
  head: () => ({
    meta: [
      { title: "التصنيفات | جمعية خطى الأمان" },
      { name: "description", content: "تصنيفات منشورات الجمعية: المركز، أجيالنا، الورشات، المبادرات، الفعاليات، والأخبار." },
      { property: "og:title", content: "التصنيفات" },
      { property: "og:description", content: "استكشف تصنيفات أنشطة الجمعية." },
    ],
  }),
  component: CategoriesIndex,
});

function CategoriesIndex() {
  return (
    <Layout>
      <PageHeader
        eyebrow="استكشف"
        title="التصنيفات"
        description="تصفّح منشورات الجمعية حسب المجال للوصول السريع إلى ما يهمّك."
      />
      <section className="py-16">
        <div className="container-narrow grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((c) => {
            const count = getPostsByCategory(c.slug).length;
            return (
              <Link
                key={c.slug}
                to="/categories/$slug"
                params={{ slug: c.slug }}
                className="group bg-card border border-border rounded-2xl p-6 shadow-soft hover:shadow-card hover:border-primary transition-all"
              >
                <div className="text-3xl mb-3">{c.icon}</div>
                <h2 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary">{c.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{c.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{count} منشور</span>
                  <span className="text-primary font-bold inline-flex items-center gap-1">
                    تصفّح <ArrowLeft className="size-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
