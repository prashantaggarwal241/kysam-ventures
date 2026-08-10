import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type React from 'react';
import { theme } from '../../theme';

export type IoniconName = React.ComponentProps<typeof Ionicons>['name'];
export type IconBadgeTone = 'blue' | 'amber';
export type IconBadgeSize = 'sm' | 'md' | 'lg';

export interface IconBadgeProps {
  iconName: IoniconName;
  tone?: IconBadgeTone;
  size?: IconBadgeSize;
}

const SIZE_MAP: Record<IconBadgeSize, { circle: number; icon: number }> = {
  sm: { circle: 32, icon: 16 },
  md: { circle: 44, icon: 22 },
  lg: { circle: 56, icon: 28 },
};

const TONE_MAP: Record<IconBadgeTone, { bg: string; icon: string }> = {
  blue: { bg: theme.colors.blueTint, icon: theme.colors.blue },
  amber: { bg: theme.colors.amberTint, icon: theme.colors.amberTextOnTint },
};

export default function IconBadge({ iconName, tone = 'blue', size = 'md' }: IconBadgeProps) {
  const { circle, icon: iconSize } = SIZE_MAP[size];
  const { bg, icon: iconColor } = TONE_MAP[tone];

  return (
    <View
      testID="icon-badge"
      style={[styles.badge, { width: circle, height: circle, borderRadius: circle / 2, backgroundColor: bg }]}
      accessibilityRole="image"
    >
      <Ionicons name={iconName} size={iconSize} color={iconColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
