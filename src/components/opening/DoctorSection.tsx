// DoctorSection is the opaque page that physically covers the opening scene during the doctor reveal.
import { clinicOpeningContent } from "@/content/clinic";
import styles from "@/components/opening/opening-experience.module.css";

export function DoctorSection() {
  const { doctor } = clinicOpeningContent;
  return (
    <section id="doctor" className={styles.doctorScene} data-opening-tone="ivory" aria-labelledby="opening-doctor-title">
      <div className={styles.doctorSceneInner}>
        <h2 id="opening-doctor-title" className={styles.doctorTitle}>
          Meet your doctor.
        </h2>
        <div className={styles.doctorPortrait} role="img" aria-label={doctor.portraitLabel}>
          <span>{doctor.portraitLabel}</span>
        </div>
        <div className={styles.doctorCopy}>
          <h3>Dr. Venkatesh <span>M J</span></h3>
          <p>{doctor.qualifications}</p>
          <p>{doctor.biography}</p>
        </div>
      </div>
    </section>
  );
}
