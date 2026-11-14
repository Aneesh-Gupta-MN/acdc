// AppointmentSection makes the phone pathway explicit as an enquiry and never suggests a reserved time slot.
import type { SiteContent } from "@/types/content";
import { phoneHref } from "@/lib/contact-links";
import { appointmentGuidance } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { ContactAction } from "@/components/ui/ContactAction";

export function AppointmentSection({ site }: { site: SiteContent }) {
  const phone = phoneHref(site.phone);
  return (
    <section id="appointment" className="bg-ivory py-24 sm:py-32">
      <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="eyebrow text-burgundy">Appointment enquiry</p>
          <h2 className="section-title mt-4 max-w-3xl text-burgundy">Let’s discuss what comes next.</h2>
        </div>
        <div className="border-t border-gold pt-6">
          <p className="text-lg leading-8 text-espresso">{appointmentGuidance}</p>
          <ContactAction href={phone} label="Request an appointment" className="mt-7" />
        </div>
      </Container>
    </section>
  );
}
