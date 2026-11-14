// CareScene owns the exact three-line care message while the parent controls its scroll phase.
import styles from "@/components/opening/opening-experience.module.css";

export function CareScene({ active }: { active: boolean }) {
  return (
    <section id="care-opening" className={styles.careScene} data-opening-tone="burgundy" aria-labelledby="opening-care-title">
      <div className={styles.careSceneInner}>
        <h2 id="opening-care-title" className={styles.careTitle} aria-hidden={!active}>
          <span>Care</span>
          <span>in every</span>
          <span>detail.</span>
        </h2>
        <div data-testid="care-tooth-reserve" className={styles.careToothReserve} aria-hidden="true" />
      </div>
    </section>
  );
}
