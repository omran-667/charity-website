import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "نبذة عنّا | جمعية خطى الأمان" },
      { name: "description", content: "نبذة عن جمعية خطى الأمان: التأسيس، الرؤية، الرسالة، القيم، والأهداف الاستراتيجية." },
      { property: "og:title", content: "نبذة عنّا — جمعية خطى الأمان" },
      { property: "og:description", content: "تعرّف على جمعية خطى الأمان وأهدافها وقيمها." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const objectives = [
    "تمكين الأفراد اقتصاديًا واجتماعيًا عبر برامج التدريب والتأهيل.",
    "دعم الأسرة ورعاية الأطفال والناشئة في مختلف المراحل العمرية.",
    "تعزيز ثقافة التطوع وبناء قدرات المتطوعين والمتطوعات.",
    "تنفيذ مبادرات مجتمعية تعالج قضايا واقعية وتُحدث أثرًا ملموسًا.",
    "بناء شراكات استراتيجية محلية وإقليمية لتحقيق التنمية المستدامة.",
    "نشر الوعي بقضايا الصحة النفسية والتعليم والبيئة.",
  ];

  return (
    <Layout>
      <PageHeader
        eyebrow="من نحن"
        title="نبذة عن جمعية خطى الأمان"
        description="جمعية أهلية مرخّصة تأسست لخدمة المجتمع من خلال برامج تنموية ومبادرات تطوعية ذات أثر مستدام."
      />

      <section className="py-16">
        <div className="container-narrow grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6 text-foreground/90 leading-relaxed">
            <p>
              تأسست <strong>جمعية خطى الأمان</strong> كجمعية أهلية مرخّصة تعمل
              ضمن إطار تنظيمي رسمي، وتسعى إلى المساهمة في بناء مجتمع آمن
              ومُمكَّن من خلال تقديم خدمات وبرامج نوعية للأفراد والأسر. تنطلق
              الجمعية من إيمانٍ راسخ بأن كل خطوة نحو الإنسان هي خطوة نحو مجتمع
              أفضل، وتعمل على ترجمة هذا الإيمان عبر برامج تربوية وتأهيلية
              وتوعوية وتطوعية.
            </p>
            <p>
              تركّز الجمعية على بناء شراكات استراتيجية مع المؤسسات الحكومية
              والخاصة والمجتمع المحلي لضمان استدامة أثر برامجها، وتعتمد منهجية
              تقييم مستمر لقياس النتائج والتحسين الدائم.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <div className="bg-primary-soft border border-primary/10 rounded-2xl p-5">
                <div className="text-primary font-bold mb-2">رؤيتنا</div>
                <p className="text-sm text-foreground/80">
                  مجتمع آمن ومُمكَّن يصنع أفراده فرص حياتهم بأنفسهم.
                </p>
              </div>
              <div className="bg-primary-soft border border-primary/10 rounded-2xl p-5">
                <div className="text-primary font-bold mb-2">رسالتنا</div>
                <p className="text-sm text-foreground/80">
                  تقديم برامج تنموية نوعية تعزّز قدرات الأفراد والأسر وتحقّق
                  الأثر المستدام.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold pt-4">أهدافنا الاستراتيجية</h2>
            <ul className="space-y-3">
              {objectives.map((o) => (
                <li key={o} className="flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground/85">{o}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
              <div className="text-xs font-bold text-primary mb-3">روابط ذات صلة</div>
              <ul className="space-y-2">
                <li>
                  <Link to="/structure" className="text-foreground hover:text-primary font-semibold">
                    الهيكل الإداري
                  </Link>
                </li>
                <li>
                  <Link to="/policies" className="text-foreground hover:text-primary font-semibold">
                    السياسات والحوكمة
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-foreground hover:text-primary font-semibold">
                    تواصل معنا
                  </Link>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-hero text-white rounded-2xl p-6 shadow-card">
              <div className="font-bold mb-2">شارك في صناعة الأثر</div>
              <p className="text-sm text-white/85 mb-4">انضم إلى فريق المتطوعين أو ادعم برامجنا.</p>
              <Link to="/contact" className="inline-flex items-center justify-center w-full rounded-lg bg-white text-primary font-bold py-2.5 text-sm hover:bg-white/90">
                تواصل معنا
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
}
