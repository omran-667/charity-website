import { Link } from "@tanstack/react-router";
import { Calendar, ArrowLeft } from "lucide-react";
import { type Post, getCategoryBySlug, formatArabicDate } from "@/lib/content";

export function PostCard({ post }: { post: Post }) {
  const cat = getCategoryBySlug(post.category);
  return (
    <article className="hover-lift group bg-card rounded-2xl overflow-hidden shadow-soft border border-border hover:border-primary/40 flex flex-col">
      <Link
        to="/news/$slug"
        params={{ slug: post.slug }}
        className="img-zoom block aspect-[16/10] bg-muted relative"
      >
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          width={800}
          height={500}
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {cat && (
            <Link
              to="/categories/$slug"
              params={{ slug: cat.slug }}
              className="inline-flex items-center rounded-full bg-primary-soft text-primary px-2.5 py-1 font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {cat.title}
            </Link>
          )}
          <span className="inline-flex items-center gap-1">
            <Calendar className="size-3.5" />
            {formatArabicDate(post.date)}
          </span>
        </div>
        <h3 className="text-lg font-bold text-foreground leading-snug transition-colors group-hover:text-primary">
          <Link to="/news/$slug" params={{ slug: post.slug }} className="hover:text-primary">
            {post.title}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
        <Link
          to="/news/$slug"
          params={{ slug: post.slug }}
          className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-deep group/cta"
        >
          اقرأ المزيد
          <ArrowLeft className="size-4 transition-transform duration-300 group-hover/cta:-translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
