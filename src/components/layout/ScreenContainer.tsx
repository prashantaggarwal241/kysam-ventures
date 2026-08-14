import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { ReactNode } from 'react';
import { theme } from '../../theme';
import Footer from './Footer';

// TopNav handles the top inset; ScreenContainer covers left, right, bottom.
const SAFE_EDGES = ['left', 'right', 'bottom'] as const;

export interface ScreenContainerProps {
  children: ReactNode;
  scrollable?: boolean;
  /** Pass true to suppress the automatic Footer (e.g. when screen needs a custom footer). */
  noFooter?: boolean;
}

export default function ScreenContainer({
  children,
  scrollable = true,
  noFooter = false,
}: ScreenContainerProps) {
  const footer = noFooter ? null : <Footer />;

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
    padding: theme.spacing.lg,
  },
});
