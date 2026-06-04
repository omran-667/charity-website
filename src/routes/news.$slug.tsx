import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { PostCard } from "@/components/site/PostCard";
import {
  getPostBySlug,
  getCategoryBySlug,
  posts,
  formatArabicDate,
} from "@/lib/content";

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} | جمعية خطى الأمان` },
          { name: "description", content: loaderData.post.excerpt },
          { property: "og:title", content: loaderData.post.title },
          { property: "og:description", content: loaderData.post.excerpt },
          { property: "og:image", content: loaderData.post.image },
          { name: "twitter:image", content: loaderData.post.image },
        ]
      : [{ title: "منشور | جمعية خطى الأمان" }],
  }),
  component: PostPage,
  notFoundComponent: () => (
    <Layout>
      <div className="container-narrow py-24 text-center">
        <h1 className="text-3xl font-bold mb-3">لم يتم العثور على المنشور</h1>
        <Link to="/news" className="text-primary font-bold">العودة إلى الأخبار</Link>
      </div>
    </Layout>
  ),
  errorComponent: () => (
    <Layout>
      <div className="container-narrow py-24 text-center">
        <h1 className="text-3xl font-bold mb-3">حدث خطأ</h1>
        <Link to="/news" className="text-primary font-bold">العودة إلى الأخبار</Link>
      </div>
    </Layout>
  ),
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const cat = getCategoryBySlug(post.category);
  const related = posts.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 3);

  return (
    <Layout>
      <article>
        <div className="bg-gradient-soft border-b border-border">
          <div className="container-narrow py-12 max-w-3xl">
            <nav className="text-xs text-muted-foreground mb-4 flex items-center gap-2 flex-wrap">
              <Link to="/" className="hover:text-primary">الرئيسية</Link>
              <ArrowRight className="size-3" />
              <Link to="/news" className="hover:text-primary">الأخبار</Link>
              {cat && (
                <>
                  <ArrowRight className="size-3" />
                  <Link to="/categories/$slug" params={{ slug: cat.slug }} className="hover:text-primary">{cat.title}</Link>
                </>
              )}
            </nav>
            {cat && (
              <Link to="/categories/$slug" params={{ slug: cat.slug }} className="inline-flex items-center rounded-full bg-primary-soft text-primary px-3 py-1 text-xs font-semibold mb-4">
                {cat.title}
              </Link>
            )}
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-5 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-4" />
                {formatArabicDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <User className="size-4" />
                {post.author}
              </span>
            </div>
          </div>
        </div>

        <div className="container-narrow py-10 max-w-3xl">
          <div className="rounded-2xl overflow-hidden shadow-card border border-border mb-10">
            <img src={post.image} alt={post.title} width={1200} height={750} className="w-full h-auto object-cover" />
          </div>

          <div className="prose prose-lg max-w-none text-foreground/85 leading-loose space-y-5 text-lg">
            <p className="text-xl text-foreground/90 font-medium leading-relaxed">{post.excerpt}</p>
            <p>{post.content}</p>
            <p>
              تواصل الجمعية تنفيذ خططها الاستراتيجية بالتعاون مع الشركاء والمتطوعين،
              ويأتي هذا النشاط ضمن سلسلة من البرامج التي تنفّذها الجمعية على مدار العام
              بهدف خدمة المجتمع وتعزيز قيم العمل التطوعي.
            </p>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="py-16 bg-gradient-soft border-t border-border">
          <div className="container-narrow">
            <h2 className="text-2xl font-bold text-foreground mb-8">منشورات ذات صلة</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => <PostCard key={p.slug} post={p} />)}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
