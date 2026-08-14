import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Line, Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { theme } from '../../theme';

const AnimatedPath = Animated.createAnimatedComponent(Path);

// Chart geometry constants
const CHART_W = 260;
const CHART_H = 120;
const BAR_W = 36;
const GAP = 18;
const BARS_START_X = 20;
const MAX_BAR_H = 90;
const BASELINE_Y = CHART_H - 10;
const STAGGER_MS = 80;
const DURATION_MS = 550;
const LINE_TOTAL_LEN = 320; // approximate drawn path length

const DEFAULT_DATA = [0.42, 0.61, 0.78, 0.96];
const BAR_FILL = [
  theme.colors.navyDeep,
  theme.colors.blue,
  theme.colors.blueLight,
  theme.colors.amberOuter,
];

function barX(index: number): number {
  return BARS_START_X + index * (BAR_W + GAP);
}

function barCenterX(index: number): number {
  return barX(index) + BAR_W / 2;
}

function targetY(normalized: number): number {
  return BASELINE_Y - normalized * MAX_BAR_H;
}

interface AnimatedBarProps {
  index: number;
  normalized: number;
}

function AnimatedBar({ index, normalized }: AnimatedBarProps) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      index * STAGGER_MS,
      withTiming(1, { duration: DURATION_MS, easing: Easing.out(Easing.quad) }),
    );
  }, [index, normalized, progress]);

  const animatedProps = useAnimatedProps(() => {
    const barH = progress.value * normalized * MAX_BAR_H;
    const x = barX(index);
    const y = BASELINE_Y - barH;
    return {
      d: `M ${x} ${BASELINE_Y} L ${x} ${y} L ${x + BAR_W} ${y} L ${x + BAR_W} ${BASELINE_Y} Z`,
    };
  });

  return <AnimatedPath animatedProps={animatedProps} fill={BAR_FILL[index]} opacity={0.9} />;
}

export interface GrowthChartProps {
  data?: number[];
}

export default function GrowthChart({ data = DEFAULT_DATA }: GrowthChartProps) {
  const lineProgress = useSharedValue(0);

  useEffect(() => {
    lineProgress.value = withDelay(
      data.length * STAGGER_MS + 200,
      withTiming(1, { duration: 700, easing: Easing.out(Easing.cubic) }),
    );
  }, [data, lineProgress]);

  // Build a smooth polyline through the bar top-centres
  const points = data.map((v, i) => ({ x: barCenterX(i), y: targetY(v) }));
  const linePath = points.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = points[i - 1];
    const cpx = (prev.x + pt.x) / 2;
    return `${acc} C ${cpx} ${prev.y} ${cpx} ${pt.y} ${pt.x} ${pt.y}`;
  }, '');

  const animatedLineProps = useAnimatedProps(() => ({
    strokeDashoffset: LINE_TOTAL_LEN * (1 - lineProgress.value),
  }));

  return (
    <View style={styles.container}>
      <Svg width={CHART_W} height={CHART_H} viewBox={`0 0 ${CHART_W} ${CHART_H}`}>
        {/* Baseline */}
        <Line
          x1={BARS_START_X - 4}
          y1={BASELINE_Y}
          x2={CHART_W - 8}
          y2={BASELINE_Y}
          stroke={theme.colors.border}
          strokeWidth={1}
        />
        {/* Animated bars */}
        {data.map((v, i) => (
          <AnimatedBar key={i} index={i} normalized={v} />
        ))}
        {/* Animated trend line */}
        <AnimatedPath
          animatedProps={animatedLineProps}
          d={linePath}
          stroke={theme.colors.amber}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          strokeDasharray={LINE_TOTAL_LEN}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
});
