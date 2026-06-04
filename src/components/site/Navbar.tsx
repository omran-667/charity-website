import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";

const navItems: Array<{
  label: string;
  to: string;
  children?: Array<{ label: string; to: string }>;
}> = [
  { label: "الرئيسية", to: "/" },
  {
    label: "من نحن",
    to: "/about",
    children: [
      { label: "نبذة عنا", to: "/about" },
      { label: "الهيكل الإداري", to: "/structure" },
      { label: "السياسات", to: "/policies" },
    ],
  },
  { label: "الأخبار والمنشورات", to: "/news" },
  { label: "التصنيفات", to: "/categories" },
  { label: "تواصل معنا", to: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? "bg-background/90 border-b border-border shadow-soft"
          : "bg-background/70 border-b border-transparent"
      }`}
    >
      <div className="container-narrow flex items-center justify-between gap-4 h-18 py-3">
        <Logo />

        <div className="hidden lg:flex flex-1 justify-center">
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.to} className="relative group">
                <Link
                  to={item.to}
                  className="relative inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 rounded-lg hover:text-primary transition-colors"
                  activeProps={{ className: "text-primary bg-primary-soft" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className="size-3.5 transition-transform duration-300 group-hover:rotate-180" />
                  )}
                  <span className="pointer-events-none absolute inset-x-3 bottom-1 h-0.5 origin-right scale-x-0 bg-primary transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
                </Link>
                {item.children && (
                  <div className="absolute top-full right-0 mt-1 min-w-52 bg-card rounded-xl shadow-card border border-border p-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300">
                    {item.children.map((c) => (
                      <Link
                        key={c.to}
                        to={c.to}
                        className="block px-3 py-2 text-sm rounded-md text-foreground/80 hover:bg-primary-soft hover:text-primary hover:translate-x-0.5 transition-all"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <Link
            to="/contact"
            className="btn-press inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-deep hover:shadow-card shadow-soft"
          >
            تطوّع معنا
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          className="lg:hidden inline-flex items-center justify-center size-11 rounded-lg text-foreground hover:bg-primary-soft active:scale-95 transition-transform"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden border-t border-border bg-background"
          >
            <div className="container-narrow py-4 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="إغلاق القائمة"
                  className="inline-flex items-center justify-center size-11 rounded-lg text-foreground hover:bg-primary-soft active:scale-95 transition-transform"
                >
                  <X className="size-5" />
                </button>
              </div>
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <div key={item.to}>
                    <Link
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="block px-3 py-3 rounded-lg text-foreground/80 hover:bg-primary-soft hover:text-primary font-medium transition-colors"
                      activeProps={{ className: "text-primary bg-primary-soft" }}
                      activeOptions={{ exact: item.to === "/" }}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="ms-4 ps-3 border-s border-border my-1 flex flex-col gap-1">
                        {item.children.map((c) => (
                          <Link
                            key={c.to}
                            to={c.to}
                            onClick={() => setOpen(false)}
                            className="block px-3 py-2 text-sm rounded-md text-muted-foreground hover:text-primary transition-colors"
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="btn-press inline-flex items-center justify-center rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
              >
                تطوّع معنا
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
