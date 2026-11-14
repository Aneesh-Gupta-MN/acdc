"use client";

import { useEffect, useState } from "react";
import styles from "@/components/opening/opening-background.module.css";

const backgrounds = [
  "/images/opening/all-care-ivory-background.webp",
  "/images/opening/all-care-burgundy-background.webp",
] as const;

export function OpeningBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    const decode = (src: string) => {
      const image = new Image();
      image.src = src;
      return image.decode().catch(
        () =>
          new Promise<void>((resolve) => {
            image.onload = () => resolve();
            image.onerror = () => resolve();
          }),
      );
    };

    Promise.all(backgrounds.map(decode)).then(() => {
      if (active) setReady(true);
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className={styles.backgrounds} data-ready={ready} aria-hidden="true">
      <picture className={styles.layer} style={{ opacity: "var(--ivory-opacity)" }}>
        <source srcSet={backgrounds[0]} type="image/webp" />
        <img src="/images/opening/all-care-ivory-background.png" alt="" decoding="async" fetchPriority="high" />
      </picture>
      <picture className={`${styles.layer} ${styles.burgundy}`} style={{ opacity: "var(--burgundy-opacity)" }}>
        <source srcSet={backgrounds[1]} type="image/webp" />
        <img src="/images/opening/all-care-burgundy-background.png" alt="" decoding="async" fetchPriority="high" />
      </picture>
    </div>
  );
}
