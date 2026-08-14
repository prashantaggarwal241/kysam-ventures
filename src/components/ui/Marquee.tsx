import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  cancelAnimation,
  Easing,
} from 'react-native-reanimated';
import { theme } from '../../theme';

const ITEM_GAP = 32;
const SPEED_PX_PER_SEC = 40;
const SEPARATOR = '·';

export interface MarqueeProps {
  items: string[];
}

export default function Marquee({ items }: MarqueeProps) {
  const translateX = useSharedValue(0);
  const [halfWidth, setHalfWidth] = useState(0);
  const measured = useRef(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  function startAnimation(width: number) {
    cancelAnimation(translateX);
    translateX.value = 0;
    const duration = (width / SPEED_PX_PER_SEC) * 1000;
    translateX.value = withRepeat(
      withTiming(-width, { duration, easing: Easing.linear }),
      -1,
      false,
    );
  }

  useEffect(() => {
    if (halfWidth > 0) {
      startAnimation(halfWidth);
    }
    return () => cancelAnimation(translateX);
  }, [halfWidth]);

  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <View style={styles.outer}>
      {/* Left edge fade */}
      <View style={styles.fadeLeft} pointerEvents="none" />

      <Animated.View
        style={[styles.row, animatedStyle]}
        onLayout={e => {
          if (measured.current) return;
          measured.current = true;
          // halfWidth = width of one copy of the content
          const fullWidth = e.nativeEvent.layout.width;
          const hw = fullWidth / 2;
          setHalfWidth(hw);
        }}
      >
        {doubled.map((item, i) => (
          <View key={i} style={styles.itemWrap}>
            <Text style={styles.itemText}>{item}</Text>
            <Text style={styles.sep}>{SEPARATOR}</Text>
          </View>
        ))}
      </Animated.View>

      {/* Right edge fade */}
      <View style={styles.fadeRight} pointerEvents="none" />
    </View>
  );
}

const FADE_WIDTH = 48;

const styles = StyleSheet.create({
  outer: {
    overflow: 'hidden',
    height: 36,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: ITEM_GAP,
  },
  itemText: {
    fontFamily: theme.typography.fontDisplay,
    fontSize: theme.typography.size.small,
    color: theme.colors.textSecondary,
    letterSpacing: 0.4,
    marginRight: ITEM_GAP / 2,
  },
  sep: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.small,
    color: theme.colors.amber,
  },
  fadeLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: FADE_WIDTH,
    backgroundColor: theme.colors.background,
    opacity: 0.85,
    zIndex: 1,
  },
  fadeRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: FADE_WIDTH,
    backgroundColor: theme.colors.background,
    opacity: 0.85,
    zIndex: 1,
  },
});
