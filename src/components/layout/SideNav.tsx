import { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from '../ui/Logo';
import { theme } from '../../theme';
import type { RouteKey } from '../../navigation/types';

const SIDEBAR_WIDTH = 260;
const ANIM_MS = 280;

const NAV_ITEMS: { route: RouteKey; label: string }[] = [
  { route: 'Home',      label: 'Home' },
  { route: 'About',     label: 'About' },
  { route: 'Services',  label: 'Services' },
  { route: 'Expertise', label: 'Expertise' },
  { route: 'Contact',   label: 'Contact' },
];

export interface SideNavProps {
  activeRoute: RouteKey;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: (route: RouteKey) => void;
}

export default function SideNav({ activeRoute, isOpen, onToggle, onNavigate }: SideNavProps) {
  const insets = useSafeAreaInsets();
  const translateX = useSharedValue(-SIDEBAR_WIDTH);
  const backdropOpacity = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(isOpen ? 0 : -SIDEBAR_WIDTH, {
      duration: ANIM_MS,
      easing: Easing.out(Easing.cubic),
    });
    backdropOpacity.value = withTiming(isOpen ? 1 : 0, { duration: 200 });
  }, [isOpen]);

  const sidebarStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  return (
    <>
      {/* ── Backdrop ───────────────────────────────────────────────────────── */}
      <Animated.View
        style={[StyleSheet.absoluteFill, styles.backdrop, backdropStyle]}
        pointerEvents={isOpen ? 'auto' : 'none'}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={onToggle} />
      </Animated.View>

      {/* ── Sidebar panel ──────────────────────────────────────────────────── */}
      <Animated.View style={[styles.sidebar, sidebarStyle]}>
        {/* Status-bar safe spacing */}
        <View style={{ height: insets.top }} />

        {/* Header */}
        <View style={styles.sidebarHeader}>
          <View style={styles.logoRow}>
            <Logo size={26} />
            <View>
              <Text style={styles.wordmark}>KYSAM</Text>
              <Text style={styles.wordmarkSub}>VENTURES</Text>
            </View>
          </View>
        </View>

        <View style={styles.rule} />

        {/* Nav items */}
        <View style={styles.navList}>
          {NAV_ITEMS.map(item => {
            const active = item.route === activeRoute;
            return (
              <TouchableOpacity
                key={item.route}
                style={[styles.navItem, active && styles.navItemActive]}
                onPress={() => onNavigate(item.route)}
                accessibilityRole="button"
                accessibilityLabel={item.label}
                accessibilityState={{ selected: active }}
              >
                <View style={[styles.activePip, !active && styles.activePipHidden]} />
                <Text style={[styles.navLabel, active && styles.navLabelActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Footer strip */}
        <View style={styles.sidebarFooter}>
          <View style={styles.rule} />
          <Text style={styles.footerOffices}>Delhi · Noida</Text>
          <Text style={styles.footerBrand}>IT Services · Delivery Partner</Text>
        </View>
      </Animated.View>

      {/* ── Toggle button (always visible, top-left) ────────────────────────── */}
      <TouchableOpacity
        style={[styles.toggleBtn, { top: insets.top + 10 }]}
        onPress={onToggle}
        accessibilityRole="button"
        accessibilityLabel={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? (
          <Text style={styles.closeIcon}>✕</Text>
        ) : (
          <View style={styles.hamburger}>
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
          </View>
        )}
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  // Backdrop
  backdrop: {
    backgroundColor: 'rgba(7,26,48,0.68)',
    zIndex: 100,
  },

  // Sidebar panel
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: SIDEBAR_WIDTH,
    backgroundColor: theme.colors.navyHero,
    zIndex: 200,
    shadowColor: '#000',
    shadowOffset: { width: 8, height: 0 },
    shadowOpacity: 0.32,
    shadowRadius: 20,
    elevation: 20,
  },
  sidebarHeader: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    paddingLeft: 62, // gap for toggle button
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  wordmark: {
    fontFamily: theme.typography.fontDisplayBold,
    fontSize: theme.typography.size.small,
    letterSpacing: 2.5,
    color: theme.colors.textOnDark,
  },
  wordmarkSub: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.caption,
    letterSpacing: 2,
    color: theme.colors.textOnDarkMuted,
  },
  rule: {
    height: 1,
    backgroundColor: theme.colors.glassOnDarkBorder,
    marginHorizontal: theme.spacing.xl,
  },

  // Nav
  navList: {
    flex: 1,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.md,
    gap: theme.spacing.md,
  },
  navItemActive: {
    backgroundColor: theme.colors.glassOnDark,
  },
  activePip: {
    width: 3,
    height: 18,
    borderRadius: 2,
    backgroundColor: theme.colors.amber,
    flexShrink: 0,
  },
  activePipHidden: {
    opacity: 0,
  },
  navLabel: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.body,
    color: theme.colors.textOnDarkMuted,
  },
  navLabelActive: {
    fontFamily: theme.typography.fontBodyMedium,
    color: theme.colors.textOnDark,
  },

  // Sidebar footer
  sidebarFooter: {
    paddingBottom: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  footerOffices: {
    fontFamily: theme.typography.fontBodyMedium,
    fontSize: theme.typography.size.caption,
    color: theme.colors.amber,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    paddingHorizontal: theme.spacing.xl,
    marginTop: theme.spacing.sm,
  },
  footerBrand: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.caption,
    color: theme.colors.textOnDarkSubtle,
    letterSpacing: 0.5,
    paddingHorizontal: theme.spacing.xl,
  },

  // Toggle button
  toggleBtn: {
    position: 'absolute',
    left: 12,
    width: 40,
    height: 40,
    backgroundColor: theme.colors.navyHero,
    borderRadius: theme.radius.md,
    borderWidth: 1.5,
    borderColor: theme.colors.amber,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  closeIcon: {
    fontFamily: theme.typography.fontBodyMedium,
    fontSize: 13,
    color: theme.colors.amber,
    lineHeight: 18,
  },
  hamburger: {
    gap: 5,
    alignItems: 'center',
  },
  hamburgerLine: {
    width: 18,
    height: 2,
    backgroundColor: theme.colors.amber,
    borderRadius: 1,
  },
});
