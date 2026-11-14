// The not-found route keeps visitors inside the public information and phone-contact journey.
import Link from "next/link";
import { phoneHref } from "@/lib/contact-links";
import { siteContent } from "@/content/site";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-ivory px-6 text-center text-charcoal">
      <div className="max-w-lg">
        <p className="eyebrow mb-4 text-burgundy">All Care Dental Centre</p>
        <h1 className="section-title mb-6">This page is not here.</h1>
        <p className="mb-8 text-lg">Return to the clinic overview or call the clinic to discuss your next step.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link className="min-h-touch rounded-sm bg-burgundy px-6 py-3 font-semibold text-ivory" href="/">
            Return home
          </Link>
          {phoneHref(siteContent.phone) ? (
            <a className="min-h-touch rounded-sm border border-burgundy px-6 py-3 font-semibold text-burgundy" href={phoneHref(siteContent.phone) ?? undefined}>
              Call the clinic
            </a>
          ) : null}
        </div>
      </div>
    </main>
  );
}
