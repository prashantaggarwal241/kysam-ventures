import Svg, { Rect, Circle, Path } from 'react-native-svg';

export interface LogoProps {
  size?: number;
}

// Viewbox: 64 x 48 (landscape)
// Elements (in z-order, back to front):
//   1. Swoosh back layer  – #7CC3E8 (blueLighter)
//   2. Swoosh front layer – #4FA3D9 (blueLight)
//   3. Building bars      – #0A2340, #0F3A66, #1C87C9
//   4. Sun outer circle   – #FFC266 (amberOuter)
//   5. Sun inner circle   – #F5A623 (amber)
const VB_W = 64;
const VB_H = 48;

export default function Logo({ size = 40 }: LogoProps) {
  const w = size * (VB_W / VB_H);
  const h = size;

  return (
    <Svg width={w} height={h} viewBox={`0 0 ${VB_W} ${VB_H}`} accessibilityRole="image" accessibilityLabel="KySam Ventures logo">
      {/* Swoosh back layer — wide arc sweeping lower-left to upper-right */}
      <Path
        d="M 0 36 C 14 26 32 22 64 27 L 64 31 C 32 26 14 31 0 41 Z"
        fill="#7CC3E8"
      />
      {/* Swoosh front layer — narrower arc slightly above */}
      <Path
        d="M 0 39 C 14 30 32 26 64 30 L 64 33 C 32 29 14 34 0 43 Z"
        fill="#4FA3D9"
      />
      {/* Building bars — bottom-aligned at y=48 */}
      <Rect x={4}  y={10} width={11} height={38} rx={1.5} fill="#0A2340" />
      <Rect x={17} y={18} width={11} height={30} rx={1.5} fill="#0F3A66" />
      <Rect x={30} y={25} width={11} height={23} rx={1.5} fill="#1C87C9" />
      {/* Sun outer */}
      <Circle cx={52} cy={14} r={11} fill="#FFC266" />
      {/* Sun inner */}
      <Circle cx={52} cy={14} r={7}  fill="#F5A623" />
    </Svg>
  );
}
