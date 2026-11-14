// Footer closes the public journey with verified identity, phone contact, anchor navigation, and no invented legal facts.
import type { SiteContent, Treatment } from "@/types/content";
import Image from "next/image";
import { navigationItems } from "@/content/navigation";
import { phoneHref } from "@/lib/contact-links";
import { Container } from "@/components/ui/Container";

export function Footer({ site, treatments }: { site: SiteContent; treatments: Treatment[] }) {
  const phone = phoneHref(site.phone);
  return (
    <footer className="bg-burgundy-deep py-14 text-cream">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.25fr_0.75fr_1fr]">
          <div>
            <Image src="/brand/logo-gold-on-burgundy.svg" alt={site.clinicName} width={260} height={40} />
            <p className="mt-7 max-w-sm font-display text-3xl leading-tight text-ivory">Thoughtful care. Considered dentistry.</p>
          </div>
          <div>
            <p className="eyebrow mb-4 text-gold">Explore</p>
            <nav aria-label="Footer navigation" className="grid gap-2 text-sm">
              {navigationItems.map((item) => (
                <a key={item.href} className="py-1 hover:text-gold" href={item.href}>
                  {item.label}
                </a>
              ))}
              <a className="py-1 hover:text-gold" href="#appointment">Request an appointment</a>
            </nav>
          </div>
          <div>
            <p className="eyebrow mb-4 text-gold">Treatments</p>
            <ul className="grid gap-2 text-sm">
              {treatments.slice(0, 5).map((treatment) => <li key={treatment.slug}>{treatment.name}</li>)}
            </ul>
            {phone ? (
              <a className="mt-7 inline-flex min-h-touch items-center border-b border-gold py-2 font-semibold text-ivory hover:text-gold" href={phone}>
                {site.phone}
              </a>
            ) : null}
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-gold/30 pt-6 text-xs text-cream/75 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.clinicName}</p>
          <p>Care in every detail.</p>
        </div>
      </Container>
    </footer>
  );
}
