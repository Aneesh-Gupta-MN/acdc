import { toothAppearanceConfig } from "@/components/three/toothAppearance.config";

// Soft neutral illumination keeps enamel broad and avoids turning the roots into brand gold.
export function ToothLighting() {
  const { ambient, key, fill, rim } = toothAppearanceConfig.lighting;
  return (
    <>
      <ambientLight intensity={ambient.intensity} color={ambient.color} />
      <directionalLight intensity={key.intensity} color={key.color} position={key.position} />
      <directionalLight intensity={fill.intensity} color={fill.color} position={fill.position} />
      <directionalLight intensity={rim.intensity} color={rim.color} position={rim.position} />
    </>
  );
}
