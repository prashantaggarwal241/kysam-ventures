import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

export type ChipTone = 'neutral' | 'amber' | 'blue';

export interface ChipProps {
  label: string;
  tone?: ChipTone;
  selected?: boolean;
}

export default function Chip({ label, tone = 'blue', selected = false }: ChipProps) {
  return (
    <View
      style={[
        styles.base,
        selected ? selectedContainer[tone] : unselectedContainer[tone],
      ]}
    >
      <Text style={[styles.label, selected ? selectedLabel[tone] : unselectedLabel[tone]]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.radius.pill,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    alignSelf: 'flex-start',
  },
  label: {
    fontFamily: theme.typography.fontBodyMedium,
    fontSize: theme.typography.size.small,
  },
});

const unselectedContainer = StyleSheet.create({
  neutral: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  amber: {
    backgroundColor: theme.colors.amberTint,
  },
  blue: {
    backgroundColor: theme.colors.blueTint,
  },
});

const selectedContainer = StyleSheet.create({
  neutral: { backgroundColor: theme.colors.navy },
  amber: { backgroundColor: theme.colors.amber },
  blue: { backgroundColor: theme.colors.blue },
});

const unselectedLabel = StyleSheet.create({
  neutral: { color: theme.colors.textSecondary },
  amber: { color: theme.colors.amberTextOnTint },
  blue: { color: theme.colors.blue },
});

const selectedLabel = StyleSheet.create({
  neutral: { color: theme.colors.surface },
  amber: { color: theme.colors.amberTextOnFill },
  blue: { color: theme.colors.surface },
});
