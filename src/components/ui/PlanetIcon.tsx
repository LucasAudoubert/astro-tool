// ============================================
// PlanetIcon — Renders a planet PNG icon
// ============================================

interface PlanetIconProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

export default function PlanetIcon({
  src,
  alt,
  size = 24,
  className,
}: PlanetIconProps) {
  if (!src) return null;
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={className}
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        display: "inline-block",
        verticalAlign: "middle",
      }}
      draggable={false}
    />
  );
}