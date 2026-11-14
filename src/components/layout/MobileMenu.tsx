"use client";

// MobileMenu owns the small-screen disclosure, escape handling, focus restoration, and scroll lock.
import { useEffect, useRef, useState } from "react";
import { navigationItems as defaultNavigationItems } from "@/content/navigation";
import { cn } from "@/lib/cn";

type MenuTone = "dark" | "ivory";

interface MobileMenuProps {
  phoneHref: string | null;
  navigation?: ReadonlyArray<{ href: string; label: string }>;
  tone?: MenuTone;
}

export function MobileMenu({ phoneHref, navigation = defaultNavigationItems, tone = "dark" }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (!open) {
      if (wasOpen.current) triggerRef.current?.focus();
      document.body.style.overflow = "";
      return;
    }
    wasOpen.current = true;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  const ivoryTone = tone === "ivory";

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        className={cn(
          "inline-flex min-h-touch min-w-touch items-center justify-center rounded-sm border bg-transparent",
          ivoryTone ? "border-burgundy/40 text-burgundy" : "border-gold/60 text-ivory",
        )}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span aria-hidden="true" className="flex w-5 flex-col gap-1.5">
          <span className="h-px w-full bg-current" />
          <span className="h-px w-3/4 self-end bg-current" />
          <span className="h-px w-full bg-current" />
        </span>
      </button>
      <div
        ref={panelRef}
        id="mobile-navigation"
        className={cn(
          "absolute right-0 top-[calc(100%+8px)] z-30 w-[min(86vw,320px)] border border-gold/40 px-5 py-5 shadow-2xl sm:px-8",
          ivoryTone ? "bg-ivory text-burgundy" : "bg-burgundy-deep text-cream",
          open ? "block" : "hidden",
        )}
      >
        <nav aria-label="Mobile navigation" className="grid gap-1">
          {navigation.map((item) => (
            <a
              key={item.href}
              className={cn(
                "min-h-touch border-b border-gold/20 py-3 font-label text-sm uppercase tracking-[0.16em]",
                ivoryTone ? "text-burgundy" : "text-cream",
              )}
              href={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            className={cn(
              "mt-3 min-h-touch rounded-sm px-4 py-3 text-center text-sm font-semibold",
              ivoryTone ? "bg-burgundy text-ivory" : "bg-ivory text-burgundy",
            )}
            href="#appointment"
            onClick={() => setOpen(false)}
          >
            Request an appointment
          </a>
          {phoneHref ? (
            <a className={cn("min-h-touch py-3 text-center text-sm font-semibold", ivoryTone ? "text-burgundy" : "text-gold")} href={phoneHref}>
              Call the clinic
            </a>
          ) : null}
        </nav>
      </div>
    </div>
  );
}
