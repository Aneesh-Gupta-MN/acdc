"use client";

// useWebGLSupport performs a small, non-throwing capability check before attempting to load the 3D bundle.
import { useEffect, useState } from "react";

export function useWebGLSupport(): boolean | null {
  const [supported, setSupported] = useState<boolean | null>(null);
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("webgl") ?? canvas.getContext("experimental-webgl");
      setSupported(Boolean(context));
    } catch {
      setSupported(false);
    }
  }, []);
  return supported;
}
