import { useEffect } from 'react';
import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

export interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  distance?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Slides content up gently on mount.  Opacity stays at 1 so content is
 * always visible — avoids blank-page flash if the worklet hasn't fired yet.
 */
export default function AnimatedSection({
  children,
  delay = 0,
  distance = 20,
  style,
}: AnimatedSectionProps) {
  const translateY = useSharedValue(distance);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withTiming(0, { duration: 600, easing: Easing.out(Easing.cubic) }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[animStyle, style]}>
      {children}
    </Animated.View>
  );
}
