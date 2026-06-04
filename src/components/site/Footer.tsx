import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import { Logo } from "./Logo";
import { categories } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-primary-deep text-white mt-24">
      <div className="container-narrow py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="space-y-4">
          <Logo variant="light" />
          <p className="text-sm text-white/75 leading-relaxed">
            جمعية أهلية مرخّصة تعمل على تمكين المجتمع وتنمية أفراده عبر برامج
            نوعية ومستدامة.
          </p>
          <div className="flex gap-2 pt-2">
            <a aria-label="فيسبوك" href="#" className="size-10 rounded-lg bg-white/10 hover:bg-white/20 hover:-translate-y-0.5 flex items-center justify-center transition-all duration-300">
              <Facebook className="size-4" />
            </a>
            <a aria-label="تويتر" href="#" className="size-10 rounded-lg bg-white/10 hover:bg-white/20 hover:-translate-y-0.5 flex items-center justify-center transition-all duration-300">
              <Twitter className="size-4" />
            </a>
            <a aria-label="إنستغرام" href="#" className="size-10 rounded-lg bg-white/10 hover:bg-white/20 hover:-translate-y-0.5 flex items-center justify-center transition-all duration-300">
              <Instagram className="size-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold mb-4 text-white">روابط سريعة</h3>
          <ul className="space-y-2.5 text-sm text-white/75">
            <li><Link to="/about" className="hover:text-white hover:translate-x-1 inline-block transition-all">نبذة عنا</Link></li>
            <li><Link to="/structure" className="hover:text-white hover:translate-x-1 inline-block transition-all">الهيكل الإداري</Link></li>
            <li><Link to="/policies" className="hover:text-white hover:translate-x-1 inline-block transition-all">السياسات</Link></li>
            <li><Link to="/news" className="hover:text-white hover:translate-x-1 inline-block transition-all">الأخبار والمنشورات</Link></li>
            <li><Link to="/contact" className="hover:text-white hover:translate-x-1 inline-block transition-all">تواصل معنا</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold mb-4 text-white">برامجنا</h3>
          <ul className="space-y-2.5 text-sm text-white/75">
            {categories.slice(0, 5).map((c) => (
              <li key={c.slug}>
                <Link
                  to="/categories/$slug"
                  params={{ slug: c.slug }}
                  className="hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold mb-4 text-white">تواصل معنا</h3>
          <ul className="space-y-3 text-sm text-white/75">
            <li className="flex items-start gap-3">
              <MapPin className="size-4 mt-0.5 shrink-0 text-white/60" />
              <span>الحي الإداري، شارع الجمعيات، مبنى ٢٤</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="size-4 shrink-0 text-white/60" />
              <span dir="ltr">+966 12 345 6789</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-4 shrink-0 text-white/60" />
              <a href="mailto:info@khuta.org" className="hover:text-white">info@khuta.org</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-narrow py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <div>© {new Date().getFullYear()} جمعية خطى الأمان. جميع الحقوق محفوظة.</div>
          <div>رقم الترخيص: ١٢٣٤ / ٢٠٢٤</div>
        </div>
      </div>
    </footer>
  );
}
