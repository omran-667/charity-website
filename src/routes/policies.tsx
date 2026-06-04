import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, FileText, Lock, Scale, Users, Leaf } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/policies")({
  head: () => ({
    meta: [
      { title: "السياسات | جمعية خطى الأمان" },
      { name: "description", content: "السياسات الرسمية لجمعية خطى الأمان: الحوكمة، الخصوصية، التطوع، وحماية المستفيدين." },
      { property: "og:title", content: "السياسات — جمعية خطى الأمان" },
      { property: "og:description", content: "السياسات الرسمية للجمعية." },
    ],
  }),
  component: PoliciesPage,
});

const policies = [
  { icon: ShieldCheck, title: "سياسة الحوكمة", desc: "إطار عمل مجلس الإدارة والإدارة التنفيذية وآليات اتخاذ القرار والشفافية." },
  { icon: Lock, title: "سياسة الخصوصية وحماية البيانات", desc: "كيفية جمع البيانات الشخصية واستخدامها وحمايتها وفق الأنظمة المعتمدة." },
  { icon: Users, title: "سياسة المتطوعين", desc: "حقوق وواجبات المتطوعين، وآليات الانضمام والتقييم والتكريم." },
  { icon: Scale, title: "سياسة تعارض المصالح", desc: "ضوابط تجنّب تعارض المصالح بين أعضاء المجلس والإدارة والشركاء." },
  { icon: FileText, title: "سياسة الشكاوى والتظلّمات", desc: "قنوات تقديم الشكاوى وآلية معالجتها بشفافية وسرية تامّة." },
  { icon: Leaf, title: "سياسة حماية المستفيدين", desc: "ضمان سلامة المستفيدين وكرامتهم، خاصة الأطفال والفئات الأكثر عرضة." },
];

function PoliciesPage() {
  return (
    <Layout>
      <PageHeader
        eyebrow="من نحن"
        title="السياسات والحوكمة"
        description="نلتزم بأعلى معايير الحوكمة والشفافية. تطّلع هنا على السياسات الرسمية المعتمدة في الجمعية."
      />

      <section className="py-16">
        <div className="container-narrow grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {policies.map((p) => {
            const Icon = p.icon;
            return (
              <article key={p.title} className="bg-card border border-border rounded-2xl p-6 shadow-soft hover:shadow-card transition-shadow">
                <div className="size-12 rounded-xl bg-primary-soft text-primary flex items-center justify-center mb-4">
                  <Icon className="size-6" />
                </div>
                <h2 className="font-bold text-lg text-foreground mb-2">{p.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                <button className="mt-4 text-sm font-bold text-primary hover:text-primary-deep">
                  تحميل الوثيقة (PDF)
                </button>
              </article>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
