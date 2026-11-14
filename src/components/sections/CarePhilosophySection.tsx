// CarePhilosophySection explains the intended patient experience without claiming outcomes or clinical guarantees.
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const principles = [
  ["01", "Listen first", "Your care conversation should begin with your concerns, questions, comfort, and priorities."],
  ["02", "Make the next step clear", "The clinic can explain the options and the recommended next step after assessing your needs."],
  ["03", "Keep the experience considered", "Clear language and a calm pace help make a dental visit easier to understand."],
] as const;

export function CarePhilosophySection() {
  return (
    <section id="care" className="bg-burgundy py-24 text-ivory sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            tone="light"
            eyebrow="Our approach"
            title="Thoughtful care. Considered dentistry."
            description="A good patient experience is built from clear communication, respectful pacing, and care that reflects the person in front of the clinic team."
          />
        </Reveal>
        <div className="mt-16 grid gap-0 border-t border-gold/50 md:grid-cols-3">
          {principles.map(([number, title, description], index) => (
            <Reveal key={number} delay={index * 100}>
              <article className="border-b border-gold/50 py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                <p className="eyebrow text-gold">{number}</p>
                <h3 className="mt-8 font-display text-4xl text-ivory">{title}</h3>
                <p className="mt-5 text-base leading-7 text-cream">{description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
