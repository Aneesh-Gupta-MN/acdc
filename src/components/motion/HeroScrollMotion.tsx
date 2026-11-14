"use client";

// HeroScrollMotion scopes a short GSAP timeline to the hero and leaves native scrolling and actions untouched.
import { useEffect, type MutableRefObject, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HeroScrollMotionProps {
  sectionRef: MutableRefObject<HTMLElement | null>;
  visualRef: MutableRefObject<HTMLDivElement | null>;
  copyRef: MutableRefObject<HTMLDivElement | null>;
  children: ReactNode;
}

export function HeroScrollMotion({ sectionRef, visualRef, copyRef, children }: HeroScrollMotionProps) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = sectionRef.current;
    const visual = visualRef.current;
    const copy = copyRef.current;
    if (!section || !visual || !copy) return;

    const context = gsap.context(() => {
      gsap.to(visual, {
        yPercent: -9,
        xPercent: -4,
        rotate: -2.5,
        scale: 1.04,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      gsap.to(copy, {
        yPercent: -4,
        opacity: 0.9,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "70% top",
          scrub: 0.8,
        },
      });
    }, section);
    return () => context.revert();
  }, [copyRef, sectionRef, visualRef]);

  return <>{children}</>;
}
