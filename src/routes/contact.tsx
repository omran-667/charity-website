import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { submitContactMessage } from "@/hooks/useContactMessages";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصل معنا | جمعية خطى الأمان" },
      { name: "description", content: "تواصل مع جمعية خطى الأمان: العنوان، الهاتف، البريد الإلكتروني، ونموذج التواصل المباشر." },
      { property: "og:title", content: "تواصل معنا" },
      { property: "og:description", content: "نسعد بتواصلكم معنا." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const { settings } = useSiteSettings();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const success = await submitContactMessage(
      formData.name,
      formData.email,
      `الموضوع: ${formData.subject}\n\n${formData.message}`,
      formData.phone || undefined
    );
    setLoading(false);
    if (success) {
      setSent(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { id, value } = e.currentTarget;
    setFormData(prev => ({ ...prev, [id]: value }));
  }

  return (
    <Layout>
      <PageHeader
        eyebrow="تواصل"
        title="تواصل معنا"
        description="نسعد باستقبال استفساراتكم ومقترحاتكم. فريقنا جاهز للرد عليكم في أقرب وقت."
      />

      <section className="py-16">
        <div className="container-narrow grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 md:p-8 shadow-soft">
            <h2 className="text-xl font-bold text-foreground mb-2">أرسل لنا رسالة</h2>
            <p className="text-sm text-muted-foreground mb-6">سنرد على رسالتك خلال يومَي عمل.</p>

            {sent ? (
              <div className="rounded-xl bg-primary-soft border border-primary/20 p-6 text-center">
                <div className="text-primary font-bold text-lg mb-2">شكرًا لتواصلك!</div>
                <p className="text-sm text-foreground/80">تم استلام رسالتك بنجاح، وسنعود إليك قريبًا.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-sm font-semibold text-foreground">الاسم الكامل</label>
                  <input id="name" value={formData.name} onChange={handleInputChange} required disabled={loading} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-sm font-semibold text-foreground">البريد الإلكتروني</label>
                  <input id="email" type="email" value={formData.email} onChange={handleInputChange} required disabled={loading} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50" dir="ltr" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-sm font-semibold text-foreground">رقم الهاتف</label>
                  <input id="phone" value={formData.phone} onChange={handleInputChange} disabled={loading} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50" dir="ltr" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-sm font-semibold text-foreground">الموضوع</label>
                  <input id="subject" value={formData.subject} onChange={handleInputChange} required disabled={loading} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50" />
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <label htmlFor="message" className="text-sm font-semibold text-foreground">رسالتك</label>
                  <textarea id="message" rows={5} value={formData.message} onChange={handleInputChange} required disabled={loading} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 resize-none" />
                </div>
                <div className="sm:col-span-2">
                  <button type="submit" disabled={loading} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-primary-deep transition-colors shadow-soft disabled:opacity-50 disabled:cursor-not-allowed">
                    <Send className="size-4" />
                    {loading ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                  </button>
                </div>
              </form>
            )}
          </div>

          <aside className="space-y-4">
            {[
              { icon: MapPin, titleKey: "العنوان", bodyKey: "location_address", dir: "rtl" },
              { icon: Phone, titleKey: "هاتف", bodyKey: "phone_number", dir: "ltr" },
              { icon: Mail, titleKey: "بريد إلكتروني", bodyKey: "email", dir: "ltr" },
              { icon: Clock, titleKey: "ساعات العمل", bodyKey: "working_hours", dir: "rtl" },
            ].map((c) => {
              const Icon = c.icon;
              const body = settings[c.bodyKey] || (
                c.bodyKey === "location_address" ? "الحي الإداري، شارع الجمعيات، مبنى ٢٤" :
                c.bodyKey === "phone_number" ? "+966 12 345 6789" :
                c.bodyKey === "email" ? "info@khuta.org" :
                "الأحد - الخميس: ٨ صباحًا - ٤ مساءً"
              );
              return (
                <div key={c.titleKey} className="bg-card border border-border rounded-2xl p-5 shadow-soft flex items-start gap-4">
                  <div className="size-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center shrink-0">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground mb-0.5">{c.titleKey}</div>
                    <div className="text-sm text-muted-foreground" dir={c.dir}>{body}</div>
                  </div>
                </div>
              );
            })}
          </aside>
        </div>
      </section>
    </Layout>
  );
}
