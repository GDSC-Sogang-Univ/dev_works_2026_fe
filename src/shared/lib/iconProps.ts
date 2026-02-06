export type NamedSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type IconSize = NamedSize | number;

const SIZE_MAP: Record<NamedSize, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
  "2xl": 48,
};

const STROKE_BY_PX: Record<number, number> = {
  16: 1.4,
  20: 1.4,
  24: 1.6,
  32: 2,
  40: 2.5,
  48: 3,
};

export function iconPx(size: IconSize): number {
  return typeof size === "number" ? size : SIZE_MAP[size];
}

export function iconStroke(px: number): number {
  if (px in STROKE_BY_PX) return STROKE_BY_PX[px];
  const keys = Object.keys(STROKE_BY_PX)
    .map(Number)
    .sort((a, b) => a - b);
  const nearest = keys.reduce(
    (p, c) => (Math.abs(c - px) < Math.abs(p - px) ? c : p),
    keys[0],
  );
  return STROKE_BY_PX[nearest];
}

/** lucide 아이콘에 바로 펼쳐 넣을 수 있는 props 생성 */
export function iconProps(
  size: IconSize = "md",
  opts?: { strokeWidth?: number },
) {
  const px = iconPx(size);
  return {
    width: px,
    height: px,
    strokeWidth: opts?.strokeWidth ?? iconStroke(px),
  } as const;
}
