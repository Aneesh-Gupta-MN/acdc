// ToothFallback preserves the hero composition when WebGL, JavaScript, loading, or motion policy prevents live 3D.
import Image from "next/image";

export function ToothFallback() {
  return (
    <div data-testid="tooth-fallback" className="relative aspect-square w-full overflow-hidden rounded-sm border border-gold/50 bg-burgundy-deep shadow-2xl">
      <Image src="/images/3d/tooth-fallback.webp" alt="" className="h-full w-full object-cover" width={900} height={900} priority />
    </div>
  );
}
