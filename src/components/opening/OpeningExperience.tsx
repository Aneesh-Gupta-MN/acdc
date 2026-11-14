"use client";

// OpeningExperience owns the single sticky stage, story geometry, and one persistent tooth canvas.
import { useRef } from "react";
import { BrandScene } from "@/components/opening/BrandScene";
import { CareScene } from "@/components/opening/CareScene";
import { DoctorSection } from "@/components/opening/DoctorSection";
import { ExperienceHeader } from "@/components/opening/ExperienceHeader";
import { OpeningBackground } from "@/components/opening/OpeningBackground";
import ToothExperience from "@/components/three/ToothExperience";
import { useOpeningMotion } from "@/hooks/useOpeningMotion";
import styles from "@/components/opening/opening-experience.module.css";

export function OpeningExperience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const { brandInteractive, careActive, debugEnabled, headerBacked, headerTone, reducedMotion, setToothStatus, snapshot, toothMotion, toothVisible } = useOpeningMotion(trackRef, stageRef);

  return (
    <div className={styles.openingExperience} data-reduced-motion={reducedMotion}>
      <ExperienceHeader backed={headerBacked} tone={headerTone} />
      <div ref={trackRef} className={styles.storyTrack}>
        <div ref={stageRef} className={styles.storyStage}>
          <OpeningBackground />
          <div className={styles.toothGroundShadow} aria-hidden="true" />
          <ToothExperience enabled motionRef={toothMotion} onStatus={setToothStatus} visible={toothVisible} />
          <div className={styles.foregroundFold} aria-hidden="true" />
          <BrandScene interactive={brandInteractive} />
          <CareScene active={careActive} />
          {debugEnabled ? (
            <aside className={styles.motionDebug} aria-label="Opening motion debug">
              <span>p {snapshot.progress.toFixed(2)}</span>
              <span>q {snapshot.doctorProgress.toFixed(2)}</span>
              <span>{snapshot.activePhase}</span>
              <span>stage {Math.round(snapshot.stageHeight)}px</span>
              <span>distance {Math.round(snapshot.storyDistance)}px</span>
              <span>{snapshot.toothStatus}</span>
            </aside>
          ) : null}
        </div>
        <DoctorSection />
      </div>
    </div>
  );
}
