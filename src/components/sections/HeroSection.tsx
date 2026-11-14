"use client";

// HeroSection owns the first-screen reading order and reserves a stable visual region for the optional tooth scene.
import { useRef } from "react";
import type { SiteContent } from "@/types/content";
import { phoneHref } from "@/lib/contact-links";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ToothExperience } from "@/components/three/ToothExperience";
import { HeroScrollMotion } from "@/components/motion/HeroScrollMotion";

export function HeroSection({ site }: { site: SiteContent }) {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const phone = phoneHref(site.phone);

  return (
    <HeroScrollMotion sectionRef={sectionRef} visualRef={visualRef} copyRef={copyRef}>
      <section id="top" ref={sectionRef} className="relative overflow-hidden bg-burgundy-deep text-ivory">
        <Container className="grid min-h-[calc(100svh-76px)] items-center gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-0 lg:py-16">
          <div ref={copyRef} className="relative z-10 max-w-2xl py-10 lg:py-20">
            <p className="eyebrow mb-7 text-gold">{site.clinicName}</p>
            <h1 className="display-title max-w-2xl text-balance text-ivory">Care in every detail.</h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-cream sm:text-xl">
              Thoughtful care. Considered dentistry. Start with a clear conversation about your dental needs.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <PrimaryButton href="#appointment" className="bg-ivory text-burgundy hover:bg-cream">
                Request an appointment
              </PrimaryButton>
              {phone ? <SecondaryButton href={phone} className="border-cream text-cream hover:bg-burgundy">Call the clinic</SecondaryButton> : null}
            </div>
            <p className="mt-9 max-w-sm text-sm leading-6 text-cream/75">A direct call lets the clinic team confirm the next appropriate step.</p>
          </div>
          <div ref={visualRef} className="relative mx-auto min-w-0 w-full max-w-[680px] lg:-mr-8 lg:max-w-[720px]">
            <ToothExperience enabled={site.features.liveTooth} />
            <p className="pointer-events-none absolute bottom-4 left-5 font-label text-[0.7rem] uppercase tracking-[0.2em] text-cream/65 sm:left-8">A considered starting point</p>
          </div>
        </Container>
        <div className="pointer-events-none absolute bottom-0 left-0 h-px w-1/2 bg-gold/50" />
      </section>
    </HeroScrollMotion>
  );
}
