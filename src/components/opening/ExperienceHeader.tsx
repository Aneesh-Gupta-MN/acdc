"use client";

// ExperienceHeader is the single compact brand/navigation layer shared by the opening scenes.
import Image from "next/image";
import { navigationItems } from "@/content/navigation";
import { clinicOpeningContent } from "@/content/clinic";
import { phoneHref } from "@/lib/contact-links";
import { MobileMenu } from "@/components/layout/MobileMenu";
import styles from "@/components/opening/opening-experience.module.css";

export function ExperienceHeader({ backed = false, tone = "ivory" }: { backed?: boolean; tone?: "ivory" | "burgundy" }) {
  return (
    <header className={styles.experienceHeader} data-backed={backed} data-tone={tone}>
      <a className={styles.experienceBrand} href="#top" aria-label="All Care Dental Centre home">
        <Image
          src="/brand/all-care-dental-mark-gold.png"
          alt=""
          width={1123}
          height={1401}
          priority
          className={styles.experienceMark}
        />
        <span>{clinicOpeningContent.clinicName}</span>
      </a>
      <MobileMenu
        navigation={navigationItems}
        phoneHref={phoneHref(clinicOpeningContent.phone)}
        tone={tone === "ivory" ? "ivory" : "dark"}
      />
    </header>
  );
}
