import { View, StyleSheet } from 'react-native';
import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';
import { theme } from '../../theme';
import { maxContentWidth } from '../../theme';

export interface PageWrapperProps {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
}

export default function PageWrapper({ children, style }: PageWrapperProps) {
  return <View style={[styles.wrapper, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    maxWidth: maxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
  },
});
