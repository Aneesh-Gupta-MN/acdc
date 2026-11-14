// Header keeps navigation, the verified telephone action, and appointment enquiry visible during visual enhancement.
import { siteContent } from "@/content/site";
import Image from "next/image";
import { navigationItems } from "@/content/navigation";
import { phoneHref } from "@/lib/contact-links";
import { Container } from "@/components/ui/Container";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Header() {
  const phone = phoneHref(siteContent.phone);
  return (
    <header className="sticky top-0 z-40 border-b border-gold/25 bg-burgundy text-ivory">
      <Container className="relative flex min-h-[76px] items-center justify-between gap-6">
        <a className="shrink-0" href="#top" aria-label="All Care Dental Centre home">
          <Image src="/brand/logo-gold-on-burgundy.svg" alt="All Care Dental Centre" width={210} height={32} priority />
        </a>
        <nav aria-label="Primary navigation" className="hidden items-center gap-7 md:flex">
          {navigationItems.map((item) => (
            <a key={item.href} className="text-sm text-cream transition-colors hover:text-gold" href={item.href}>
              {item.label}
            </a>
          ))}
          {phone ? (
            <a className="min-h-touch inline-flex items-center px-2 text-sm font-semibold text-gold" href={phone}>
              Call the clinic
            </a>
          ) : null}
          <a className="inline-flex min-h-touch items-center rounded-sm bg-ivory px-4 py-3 text-sm font-semibold text-burgundy transition-colors hover:bg-cream" href="#appointment">
            Request an appointment
          </a>
        </nav>
        <MobileMenu phoneHref={phone} />
      </Container>
    </header>
  );
}
