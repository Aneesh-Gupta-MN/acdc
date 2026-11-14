// TreatmentCard presents one approved category as scannable patient-facing copy without outcome promises.
import type { Treatment } from "@/types/content";

export function TreatmentCard({ treatment, index }: { treatment: Treatment; index: number }) {
  return (
    <article className="group flex min-h-[18rem] flex-col justify-between border-t border-gold/70 py-6">
      <div>
        <p className="eyebrow mb-5 text-burgundy">{String(index + 1).padStart(2, "0")}</p>
        <h3 className="font-display text-3xl leading-none text-burgundy transition-transform duration-300 group-hover:translate-x-1 sm:text-4xl">
          {treatment.name}
        </h3>
      </div>
      <p className="mt-8 max-w-md text-base leading-7 text-espresso">{treatment.description}</p>
    </article>
  );
}
