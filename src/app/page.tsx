// Home page composition stays intentionally small; sections own their content presentation and enhancement boundaries.
import { siteContent } from "@/content/site";
import { treatments } from "@/content/treatments";
import { doctors } from "@/content/doctors";
import { reviews } from "@/content/reviews";
import { validateSiteContent, validateTreatments } from "@/lib/content-validation";
import { Footer } from "@/components/layout/Footer";
import { AppointmentSection } from "@/components/sections/AppointmentSection";
import { CarePhilosophySection } from "@/components/sections/CarePhilosophySection";
import { EmergencySection } from "@/components/sections/EmergencySection";
import { PatientProofSection } from "@/components/sections/PatientProofSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { TreatmentsSection } from "@/components/sections/TreatmentsSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { VisitSection } from "@/components/sections/VisitSection";
import { OpeningExperience } from "@/components/opening/OpeningExperience";

validateSiteContent(siteContent);
validateTreatments(treatments);

export default function HomePage() {
  return (
    <>
      <main>
        <OpeningExperience />
        <TrustSection site={siteContent} />
        <TreatmentsSection treatments={treatments} />
        <CarePhilosophySection />
        <TeamSection doctors={doctors} site={siteContent} />
        <PatientProofSection reviews={reviews} enabled={siteContent.features.reviews} />
        <VisitSection site={siteContent} />
        <EmergencySection site={siteContent} />
        <AppointmentSection site={siteContent} />
      </main>
      <Footer site={siteContent} treatments={treatments} />
    </>
  );
}
