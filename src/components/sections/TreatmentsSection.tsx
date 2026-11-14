// TreatmentsSection maps the approved nine-category collection to an editorial, readable treatment grid.
import type { Treatment } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TreatmentCard } from "@/components/ui/TreatmentCard";
import { Reveal } from "@/components/motion/Reveal";

export function TreatmentsSection({ treatments }: { treatments: Treatment[] }) {
  return (
    <section id="treatments" className="bg-cream py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Treatment paths"
            title="A considered view of the care available."
            description="Explore the clinic’s initial treatment categories. Recommendations are made after an assessment of each patient’s needs."
          />
        </Reveal>
        <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {treatments.map((treatment, index) => (
            <Reveal key={treatment.slug} delay={index * 45}>
              <TreatmentCard treatment={treatment} index={index} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
