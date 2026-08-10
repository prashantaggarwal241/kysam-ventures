import { View, StyleSheet } from 'react-native';
import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';
import { theme } from '../../theme';

export interface CardProps {
  children: ReactNode;
  variant?: 'surface' | 'tinted' | 'filled';
  style?: ViewStyle;
}

export default function Card({ children, variant = 'surface', style }: CardProps) {
  return (
    <View
      style={[
        styles.base,
        variant === 'surface' && styles.surface,
        variant === 'tinted' && styles.tinted,
        variant === 'filled' && styles.filled,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.radius.md,
    padding: theme.spacing.lg,
  },
  surface: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  tinted: {
    backgroundColor: theme.colors.blueTint,
  },
  filled: {
    backgroundColor: theme.colors.navy,
  },
});
