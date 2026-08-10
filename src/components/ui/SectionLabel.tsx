import { Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

export interface SectionLabelProps {
  children: string;
}

export default function SectionLabel({ children }: SectionLabelProps) {
  return <Text style={styles.label}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: {
    color: theme.colors.textMuted,
    fontFamily: theme.typography.fontBodyMedium,
    fontSize: theme.typography.size.caption,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: theme.spacing.sm,
  },
});
