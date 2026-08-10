import { View, StyleSheet } from 'react-native';
import type { ReactNode } from 'react';
import { theme } from '../../theme';

export interface TabBarProps {
  children?: ReactNode;
}

export default function TabBar({ children }: TabBarProps) {
  return <View style={styles.bar}>{children}</View>;
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingBottom: theme.spacing.sm,
  },
});
