// Opening motion values are centralised here so screen-space targets can be tuned without touching scene markup.
export const openingMotionConfig = {
  mobileStoryDistance: 1.8,
  desktopStoryDistance: 1.8,
  phases: {
    cueFade: [0.12, 0.18],
    actionFade: [0.12, 0.24],
    brandFade: [0.12, 0.44],
    careLines: [
      [0.4, 0.54],
      [0.45, 0.59],
      [0.5, 0.64],
    ],
    sceneSettle: [0.64, 0.72],
  },
  tooth: {
    poseA: { scale: 0.7, x: 0.08, y: -0.18, yaw: -0.16 },
    poseB: { scale: 1, x: -0.02, y: 0.02, yaw: 0.14 },
    transition: [0.12, 0.72],
    doctorScaleReduction: 0.1,
    doctorLift: 0.15,
  },
} as const;

export type OpeningToothPose = {
  scale: number;
  x: number;
  y: number;
  yaw: number;
  visible: boolean;
};
