// TeamSection presents only the confirmed primary clinic contact and never invents a profile or credential.
import type { Doctor, SiteContent } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function TeamSection({ doctors, site }: { doctors: Doctor[]; site: SiteContent }) {
  if (doctors.length > 0) {
    return null;
  }
  return (
    <section id="contact" className="bg-ivory py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <Reveal>
          <SectionHeading eyebrow="Your clinic contact" title="A direct line to the clinic." />
        </Reveal>
        <Reveal delay={120}>
          <div className="border-t border-gold pt-7">
            <p className="eyebrow text-burgundy">Primary clinic contact</p>
            <p className="mt-5 font-display text-5xl leading-none text-burgundy sm:text-6xl">{site.primaryContact}</p>
            <p className="mt-6 max-w-xl text-lg leading-8 text-espresso">
              The clinic team can help you discuss an appointment enquiry and confirm the next appropriate step.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
