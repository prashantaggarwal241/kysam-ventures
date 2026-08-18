import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopNav from '../components/layout/TopNav';
import SideNav from '../components/layout/SideNav';
import Logo from '../components/ui/Logo';
import { useIsDesktop } from '../hooks/useWindowWidth';
import { theme, maxContentWidth } from '../theme';
import type { RouteKey } from './types';
import HomeScreen from '../screens/home/HomeScreen';
import AboutScreen from '../screens/about/AboutScreen';
import ServicesScreen from '../screens/services/ServicesScreen';
import ExpertiseScreen from '../screens/expertise/ExpertiseScreen';
import ContactScreen from '../screens/contact/ContactScreen';

const MOBILE_NAV_H = 60;

export default function TopNavigator() {
  const [activeRoute, setActiveRoute] = useState<RouteKey>('Home');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const isDesktop = useIsDesktop();

  const navigate = (route: RouteKey) => {
    setActiveRoute(route);
    setIsNavOpen(false);
  };

  const screens = (
    <>
      {activeRoute === 'Home'      && <HomeScreen navigate={navigate} />}
      {activeRoute === 'About'     && <AboutScreen navigate={navigate} />}
      {activeRoute === 'Services'  && <ServicesScreen navigate={navigate} />}
      {activeRoute === 'Expertise' && <ExpertiseScreen navigate={navigate} />}
      {activeRoute === 'Contact'   && <ContactScreen navigate={navigate} />}
    </>
  );

  // ── Desktop: horizontal top nav ─────────────────────────────────────────
  if (isDesktop) {
    return (
      <View style={styles.container}>
        <TopNav activeRoute={activeRoute} onNavigate={navigate} />
        <View style={styles.screen}>{screens}</View>
      </View>
    );
  }

  // ── Mobile: persistent header bar + sliding sidebar ──────────────────────
  return (
    <View style={styles.mobileContainer}>
      {/* Header bar: always visible, shows logo + hamburger */}
      <SafeAreaView edges={['top']} style={styles.mobileHeader}>
        <View style={styles.mobileHeaderRow}>
          {/* Hamburger button */}
          <TouchableOpacity
            style={styles.hamburgerBtn}
            onPress={() => setIsNavOpen(prev => !prev)}
            accessibilityRole="button"
            accessibilityLabel={isNavOpen ? 'Close menu' : 'Open menu'}
          >
            <View style={styles.hLine} />
            <View style={styles.hLine} />
            <View style={styles.hLine} />
          </TouchableOpacity>

          {/* Logo + wordmark — taps navigate home */}
          <TouchableOpacity
            style={styles.mobileLogoArea}
            onPress={() => navigate('Home')}
            accessibilityRole="link"
            accessibilityLabel="KySam Ventures — go to home"
          >
            <Logo size={34} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Screen content */}
      <View style={styles.screen}>{screens}</View>

      {/* Sidebar overlay */}
      <SideNav
        activeRoute={activeRoute}
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        onNavigate={navigate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // Desktop
  container: {
    flex: 1,
  },

  // Mobile
  mobileContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  mobileHeader: {
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    elevation: 2,
    shadowColor: theme.colors.navy,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    zIndex: 50,
  },
  mobileHeaderRow: {
    height: MOBILE_NAV_H,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.md,
    maxWidth: maxContentWidth,
    width: '100%',
    alignSelf: 'center',
  },
  hamburgerBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    flexShrink: 0,
  },
  hLine: {
    width: 20,
    height: 2,
    backgroundColor: theme.colors.navyHero,
    borderRadius: 1,
  },
  mobileLogoArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    flex: 1,
  },

  // Shared
  screen: {
    flex: 1,
  },
});
