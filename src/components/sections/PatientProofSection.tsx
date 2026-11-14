// PatientProofSection is intentionally absent until verified reviews or testimonials are supplied and approved.
import type { Review } from "@/types/content";

export function PatientProofSection({ reviews, enabled }: { reviews: Review[]; enabled: boolean }) {
  const approved = enabled ? reviews.filter((review) => review.approved) : [];
  if (approved.length === 0) return null;
  return (
    <section aria-labelledby="patient-proof-title" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <p className="eyebrow text-burgundy">Patient proof</p>
        <h2 id="patient-proof-title" className="section-title mt-4 text-burgundy">What patients have shared.</h2>
        <div className="mt-12 grid gap-8">
          {approved.map((review) => <blockquote key={review.quote} className="font-display text-3xl text-burgundy">“{review.quote}”</blockquote>)}
        </div>
      </div>
    </section>
  );
}
