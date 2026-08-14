import { View, Text, StyleSheet } from 'react-native';
import ScreenContainer from '../../components/layout/ScreenContainer';
import PageWrapper from '../../components/layout/PageWrapper';
import SectionLabel from '../../components/ui/SectionLabel';
import { aboutContent, coreValues } from '../../constants/content';
import { theme } from '../../theme';
import type { ScreenProps } from '../../navigation/types';

export type AboutScreenProps = ScreenProps;

export default function AboutScreen(_: AboutScreenProps) {
  return (
    <ScreenContainer>
      <PageWrapper>
        {/* Intro */}
        <View style={styles.section}>
          <SectionLabel>{aboutContent.eyebrow}</SectionLabel>
          <Text style={styles.heading}>{aboutContent.heading}</Text>
          <Text style={styles.intro}>{aboutContent.intro}</Text>
        </View>

        {/* Philosophy pull-quote */}
        <View style={styles.pullQuoteBlock}>
          <View style={styles.pullQuoteBorder} />
          <Text style={styles.pullQuoteText}>{aboutContent.philosophy}</Text>
        </View>

        {/* Core values grid */}
        <View style={styles.valuesSection}>
          <SectionLabel>Our Values</SectionLabel>
          <View style={styles.valuesGrid}>
            {coreValues.map(value => (
              <View key={value} style={styles.valueCard}>
                <View style={styles.valueAccent} />
                <Text style={styles.valueText}>{value}</Text>
              </View>
            ))}
          </View>
        </View>
      </PageWrapper>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: theme.spacing.xxl,
    gap: theme.spacing.md,
  },
  heading: {
    fontFamily: theme.typography.fontDisplay,
    fontSize: theme.typography.size.h2,
    color: theme.colors.textPrimary,
    lineHeight: theme.typography.size.h2 * 1.3,
  },
  intro: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.body,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.size.body * 1.65,
  },

  // Pull-quote
  pullQuoteBlock: {
    flexDirection: 'row',
    marginBottom: theme.spacing.xxxl,
    gap: theme.spacing.md,
  },
  pullQuoteBorder: {
    width: 3,
    borderRadius: 2,
    backgroundColor: theme.colors.amber,
    flexShrink: 0,
  },
  pullQuoteText: {
    flex: 1,
    fontFamily: theme.typography.fontDisplay,
    fontSize: theme.typography.size.h3,
    color: theme.colors.textPrimary,
    lineHeight: theme.typography.size.h3 * 1.55,
    paddingVertical: theme.spacing.xs,
  },

  // Values grid — 2 columns
  valuesSection: {
    gap: theme.spacing.md,
  },
  valuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  valueCard: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    overflow: 'hidden',
  },
  valueAccent: {
    width: 3,
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.colors.amber,
    borderTopLeftRadius: theme.radius.sm,
    borderBottomLeftRadius: theme.radius.sm,
  },
  valueText: {
    fontFamily: theme.typography.fontBodyMedium,
    fontSize: theme.typography.size.body,
    color: theme.colors.textPrimary,
    marginLeft: theme.spacing.sm,
  },
});
