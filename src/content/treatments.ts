// The initial treatment collection contains only the nine approved categories and patient-friendly descriptions.
import type { Treatment } from "@/types/content";

export const treatments: Treatment[] = [
  {
    slug: "diagnosis-and-radiology",
    name: "Diagnosis and radiology",
    description:
      "Diagnostic assessment supported by OPG, CBCT and RVG imaging. These services help the clinic examine dental concerns and plan appropriate treatment based on each patient’s needs.",
  },
  {
    slug: "scaling-cleaning-and-brightening",
    name: "Scaling, cleaning and brightening",
    description:
      "Professional scaling and teeth cleaning help remove plaque, tartar and surface stains. The clinic can also discuss suitable brightening options after assessing your oral health.",
  },
  {
    slug: "root-canal-treatment-and-fillings",
    name: "Root canal treatment and fillings",
    description:
      "Root canal treatment may help manage an infected or damaged tooth and preserve it where clinically appropriate. Dental fillings are used to restore areas affected by decay or minor damage. The clinic will assess the tooth and explain the recommended treatment.",
  },
  {
    slug: "crowns-bridges-and-dentures",
    name: "Crowns, bridges and dentures",
    description:
      "Crowns, bridges and dentures can restore damaged or missing teeth and support everyday function. Each restoration is planned according to the patient’s oral condition, comfort and treatment needs.",
  },
  {
    slug: "orthodontics",
    name: "Orthodontics",
    description:
      "Orthodontic care includes assessment and treatment planning for tooth and bite alignment. Available options may include braces or aligners depending on clinical suitability.",
  },
  {
    slug: "pediatric-dentistry",
    name: "Pediatric dentistry",
    description:
      "Dental care for children includes preventive guidance, routine assessment and age-appropriate treatment. The clinic aims to make visits clear, calm and comfortable for children and their families.",
  },
  {
    slug: "cosmetic-dentistry",
    name: "Cosmetic dentistry",
    description:
      "Cosmetic dental services may include teeth whitening, veneers and selected alignment options. Recommendations are made after assessing oral health, suitability and the patient’s goals.",
  },
  {
    slug: "oral-surgery",
    name: "Oral surgery",
    description:
      "Oral surgery services include tooth extractions and dental implant assessment and treatment. The clinic will explain the procedure, preparation, recovery considerations and available alternatives before treatment.",
  },
  {
    slug: "gum-care-and-surgery",
    name: "Gum care and surgery",
    description:
      "Gum care may include treatment for periodontal disease and surgical procedures when clinically required. The recommended approach depends on an assessment of gum health and the supporting tissues around the teeth.",
  },
];
