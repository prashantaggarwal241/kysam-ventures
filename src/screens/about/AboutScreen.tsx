import { View, Text, StyleSheet } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import ScreenContainer from '../../components/layout/ScreenContainer';
import Card from '../../components/ui/Card';
import SectionLabel from '../../components/ui/SectionLabel';
import { aboutContent, coreValues } from '../../constants/content';
import { theme } from '../../theme';
import type { RootTabParamList } from '../../navigation/types';

export type AboutScreenProps = BottomTabScreenProps<RootTabParamList, 'About'>;

export default function AboutScreen(_: AboutScreenProps) {
  return (
    <ScreenContainer>
      <Card variant="tinted" style={styles.aboutCard}>
        <SectionLabel>{aboutContent.eyebrow}</SectionLabel>
        <Text style={styles.heading}>{aboutContent.heading}</Text>
        <Text style={styles.body}>{aboutContent.body}</Text>
      </Card>

      <View style={styles.valuesSection}>
        <SectionLabel>Our Values</SectionLabel>
        <View style={styles.valuesGrid}>
          {coreValues.map(value => (
            <View key={value} style={styles.valueRow}>
              <Text style={styles.valueDot}>·</Text>
              <Text style={styles.valueText}>{value}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  aboutCard: {
    marginBottom: theme.spacing.xxl,
    gap: theme.spacing.sm,
  },
  heading: {
    fontFamily: theme.typography.fontDisplay,
    fontSize: theme.typography.size.h2,
    color: theme.colors.textPrimary,
    lineHeight: theme.typography.size.h2 * 1.3,
  },
  body: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.body,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.size.body * 1.6,
  },
  valuesSection: {
    gap: theme.spacing.md,
  },
  valuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  valueRow: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.md,
  },
  valueDot: {
    fontFamily: theme.typography.fontDisplay,
    fontSize: theme.typography.size.h2,
    color: theme.colors.amber,
    lineHeight: theme.typography.size.h2,
  },
  valueText: {
    fontFamily: theme.typography.fontBodyMedium,
    fontSize: theme.typography.size.body,
    color: theme.colors.textPrimary,
  },
});
