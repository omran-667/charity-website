import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Users, GraduationCap, Sparkles, HeartHandshake, Quote } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Layout } from "@/components/site/Layout";
import { PostCard } from "@/components/site/PostCard";
import { FadeIn, StaggerGrid, StaggerItem, AnimatedCounter } from "@/components/site/motion";
import { categories, posts, stats, programs, partners } from "@/lib/content";
import heroCommunity from "@/assets/hero-community.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "جمعية خطى الأمان | الرئيسية" },
      { name: "description", content: "جمعية خطى الأمان — منصة مجتمعية لتمكين الأفراد عبر البرامج والمبادرات والورشات النوعية." },
      { property: "og:title", content: "جمعية خطى الأمان" },
      { property: "og:description", content: "منصة مجتمعية لتمكين الأفراد." },
    ],
  }),
  component: Home,
});

const statIcons = [Users, GraduationCap, Sparkles, HeartHandshake];

function Home() {
  const latest = posts.slice(0, 3);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <Layout>
      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden bg-gradient-soft">
        <motion.div
          aria-hidden
          className="absolute -top-24 -left-24 size-72 rounded-full bg-primary/15 blur-3xl"
          animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -bottom-32 -right-16 size-96 rounded-full bg-primary-deep/10 blur-3xl"
          animate={{ y: [0, -30, 0], x: [0, -10, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container-narrow py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6 text-center lg:text-start relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-primary-soft text-primary px-3 py-1 text-xs font-semibold"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              جمعية أهلية مرخّصة
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.15]">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="block"
              >
                نخطو معًا
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7 }}
                className="block text-primary"
              >
                نحو مجتمع آمن ومُمكَّن
              </motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              جمعية خطى الأمان تعمل على تمكين الأفراد وبناء المجتمع من خلال برامج
              تنموية وتدريبية ومبادرات تطوعية تُحدث أثرًا حقيقيًا ومستدامًا.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              <Link
                to="/contact"
                className="btn-press group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-soft hover:bg-primary-deep hover:shadow-card"
              >
                انضم كمتطوّع
                <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
              </Link>
              <Link
                to="/about"
                className="btn-press inline-flex items-center gap-2 rounded-xl bg-card px-6 py-3.5 text-sm font-bold text-foreground border border-border hover:border-primary hover:text-primary"
              >
                تعرّف على الجمعية
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            className="relative"
            style={{ y: heroImgY, opacity: heroOpacity }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-3xl"></div>
            <div className="img-zoom relative rounded-3xl shadow-card border border-border">
              <img
                src={heroCommunity}
                alt="متطوعو جمعية خطى الأمان"
                width={1600}
                height={1024}
                className="w-full h-[420px] object-cover rounded-3xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-card border-b border-border">
        <div className="container-narrow">
          <StaggerGrid className="grid grid-cols-2 lg:grid-cols-4 gap-6" delay={0.08}>
            {stats.map((s, i) => {
              const Icon = statIcons[i];
              return (
                <StaggerItem key={s.label}>
                  <div className="hover-lift bg-background border border-border rounded-2xl p-6 text-center shadow-soft h-full">
                    <div className="size-12 mx-auto mb-3 rounded-xl bg-primary-soft text-primary flex items-center justify-center">
                      <Icon className="size-6" />
                    </div>
                    <div className="text-3xl md:text-4xl font-extrabold text-foreground">
                      <AnimatedCounter value={s.value} />
                    </div>
                    <div className="text-sm text-muted-foreground mt-1.5">{s.label}</div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20 border-b border-border">
        <div className="container-narrow">
          <FadeIn className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <div className="text-xs font-bold text-primary mb-3">آخر الأخبار</div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
                مستجدّات الجمعية
              </h2>
            </div>
            <Link to="/news" className="group text-sm font-bold text-primary hover:text-primary-deep inline-flex items-center gap-1.5">
              جميع الأخبار <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
            </Link>
          </FadeIn>
          <StaggerGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latest.map((p) => (
              <StaggerItem key={p.slug}>
                <PostCard post={p} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 border-b border-border">
        <div className="container-narrow">
          <FadeIn className="text-center mb-12 max-w-2xl mx-auto">
            <div className="text-xs font-bold text-primary mb-3">برامجنا</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
              برامج تصنع الفرق
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              نُقدّم منظومة برامج متكاملة تستهدف الفرد والأسرة والمجتمع.
            </p>
          </FadeIn>
          <StaggerGrid className="grid md:grid-cols-2 gap-6">
            {programs.map((p) => (
              <StaggerItem key={p.title}>
                <Link
                  to="/categories/$slug"
                  params={{ slug: p.slug }}
                  className="hover-lift group bg-card border border-border hover:border-primary/40 rounded-2xl overflow-hidden shadow-soft h-full block"
                >
                  <div className="img-zoom aspect-[16/9] overflow-hidden">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 border-b border-border bg-gradient-soft">
        <div className="container-narrow">
          <FadeIn className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <div className="text-xs font-bold text-primary mb-3">التصنيفات</div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
                تصفّح أقسام الجمعية
              </h2>
            </div>
            <Link to="/categories" className="group text-sm font-bold text-primary hover:text-primary-deep inline-flex items-center gap-1.5">
              جميع التصنيفات <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
            </Link>
          </FadeIn>
          <StaggerGrid className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" delay={0.06}>
            {categories.map((c) => (
              <StaggerItem key={c.slug}>
                <Link
                  to="/categories/$slug"
                  params={{ slug: c.slug }}
                  className="hover-lift group block bg-card border border-border hover:border-primary/40 rounded-2xl p-6 shadow-soft h-full"
                >
                  <div className="text-3xl mb-3">{c.icon}</div>
                  <h3 className="font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.description}</p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 border-b border-border">
        <div className="container-narrow grid lg:grid-cols-5 gap-12 items-center">
          <FadeIn className="lg:col-span-2">
            <div className="text-xs font-bold text-primary mb-3">من نحن</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-5 leading-tight">
              نبني الأمل خطوة بخطوة
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              تأسست جمعية خطى الأمان لتكون شريكًا فاعلًا في التنمية المجتمعية،
              من خلال برامج متخصصة في الإرشاد والتأهيل والتمكين الاقتصادي
              والتطوع. نؤمن أن كل خطوة نحو الإنسان هي خطوة نحو مجتمع أفضل.
            </p>
            <Link
              to="/about"
              className="group mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-deep"
            >
              اقرأ المزيد عنّا
              <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
            </Link>
          </FadeIn>
          <StaggerGrid className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            {[
              { title: "رؤيتنا", body: "مجتمع آمن ومُمكَّن يصنع أفراده فرص حياتهم بأنفسهم." },
              { title: "رسالتنا", body: "تقديم برامج تنموية نوعية تعزّز قدرات الأفراد والأسر." },
              { title: "قيمنا", body: "الشفافية، الاحترافية، الشراكة، الاستدامة، والأثر." },
              { title: "أثرنا", body: "أكثر من ١٢ ألف مستفيد و٣٤٠ ورشة منذ التأسيس." },
            ].map((c) => (
              <StaggerItem key={c.title}>
                <div className="hover-lift bg-card border border-border hover:border-primary/40 rounded-2xl p-5 shadow-soft h-full">
                  <div className="text-primary font-bold mb-1.5">{c.title}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-gradient-soft border-b border-border">
        <div className="container-narrow">
          <FadeIn className="text-center mb-10">
            <div className="text-xs font-bold text-primary mb-3">شركاؤنا</div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
              نفخر بشراكتهم وثقتهم
            </h2>
          </FadeIn>
          <StaggerGrid className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" delay={0.05}>
            {partners.map((p) => (
              <StaggerItem key={p}>
                <div className="hover-lift bg-card border border-border rounded-xl px-4 py-6 text-center text-sm font-semibold text-muted-foreground hover:text-primary hover:border-primary h-full">
                  {p}
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Volunteer CTA */}
      <section className="py-20">
        <div className="container-narrow">
          <FadeIn className="relative overflow-hidden rounded-3xl bg-gradient-hero p-10 md:p-16 text-center shadow-card">
            <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:24px_24px]"></div>
            <motion.div
              aria-hidden
              className="absolute -top-20 -right-20 size-72 rounded-full bg-white/10 blur-3xl"
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative max-w-2xl mx-auto text-white">
              <Quote className="size-10 mx-auto mb-4 opacity-80" />
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                كن جزءًا من التغيير
              </h2>
              <p className="text-white/85 leading-relaxed mb-8">
                انضم إلى فريق المتطوعين في جمعية خطى الأمان وساهم في صناعة أثر
                حقيقي في مجتمعك. لدينا فرصة تناسب وقتك ومهاراتك.
              </p>
              <Link
                to="/contact"
                className="btn-press group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-primary hover:bg-white/95 hover:shadow-card"
              >
                سجّل كمتطوّع الآن
                <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
}
