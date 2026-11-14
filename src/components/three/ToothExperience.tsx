"use client";

// ToothExperience selects live 3D only when the browser and motion preference make it safe, with a stable fallback otherwise.
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";
import { ToothFallback } from "@/components/three/ToothFallback";
import type { MutableRefObject } from "react";
import type { OpeningToothPose } from "@/components/opening/openingMotion.config";
import { openingMotionConfig } from "@/components/opening/openingMotion.config";
import styles from "@/components/opening/opening-experience.module.css";

const ToothCanvas = dynamic<{ motionRef: MutableRefObject<OpeningToothPose>; onError?: () => void; onReady?: () => void; visible: boolean }>(() => import("@/components/three/ToothCanvas"), {
  ssr: false,
  loading: () => <div className={styles.toothCanvas}><ToothFallback /></div>,
});

export function ToothExperience({ enabled, motionRef, onStatus, visible = true }: { enabled: boolean; motionRef?: MutableRefObject<OpeningToothPose>; onStatus?: (status: "loading" | "ready" | "fallback") => void; visible?: boolean }) {
  const internalMotion = useRef<OpeningToothPose>({ ...openingMotionConfig.tooth.poseA, visible: true });
  const activeMotion = motionRef ?? internalMotion;
  const reducedMotion = useReducedMotion();
  const webgl = useWebGLSupport();
  const [failed, setFailed] = useState(false);
  const handleError = useCallback(() => {
    setFailed(true);
    onStatus?.("fallback");
  }, [onStatus]);
  const handleReady = useCallback(() => onStatus?.("ready"), [onStatus]);
  useEffect(() => {
    if (!enabled || reducedMotion || webgl !== true) onStatus?.("fallback");
    else onStatus?.("loading");
  }, [enabled, onStatus, reducedMotion, webgl]);
  if (!enabled || reducedMotion || webgl !== true || failed) return <div className={styles.toothCanvas}><ToothFallback /></div>;
  return <ToothCanvas motionRef={activeMotion} onError={handleError} onReady={handleReady} visible={visible} />;
}

export default ToothExperience;
