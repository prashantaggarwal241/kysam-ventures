import { View, StyleSheet } from 'react-native';
import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';
import { theme } from '../../theme';
import { maxContentWidth } from '../../theme';
import { useWindowWidth } from '../../hooks/useWindowWidth';

export interface PageWrapperProps {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
}

export default function PageWrapper({ children, style }: PageWrapperProps) {
  const width = useWindowWidth();
  const px = width >= 1024 ? 48 : width >= 640 ? 32 : 20;

  return (
    <View style={[styles.wrapper, { paddingHorizontal: px }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    maxWidth: maxContentWidth,
    alignSelf: 'center',
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
  },
});
