import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/structure")({
  head: () => ({
    meta: [
      { title: "الهيكل الإداري | جمعية خطى الأمان" },
      { name: "description", content: "الهيكل الإداري والتنظيمي لجمعية خطى الأمان: مجلس الإدارة، الإدارة التنفيذية، والأقسام." },
      { property: "og:title", content: "الهيكل الإداري" },
      { property: "og:description", content: "الهيكل التنظيمي لجمعية خطى الأمان." },
    ],
  }),
  component: StructurePage,
});

const board = [
  { name: "د. عبدالله الراشد", role: "رئيس مجلس الإدارة" },
  { name: "أ. منى الزهراني", role: "نائب الرئيس" },
  { name: "أ. خالد العتيبي", role: "أمين الصندوق" },
  { name: "د. سلمى الحربي", role: "أمين السر" },
  { name: "أ. فهد القحطاني", role: "عضو مجلس إدارة" },
  { name: "أ. ريم الدوسري", role: "عضو مجلس إدارة" },
];

const executives = [
  { name: "أ. ياسر السبيعي", role: "المدير التنفيذي" },
  { name: "أ. هنادي الأحمدي", role: "مدير البرامج" },
  { name: "أ. ماجد الشمري", role: "مدير الشراكات" },
  { name: "أ. لمى الغامدي", role: "مديرة المتطوعين" },
];

const departments = [
  "إدارة البرامج التنموية",
  "إدارة التدريب والورشات",
  "إدارة المبادرات المجتمعية",
  "إدارة المتطوعين",
  "إدارة الشراكات والعلاقات",
  "إدارة الإعلام والاتصال",
  "إدارة المالية والإدارية",
];

function PersonCard({ name, role }: { name: string; role: string }) {
  const initials = name.split(" ").slice(1, 3).map((s) => s[0]).join("");
  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-soft text-center">
      <div className="mx-auto size-16 rounded-full bg-primary-soft text-primary flex items-center justify-center font-bold text-lg mb-3">
        {initials}
      </div>
      <div className="font-bold text-foreground">{name}</div>
      <div className="text-sm text-primary mt-1">{role}</div>
    </div>
  );
}

function StructurePage() {
  return (
    <Layout>
      <PageHeader
        eyebrow="من نحن"
        title="الهيكل الإداري"
        description="الهيكل التنظيمي للجمعية يضمن وضوح الأدوار والمسؤوليات وكفاءة اتخاذ القرار."
      />

      <section className="py-16 border-b border-border">
        <div className="container-narrow">
          <h2 className="text-2xl font-bold text-foreground mb-8">مجلس الإدارة</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {board.map((p) => <PersonCard key={p.name} {...p} />)}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-soft border-b border-border">
        <div className="container-narrow">
          <h2 className="text-2xl font-bold text-foreground mb-8">الإدارة التنفيذية</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {executives.map((p) => <PersonCard key={p.name} {...p} />)}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-narrow">
          <h2 className="text-2xl font-bold text-foreground mb-8">الأقسام والإدارات</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((d, i) => (
              <div key={d} className="bg-card border border-border rounded-xl p-5 flex items-center gap-4 shadow-soft">
                <div className="size-10 rounded-lg bg-primary-soft text-primary font-bold flex items-center justify-center">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="font-semibold text-foreground">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
