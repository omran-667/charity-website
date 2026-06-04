import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { PostCard } from "@/components/site/PostCard";
import { getCategoryBySlug, getPostsByCategory, type CategorySlug, type Post } from "@/lib/content";

export const Route = createFileRoute("/categories/$slug")({
  loader: ({ params }) => {
    const category = getCategoryBySlug(params.slug as CategorySlug);
    if (!category) throw notFound();
    const posts = getPostsByCategory(category.slug);
    return { category, posts };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.category.title} | جمعية خطى الأمان` },
          { name: "description", content: loaderData.category.description },
          { property: "og:title", content: loaderData.category.title },
          { property: "og:description", content: loaderData.category.description },
        ]
      : [{ title: "تصنيف | جمعية خطى الأمان" }],
  }),
  component: CategoryPage,
  notFoundComponent: () => (
    <Layout>
      <div className="container-narrow py-24 text-center">
        <h1 className="text-3xl font-bold mb-3">التصنيف غير موجود</h1>
        <Link to="/categories" className="text-primary font-bold">عرض جميع التصنيفات</Link>
      </div>
    </Layout>
  ),
  errorComponent: () => (
    <Layout>
      <div className="container-narrow py-24 text-center">
        <h1 className="text-3xl font-bold mb-3">حدث خطأ</h1>
        <Link to="/categories" className="text-primary font-bold">العودة للتصنيفات</Link>
      </div>
    </Layout>
  ),
});

function CategoryPage() {
  const { category, posts } = Route.useLoaderData();

  return (
    <Layout>
      <PageHeader
        eyebrow={`${category.icon} تصنيف`}
        title={category.title}
        description={category.description}
      />
      <section className="py-16">
        <div className="container-narrow">
          {posts.length === 0 ? (
            <div className="bg-card border border-border rounded-2xl p-12 text-center">
              <p className="text-muted-foreground">لا توجد منشورات في هذا التصنيف بعد.</p>
              <Link to="/news" className="mt-3 inline-block text-primary font-bold">تصفّح جميع الأخبار</Link>
            </div>
          ) : (
            <>
              <div className="text-sm text-muted-foreground mb-6">{posts.length} منشور</div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(posts as Post[]).map((p) => <PostCard key={p.slug} post={p} />)}
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
