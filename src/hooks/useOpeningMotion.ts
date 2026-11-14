"use client";

// useOpeningMotion owns native-scroll measurements and writes CSS/WebGL values directly to avoid per-frame React renders.
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { openingMotionConfig, type OpeningToothPose } from "@/components/opening/openingMotion.config";

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smoothstep = (value: number) => value * value * (3 - 2 * value);
const range = (value: number, start: number, end: number) => smoothstep(clamp((value - start) / (end - start)));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export type OpeningMotionSnapshot = {
  progress: number;
  doctorProgress: number;
  activePhase: string;
  stageHeight: number;
  storyDistance: number;
  toothStatus: "loading" | "ready" | "fallback";
};

export function useOpeningMotion(trackRef: React.RefObject<HTMLDivElement | null>, stageRef: React.RefObject<HTMLDivElement | null>) {
  const reducedMotion = useReducedMotion();
  const toothMotion = useRef<OpeningToothPose>({ ...openingMotionConfig.tooth.poseA, visible: true });
  const [headerTone, setHeaderTone] = useState<"ivory" | "burgundy">("ivory");
  const [headerBacked, setHeaderBacked] = useState(false);
  const [brandInteractive, setBrandInteractive] = useState(true);
  const [careActive, setCareActive] = useState(false);
  const [toothVisible, setToothVisible] = useState(true);
  const [snapshot, setSnapshot] = useState<OpeningMotionSnapshot>({ progress: 0, doctorProgress: 0, activePhase: "identity hold", stageHeight: 0, storyDistance: 0, toothStatus: "loading" });
  const [debugEnabled, setDebugEnabled] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      setDebugEnabled(new URLSearchParams(window.location.search).get("openingDebug") === "1");
    }
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    let frame = 0;
    let viewportHeight = window.innerHeight;
    let storyDistance = viewportHeight * openingMotionConfig.mobileStoryDistance;
    let lastBrandInteractive = true;
    let lastCareActive = false;
    let lastToothVisible = true;
    let lastTone: "ivory" | "burgundy" = "ivory";
    let lastHeaderBacked = false;
    const activeSubscriptions = Number(stage.dataset.openingSubscriptions ?? "0") + 1;
    stage.dataset.openingSubscriptions = String(activeSubscriptions);

    const measure = () => {
      viewportHeight = window.innerHeight;
      const desktopDistance = window.matchMedia("(min-width: 700px)").matches;
      storyDistance = viewportHeight * (desktopDistance ? openingMotionConfig.desktopStoryDistance : openingMotionConfig.mobileStoryDistance);
      track.style.setProperty("--story-distance", `${storyDistance}px`);
    };

    const writeFrame = () => {
      frame = 0;
      const trackTop = track.getBoundingClientRect().top + window.scrollY;
      const offset = Math.max(0, window.scrollY - trackTop);
      const progress = reducedMotion ? 0 : clamp(offset / storyDistance);
      const doctorProgress = reducedMotion ? 0 : clamp((offset - storyDistance) / viewportHeight);
      const brandFade = range(progress, ...openingMotionConfig.phases.brandFade);
      const actionFade = range(progress, ...openingMotionConfig.phases.actionFade);
      const cueFade = range(progress, ...openingMotionConfig.phases.cueFade);
      const careArrival = progress >= openingMotionConfig.phases.careLines[0][0];
      const careLines = openingMotionConfig.phases.careLines.map(([start, end]) => range(progress, start, end));
      const doctorCover = range(doctorProgress, 0, 0.6);
      const transition = range(progress, ...openingMotionConfig.tooth.transition);
      const poseA = openingMotionConfig.tooth.poseA;
      const poseB = openingMotionConfig.tooth.poseB;

      stage.style.setProperty("--brand-opacity", reducedMotion ? "1" : `${1 - brandFade}`);
      stage.style.setProperty("--brand-y", reducedMotion ? "0px" : `${-32 * brandFade}px`);
      stage.style.setProperty("--heritage-opacity", reducedMotion ? "1" : `${1 - brandFade}`);
      stage.style.setProperty("--heritage-y", reducedMotion ? "0px" : `${-20 * brandFade}px`);
      stage.style.setProperty("--action-opacity", reducedMotion ? "1" : `${1 - actionFade}`);
      stage.style.setProperty("--action-y", reducedMotion ? "0px" : `${-12 * actionFade}px`);
      stage.style.setProperty("--cue-opacity", reducedMotion ? "1" : `${1 - cueFade}`);
      stage.style.setProperty("--care-opacity", reducedMotion ? "1" : `${Math.max(...careLines)}`);
      stage.style.setProperty("--care-y-1", reducedMotion ? "0px" : `${18 * (1 - careLines[0])}px`);
      stage.style.setProperty("--care-y-2", reducedMotion ? "0px" : `${18 * (1 - careLines[1])}px`);
      stage.style.setProperty("--care-y-3", reducedMotion ? "0px" : `${18 * (1 - careLines[2])}px`);
      stage.style.setProperty("--ivory-opacity", reducedMotion ? "1" : `${1 - range(progress, 0.24, 0.58)}`);
      stage.style.setProperty("--burgundy-opacity", reducedMotion ? "0" : `${range(progress, 0.24, 0.58)}`);
      stage.style.setProperty("--fold-opacity", reducedMotion ? "0" : `${range(progress, 0.48, 0.72)}`);

      const pose = {
        scale: lerp(poseA.scale, poseB.scale, transition) * (1 - openingMotionConfig.tooth.doctorScaleReduction * doctorCover),
        x: lerp(poseA.x, poseB.x, transition),
        y: lerp(poseA.y, poseB.y, transition) + openingMotionConfig.tooth.doctorLift * doctorCover,
        yaw: lerp(poseA.yaw, poseB.yaw, transition),
        visible: doctorProgress < 1,
      };
      toothMotion.current = pose;

      const nextTone: "ivory" | "burgundy" = doctorProgress >= 0.72 || reducedMotion || progress < 0.44 ? "ivory" : "burgundy";
      const nextHeaderBacked = reducedMotion || doctorProgress >= 0.72;
      const nextBrandInteractive = reducedMotion || progress < 0.24;
      const nextCareActive = reducedMotion || careArrival;
      const nextToothVisible = pose.visible;
      if (nextTone !== lastTone) {
        lastTone = nextTone;
        setHeaderTone(nextTone);
      }
      if (nextHeaderBacked !== lastHeaderBacked) {
        lastHeaderBacked = nextHeaderBacked;
        setHeaderBacked(nextHeaderBacked);
      }
      if (nextBrandInteractive !== lastBrandInteractive) {
        lastBrandInteractive = nextBrandInteractive;
        setBrandInteractive(nextBrandInteractive);
      }
      if (nextCareActive !== lastCareActive) {
        lastCareActive = nextCareActive;
        setCareActive(nextCareActive);
      }
      if (nextToothVisible !== lastToothVisible) {
        lastToothVisible = nextToothVisible;
        setToothVisible(nextToothVisible);
      }
      if (debugEnabled) {
        const activePhase = doctorProgress > 0 ? "doctor reveal" : progress < 0.12 ? "identity hold" : progress < 0.4 ? "exit / scale" : progress < 0.64 ? "incoming message" : progress < 0.72 ? "settle" : "message hold";
        stage.dataset.openingPhase = activePhase;
        setSnapshot((previous) => ({ ...previous, progress, doctorProgress, activePhase, stageHeight: viewportHeight, storyDistance }));
      }
    };

    const requestFrame = () => {
      if (!frame) frame = window.requestAnimationFrame(writeFrame);
    };
    const onResize = () => {
      measure();
      requestFrame();
    };
    measure();
    writeFrame();
    window.addEventListener("scroll", requestFrame, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", requestFrame);
      window.removeEventListener("resize", onResize);
      if (frame) window.cancelAnimationFrame(frame);
      const remainingSubscriptions = Math.max(0, Number(stage.dataset.openingSubscriptions ?? "1") - 1);
      if (remainingSubscriptions) stage.dataset.openingSubscriptions = String(remainingSubscriptions);
      else delete stage.dataset.openingSubscriptions;
    };
  }, [debugEnabled, reducedMotion, stageRef, trackRef]);

  // This identity must stay stable: consumers use it to report the one-time loading/ready lifecycle.
  const setToothStatus = useCallback((toothStatus: OpeningMotionSnapshot["toothStatus"]) => {
    setSnapshot((previous) => (previous.toothStatus === toothStatus ? previous : { ...previous, toothStatus }));
  }, []);

  return { brandInteractive, careActive, debugEnabled, headerBacked, headerTone, reducedMotion, setToothStatus, snapshot, toothMotion, toothVisible };
}
