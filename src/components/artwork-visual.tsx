import type { Visual } from "@/lib/data";
import type { CSSProperties } from "react";

type ArtworkVisualProps = {
  visual: Visual;
  label: string;
  className?: string;
  style?: CSSProperties;
};

export function ArtworkVisual({
  visual,
  label,
  className = "",
  style,
}: ArtworkVisualProps) {
  const [toneOne, toneTwo, toneThree, ink] = visual.colors;

  return (
    <div
      role="img"
      aria-label={label}
      data-pattern={visual.pattern}
      className={`artwork-visual ${className}`}
      style={
        {
          "--tone-one": toneOne,
          "--tone-two": toneTwo,
          "--tone-three": toneThree,
          "--ink": ink,
          ...style,
        } as CSSProperties
      }
    />
  );
}
