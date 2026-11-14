// VisitSection renders only the verified phone pathway while optional address, map, hours, and WhatsApp stay hidden.
import type { SiteContent } from "@/types/content";
import { phoneHref } from "@/lib/contact-links";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactAction } from "@/components/ui/ContactAction";
import { Reveal } from "@/components/motion/Reveal";

export function VisitSection({ site }: { site: SiteContent }) {
  const phone = phoneHref(site.phone);
  return (
    <section className="bg-cream py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <Reveal>
          <SectionHeading eyebrow="Visit and contact" title="Keep the first step simple." description="Call the clinic directly to discuss your enquiry and confirm the next appropriate step." />
        </Reveal>
        <Reveal delay={120}>
          <div className="border-t border-gold pt-7">
            <div>
              <p className="eyebrow text-burgundy">Verified phone</p>
              {phone ? <ContactAction href={phone} label="Call the clinic" className="mt-5" /> : null}
              <p className="mt-5 text-sm leading-6 text-espresso">{site.phone}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
