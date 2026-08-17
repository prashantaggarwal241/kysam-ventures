import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import type { LayoutRectangle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from '../ui/Logo';
import { theme, maxContentWidth } from '../../theme';
import type { RouteKey } from '../../navigation/types';

const NAV_ITEMS: { route: RouteKey; label: string }[] = [
  { route: 'Home',      label: 'Home' },
  { route: 'About',     label: 'About' },
  { route: 'Services',  label: 'Services' },
  { route: 'Expertise', label: 'Expertise' },
  { route: 'Contact',   label: 'Contact' },
];

const NARROW_BREAKPOINT = 480;

function useIsNarrow(): boolean {
  const [isNarrow, setIsNarrow] = useState(
    Dimensions.get('window').width < NARROW_BREAKPOINT,
  );

  useEffect(() => {
    const sub = Dimensions.addEventListener('change', ({ window }) => {
      setIsNarrow(window.width < NARROW_BREAKPOINT);
    });
    return () => sub.remove();
  }, []);

  return isNarrow;
}

export interface TopNavProps {
  activeRoute: RouteKey;
  onNavigate: (route: RouteKey) => void;
}

export default function TopNav({ activeRoute, onNavigate }: TopNavProps) {
  const insets = useSafeAreaInsets();
  const isNarrow = useIsNarrow();

  const tabLayouts = useRef<Map<RouteKey, LayoutRectangle>>(new Map());
  const indicatorX = useSharedValue(0);
  const indicatorW = useSharedValue(0);
  const scrollRef = useRef<ScrollView>(null);

  const underlineStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }],
    width: indicatorW.value,
  }));

  function animateTo(layout: LayoutRectangle) {
    indicatorX.value = withTiming(layout.x, { duration: 210 });
    indicatorW.value = withTiming(layout.width, { duration: 210 });
  }

  function handleTabLayout(route: RouteKey, layout: LayoutRectangle) {
    tabLayouts.current.set(route, layout);
    if (route === activeRoute) {
      // initialise without animation on first render
      indicatorX.value = layout.x;
      indicatorW.value = layout.width;
    }
  }

  useEffect(() => {
    const layout = tabLayouts.current.get(activeRoute);
    if (layout) {
      animateTo(layout);
      scrollRef.current?.scrollTo({ x: Math.max(0, layout.x - 16), animated: true });
    }
  }, [activeRoute]);

  const navItems = NAV_ITEMS.map(item => (
    <TouchableOpacity
      key={item.route}
      style={styles.navItem}
      onLayout={e => handleTabLayout(item.route, e.nativeEvent.layout)}
      onPress={() => onNavigate(item.route)}
      accessibilityRole="button"
      accessibilityLabel={item.label}
      accessibilityState={{ selected: item.route === activeRoute }}
    >
      <Text
        style={[
          styles.navLabel,
          item.route === activeRoute && styles.navLabelActive,
        ]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  ));

  return (
    <View style={[styles.bar, { paddingTop: insets.top }]}>
      <View style={styles.row}>
        {/* Logo + wordmark */}
        <View style={styles.logoSection}>
          <Logo size={28} />
          <Text style={styles.wordmark} numberOfLines={1}>
            KYSAM VENTURES
          </Text>
        </View>

        {/* Nav items with sliding underline */}
        {isNarrow ? (
          <ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scrollFlex}
            contentContainerStyle={styles.navItemsRow}
          >
            {navItems}
            <Animated.View style={[styles.underline, underlineStyle]} />
          </ScrollView>
        ) : (
          <View style={styles.navItemsFlex}>
            <View style={styles.navItemsRow}>
              {navItems}
              <Animated.View style={[styles.underline, underlineStyle]} />
            </View>
          </View>
        )}

      </View>
    </View>
  );
}

const NAV_BAR_H = 52;

const styles = StyleSheet.create({
  bar: {
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    elevation: 2,
    shadowColor: theme.colors.navy,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    zIndex: 100,
  },
  row: {
    height: NAV_BAR_H,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.sm,
    width: '100%',
    maxWidth: maxContentWidth,
    alignSelf: 'center',
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    flexShrink: 0,
  },
  wordmark: {
    fontFamily: theme.typography.fontDisplay,
    fontSize: 10,
    letterSpacing: 1.5,
    color: theme.colors.navyHero,
  },
  scrollFlex: {
    flex: 1,
  },
  navItemsFlex: {
    flex: 1,
    alignItems: 'center',
  },
  navItemsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    height: NAV_BAR_H,
  },
  navItem: {
    paddingHorizontal: theme.spacing.md,
    height: NAV_BAR_H,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navLabel: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.small,
    color: theme.colors.textSecondary,
  },
  navLabelActive: {
    fontFamily: theme.typography.fontBodyMedium,
    color: theme.colors.navyHero,
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 2,
    backgroundColor: theme.colors.amber,
    borderRadius: 1,
  },
});
