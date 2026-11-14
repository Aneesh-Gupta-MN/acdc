// Reversible website presentation for the verified original third_molar.glb.
// Source channel audit: one mesh/material; root/crown colour is baked into baseColorTexture.
// The derived map remaps that texture's luminance into these warm ivory endpoints while
// retaining its UV detail. The embedded normal and metallic/roughness/occlusion maps remain.
export const toothAppearanceConfig = {
  source: {
    mesh: "Third_Molar_WN_UV:Group50179_Third_Molar_MTL_0",
    material: "Third_Molar_MTL",
    baseColorFactor: [0.8325087403, 0.8325087403, 0.8325087403, 1],
    rootColourChannel: "embedded baseColorTexture JPEG",
    hasVertexColors: false,
  },
  presentation: {
    baseColorMap: "/images/3d/third-molar-presentation-basecolor.webp",
    rootTint: "#d9cbb6",
    crownTint: "#f3eadc",
    textureInputLevels: [0.45, 0.9],
    metalness: 0,
    roughness: 0.92,
    envMapIntensity: 0.35,
  },
  renderer: {
    exposure: 0.9,
  },
  lighting: {
    ambient: { color: "#f6ecdd", intensity: 0.72 },
    key: { color: "#fff7ea", intensity: 1.55, position: [3.4, 4.2, 4.8] },
    fill: { color: "#ead8c3", intensity: 0.42, position: [-3.5, 1.5, 3] },
    rim: { color: "#f4dfc2", intensity: 0.48, position: [2.5, 2.8, -3.5] },
  },
  motion: {
    idleYawDegrees: 8,
    idlePeriodSeconds: 14,
  },
} as const;
