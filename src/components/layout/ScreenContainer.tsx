import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { ReactNode } from 'react';
import { theme } from '../../theme';
import Footer from './Footer';
import type { RouteKey } from '../../navigation/types';

// Top inset is handled by TopNav (desktop) and the mobile header (mobile).
const SAFE_EDGES = ['left', 'right', 'bottom'] as const;

export interface ScreenContainerProps {
  children: ReactNode;
  scrollable?: boolean;
  noFooter?: boolean;
  navigate?: (route: RouteKey) => void;
}

export default function ScreenContainer({
  children,
  scrollable = true,
  noFooter = false,
  navigate,
}: ScreenContainerProps) {
  const footer = noFooter ? null : <Footer navigate={navigate} />;

  if (scrollable) {
    return (
      <SafeAreaView style={styles.safeArea} edges={SAFE_EDGES}>
        <ScrollView style={styles.flex} contentContainerStyle={styles.content}>
          {children}
          {footer}
        </ScrollView>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.safeArea} edges={SAFE_EDGES}>
      <View style={[styles.flex, styles.content]}>
        {children}
        {footer}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
});
