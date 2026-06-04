import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li";
};

export function FadeIn({ children, delay = 0, y = 24, className, as = "div" }: FadeInProps) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerGrid({
  children,
  className,
  delay = 0.08,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Animated number counter. Parses the leading number and preserves prefix/suffix (e.g. "+", ",", "k"). */
export function AnimatedCounter({ value, className }: { value: string; className?: string }) {
  const match = value.match(/^([^\d-]*)(-?[\d,\.]+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const rawNum = match?.[2] ?? "0";
  const suffix = match?.[3] ?? "";
  const target = parseFloat(rawNum.replace(/,/g, "")) || 0;
  const hasComma = rawNum.includes(",");

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1600, bounce: 0 });
  const display = useTransform(spring, (v) => {
    const n = Math.round(v);
    return prefix + (hasComma ? n.toLocaleString("en-US") : String(n)) + suffix;
  });

  useEffect(() => {
    if (inView) mv.set(target);
  }, [inView, target, mv]);

  return (
    <span ref={ref} className={className} dir="ltr">
      <motion.span>{display}</motion.span>
    </span>
  );
}