"use client";

// ToothCanvas contains only the lazy WebGL scene and keeps essential clinic information outside the canvas.
import { Component, Suspense, type ErrorInfo, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";
import { ToothLighting } from "@/components/three/ToothLighting";
import { ToothModel } from "@/components/three/ToothModel";
import { ToothFallback } from "@/components/three/ToothFallback";
import type { MutableRefObject } from "react";
import type { OpeningToothPose } from "@/components/opening/openingMotion.config";
import styles from "@/components/opening/opening-experience.module.css";
import { toothAppearanceConfig } from "@/components/three/toothAppearance.config";

class CanvasSceneErrorBoundary extends Component<{ children: ReactNode; onError?: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.();
    console.error("The supplied third_molar.glb failed to render.", error, info);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function ToothCanvas({ motionRef, onError, onReady, visible }: { motionRef: MutableRefObject<OpeningToothPose>; onError?: () => void; onReady?: () => void; visible: boolean }) {
  return (
    <div className={styles.toothCanvas} data-testid="opening-tooth-canvas" aria-hidden="true">
      <Canvas
        frameloop={visible ? "always" : "demand"}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.8], fov: 35, near: 0.01, far: 100 }}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power", preserveDrawingBuffer: false }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.outputColorSpace = SRGBColorSpace;
          gl.toneMapping = ACESFilmicToneMapping;
          gl.toneMappingExposure = toothAppearanceConfig.renderer.exposure;
        }}
        style={{ background: "transparent" }}
      >
        <CanvasSceneErrorBoundary onError={onError}>
          <Suspense fallback={null}>
            <ToothLighting />
            <ToothModel motionRef={motionRef} onReady={onReady} visible={visible} />
          </Suspense>
        </CanvasSceneErrorBoundary>
      </Canvas>
      <noscript><ToothFallback /></noscript>
    </div>
  );
}
