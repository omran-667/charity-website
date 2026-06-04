import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.jpg";

export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  return (
    <Link
      to="/"
      className="flex items-center gap-3 group"
      aria-label="العودة إلى الصفحة الرئيسية"
      title="جمعية خطى الأمان"
    >
      <div className="size-12 rounded-xl bg-white shadow-soft flex items-center justify-center overflow-hidden ring-1 ring-border">
        <img
          src={logo}
          alt="شعار جمعية خطى الأمان"
          width={48}
          height={48}
          className="size-10 object-contain"
        />
      </div>
      <div className="leading-tight">
        <div
          className={
            "font-bold text-base " +
            (variant === "light" ? "text-white" : "text-foreground")
          }
        >
          جمعية خطى الأمان
        </div>
        <div
          className={
            "text-[11px] " +
            (variant === "light"
              ? "text-white/70"
              : "text-muted-foreground")
          }
        >
          Khuta Community Platform
        </div>
      </div>
    </Link>
  );
}
