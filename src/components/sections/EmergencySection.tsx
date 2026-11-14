// EmergencySection gives the approved urgent-care instruction without implying a separate number or 24-hour service.
import type { SiteContent } from "@/types/content";
import { phoneHref } from "@/lib/contact-links";
import { Container } from "@/components/ui/Container";
import { ContactAction } from "@/components/ui/ContactAction";

export function EmergencySection({ site }: { site: SiteContent }) {
  const phone = phoneHref(site.phone);
  return (
    <section className="bg-burgundy-deep py-16 text-ivory sm:py-20">
      <Container className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow text-gold">Urgent dental concern?</p>
          <p className="mt-4 text-lg leading-8 text-cream">If you have an urgent dental concern, please call the clinic directly. Availability and the next appropriate step will be confirmed by the clinic.</p>
        </div>
        <ContactAction href={phone} label="Call the clinic" inverse className="shrink-0" />
      </Container>
    </section>
  );
}
