// BrandScene owns the semantic opening heading, heritage line, direct phone action, and scroll cue.
import { clinicOpeningContent } from "@/content/clinic";
import styles from "@/components/opening/opening-experience.module.css";

export function BrandScene({ interactive }: { interactive: boolean }) {
  return (
    <section id="top" className={styles.brandScene} data-opening-tone="ivory" aria-labelledby="opening-brand-title">
      <div className={styles.brandSceneInner}>
        <div className={styles.brandSceneContent}>
          <h1 id="opening-brand-title" className={styles.brandTitle}>
            <span>All Care</span>
            <span>Dental</span>
            <span>Centre</span>
          </h1>
          <p className={styles.heritage}>{clinicOpeningContent.heritage}</p>
        </div>
        <div data-testid="opening-tooth-reserve" className={styles.brandToothReserve} aria-hidden="true" />
        <a className={styles.callAction} href="tel:+919844069010" tabIndex={interactive ? 0 : -1}>
          Call the clinic
        </a>
        <div className={styles.scrollCue} aria-hidden="true">
          <span>Scroll to explore</span>
          <i />
        </div>
      </div>
    </section>
  );
}
