// TrustSection provides the approved clinic introduction without exposing unconfirmed heritage or credibility claims.
import type { SiteContent } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function TrustSection({ site }: { site: SiteContent }) {
  return (
    <section id="about" className="bg-ivory py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
        <Reveal>
          <SectionHeading eyebrow="A clear beginning" title="Dental care, explained with care." />
        </Reveal>
        <Reveal delay={120}>
          <div className="border-l border-gold pl-6 sm:pl-10">
            <p className="max-w-3xl font-display text-3xl leading-tight text-burgundy sm:text-5xl">
              {site.clinicName} is a calm, patient-friendly place to begin a conversation about your oral health.
            </p>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-espresso">
              The clinic can help you understand the available treatment paths and what to discuss next. Call directly so the team can listen, answer questions, and guide the next appropriate step.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
