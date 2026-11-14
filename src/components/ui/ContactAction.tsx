// ContactAction renders only validated direct-contact destinations and keeps external links explicit.
import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface ContactActionProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string | null;
  label: string;
  inverse?: boolean;
}

export function ContactAction({ href, label, inverse = false, className, ...props }: ContactActionProps) {
  if (!href) return null;
  return (
    <a
      href={href}
      className={cn(
        "inline-flex min-h-touch items-center justify-center rounded-sm px-5 py-3 text-sm font-semibold transition-colors",
        inverse ? "bg-ivory text-burgundy hover:bg-cream" : "bg-burgundy text-ivory hover:bg-burgundy-deep",
        className,
      )}
      {...props}
    >
      {label}
    </a>
  );
}
