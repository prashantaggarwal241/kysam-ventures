import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { ReactNode } from 'react';
import { theme } from '../../theme';

// Excludes bottom edge — the custom tab bar handles the bottom safe-area inset itself.
const SAFE_EDGES = ['top', 'left', 'right'] as const;

export interface ScreenContainerProps {
  children: ReactNode;
  scrollable?: boolean;
}

export default function ScreenContainer({ children, scrollable = true }: ScreenContainerProps) {
  if (scrollable) {
    return (
      <SafeAreaView style={styles.safeArea} edges={SAFE_EDGES}>
        <ScrollView style={styles.flex} contentContainerStyle={styles.content}>
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.safeArea} edges={SAFE_EDGES}>
      <View style={[styles.flex, styles.content]}>{children}</View>
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
