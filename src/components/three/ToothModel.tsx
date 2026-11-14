// ToothModel bakes nested GLB transforms once, then keeps scroll and idle rotation on separate groups.
import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import { Box3, Group, Mesh, MeshStandardMaterial, SRGBColorSpace, Vector3 } from "three";
import type { MutableRefObject } from "react";
import type { OpeningToothPose } from "@/components/opening/openingMotion.config";
import { toothAppearanceConfig } from "@/components/three/toothAppearance.config";

export const MODEL_PATH = "/models/third_molar.glb";

export function ToothModel({ motionRef, onReady, visible }: { motionRef: MutableRefObject<OpeningToothPose>; onReady?: () => void; visible: boolean }) {
  const { scene } = useGLTF(MODEL_PATH);
  const presentationMapSource = useTexture(toothAppearanceConfig.presentation.baseColorMap);
  const scrollGroup = useRef<Group>(null);
  const idleGroup = useRef<Group>(null);
  const { invalidate } = useThree();
  const sourceAppearance = useMemo(
    () => process.env.NODE_ENV !== "production" && new URLSearchParams(window.location.search).get("toothSource") === "1",
    [],
  );
  const presentationMap = useMemo(() => {
    const texture = presentationMapSource.clone();
    texture.colorSpace = SRGBColorSpace;
    texture.flipY = false;
    texture.needsUpdate = true;
    return texture;
  }, [presentationMapSource]);
  const normalised = useMemo(() => {
    const source = scene.clone(true);
    source.updateMatrixWorld(true);
    const bounds = new Box3().setFromObject(source);
    const size = bounds.getSize(new Vector3());
    const center = bounds.getCenter(new Vector3());
    const normalisationScale = 2.55 / (Math.max(size.x, size.y, size.z) || 1);
    const root = new Group();

    source.traverse((object) => {
      if (!(object as Mesh).isMesh) return;
      const sourceMesh = object as Mesh;
      const geometry = sourceMesh.geometry.clone();
      // Baking nested source transforms makes bounds and camera framing stable for this asset.
      geometry.applyMatrix4(sourceMesh.matrixWorld);
      geometry.translate(-center.x, -center.y, -center.z);
      // Clone every material so the shared useGLTF cache remains untouched.
      const materials = (Array.isArray(sourceMesh.material) ? sourceMesh.material : [sourceMesh.material]).map((sourceMaterial) => {
        const material = sourceMaterial.clone();
        if (!sourceAppearance && material instanceof MeshStandardMaterial) {
          material.map = presentationMap;
          material.color.set("#ffffff");
          material.metalness = toothAppearanceConfig.presentation.metalness;
          material.roughness = toothAppearanceConfig.presentation.roughness;
          material.envMapIntensity = toothAppearanceConfig.presentation.envMapIntensity;
          material.userData.presentationOverride = {
            changed: ["baseColorTexture", "baseColorFactor", "metalnessFactor", "roughnessFactor", "envMapIntensity"],
            preserved: ["normalMap", "roughnessMap", "metalnessMap", "aoMap", "geometry", "uv", "normal", "tangent"],
          };
          material.needsUpdate = true;
        }
        return material;
      });
      const mesh = new Mesh(geometry, materials.length === 1 ? materials[0] : materials);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.frustumCulled = false;
      root.add(mesh);
    });

    root.scale.setScalar(normalisationScale);
    return root;
  }, [presentationMap, scene, sourceAppearance]);

  useEffect(() => {
    onReady?.();
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      if (now - start < 6500) {
        invalidate();
        frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [invalidate, onReady]);

  useFrame(({ clock }) => {
    if (!scrollGroup.current || !idleGroup.current) return;
    const pose = motionRef.current;
    scrollGroup.current.visible = visible && pose.visible;
    if (!scrollGroup.current.visible) return;
    // The idle group owns only bounded yaw; scrollGroup owns the deliberate pose change.
    const idleAmplitude = (toothAppearanceConfig.motion.idleYawDegrees * Math.PI) / 180;
    const idleFrequency = (Math.PI * 2) / toothAppearanceConfig.motion.idlePeriodSeconds;
    idleGroup.current.rotation.y = Math.sin(clock.elapsedTime * idleFrequency) * idleAmplitude;
    scrollGroup.current.position.set(pose.x, pose.y, 0);
    scrollGroup.current.rotation.y = pose.yaw;
    scrollGroup.current.scale.setScalar(pose.scale);
    invalidate();
  });

  return (
    <group ref={scrollGroup}>
      <group ref={idleGroup}>
        <primitive object={normalised} />
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_PATH);
useTexture.preload(toothAppearanceConfig.presentation.baseColorMap);
