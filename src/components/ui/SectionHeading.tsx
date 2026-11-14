// SectionHeading aligns editorial labels, titles, and supporting copy without fragmenting simple text.
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, tone = "dark", className }: SectionHeadingProps) {
  const light = tone === "light";
  return (
    <div className={cn("max-w-3xl", className)}>
      <p className={cn("eyebrow mb-4", light ? "text-gold" : "text-burgundy")}>{eyebrow}</p>
      <h2 className={cn("section-title text-balance", light ? "text-ivory" : "text-burgundy")}>{title}</h2>
      {description ? <div className={cn("mt-6 max-w-2xl text-lg leading-8", light ? "text-cream" : "text-espresso")}>{description}</div> : null}
    </div>
  );
}
