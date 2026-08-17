import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, Line, LinearGradient, Path, Pattern, Rect, Stop } from 'react-native-svg';

export interface HeroBackgroundProps {
  /** Accent color variant — 'dark' uses deeper gradient */
  variant?: 'primary' | 'dark';
}

export default function HeroBackground({ variant = 'primary' }: HeroBackgroundProps) {
  const gradEnd = variant === 'dark' ? '#071A30' : '#0F2A4A';
  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 1280 640"
        preserveAspectRatio="xMidYMid slice"
      >
        <Defs>
          {/* Background gradient */}
          <LinearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#0A2340" stopOpacity={1} />
            <Stop offset="100%" stopColor={gradEnd} stopOpacity={1} />
          </LinearGradient>

          {/* Dot grid pattern */}
          <Pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <Circle cx="1.2" cy="1.2" r="1.2" fill="rgba(255,255,255,0.08)" />
          </Pattern>
        </Defs>

        {/* Solid gradient base */}
        <Rect width="1280" height="640" fill="url(#bgGrad)" />

        {/* Dot grid overlay */}
        <Rect width="1280" height="640" fill="url(#dots)" />

        {/* Blue ambient glow — top-right */}
        <Circle cx="1050" cy="100" r="420" fill="rgba(28,135,201,0.10)" />
        <Circle cx="1050" cy="100" r="200" fill="rgba(28,135,201,0.07)" />

        {/* Amber accent arc */}
        <Path
          d="M 750 -30 A 500 500 0 0 1 1310 300"
          stroke="rgba(245,166,35,0.08)"
          strokeWidth="1"
          fill="none"
        />

        {/* Diagonal structural lines */}
        <Line x1="640" y1="0" x2="1280" y2="480" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        <Line x1="900" y1="0" x2="1280" y2="240" stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
        <Line x1="400" y1="640" x2="1280" y2="100" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />

        {/* Small amber dot — focal accent */}
        <Circle cx="68" cy="320" r="3" fill="rgba(245,166,35,0.35)" />
        <Circle cx="68" cy="354" r="2" fill="rgba(245,166,35,0.2)" />
        <Circle cx="68" cy="382" r="1.5" fill="rgba(245,166,35,0.12)" />
      </Svg>
    </View>
  );
}
