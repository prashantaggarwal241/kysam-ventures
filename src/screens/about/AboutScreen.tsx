import { View, Text, StyleSheet } from 'react-native';
import ScreenContainer from '../../components/layout/ScreenContainer';
import PageWrapper from '../../components/layout/PageWrapper';
import HeroBackground from '../../components/ui/HeroBackground';
import AnimatedSection from '../../components/ui/AnimatedSection';
import { aboutContent, coreValues } from '../../constants/content';
import { theme } from '../../theme';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import type { ScreenProps } from '../../navigation/types';

export type AboutScreenProps = ScreenProps;

export default function AboutScreen({ navigate }: AboutScreenProps) {
  const winWidth = useWindowWidth();
  const isDesktop = winWidth >= 1024;

  return (
    <ScreenContainer navigate={navigate}>

      {/* ── Dark hero banner ───────────────────────────────────────────────── */}
      <View style={styles.hero}>
        <HeroBackground />
        <Text style={styles.kWatermark} accessibilityElementsHidden>A</Text>
        <PageWrapper style={styles.heroContent}>
          <AnimatedSection delay={0}>
            <Text style={styles.heroEyebrow}>{aboutContent.eyebrow}</Text>
          </AnimatedSection>
          <AnimatedSection delay={80}>
            <Text style={[
              styles.heroHeading,
              { fontSize: winWidth < 600 ? 32 : winWidth < 1024 ? 42 : 52 },
            ]}>
              Your Technology{'\n'}Delivery Partner
            </Text>
          </AnimatedSection>
          <AnimatedSection delay={160}>
            <View style={styles.heroAccent} />
          </AnimatedSection>
        </PageWrapper>
      </View>

      {/* ── Editorial body ─────────────────────────────────────────────────── */}
      <View style={styles.bodySection}>
        <PageWrapper style={styles.bodySectionContent}>

          {/* Two-column split on desktop: intro left, quote right */}
          <View style={[styles.splitRow, isDesktop && styles.splitRowDesktop]}>

            {/* Intro text */}
            <AnimatedSection delay={100} style={[styles.splitLeft, isDesktop ? styles.splitLeftDesktop : undefined]}>
              <Text style={styles.introLabel}>OUR STORY</Text>
              <Text style={styles.introText}>{aboutContent.intro}</Text>
            </AnimatedSection>

            {/* Pull-quote */}
            <AnimatedSection delay={200} style={[styles.splitRight, isDesktop && styles.splitRightDesktop]}>
              <View style={styles.pullQuoteCard}>
                <View style={styles.pullQuoteBar} />
                <Text style={styles.pullQuoteOpenQuote}>"</Text>
                <Text style={styles.pullQuoteText}>{aboutContent.philosophy}</Text>
              </View>
            </AnimatedSection>

          </View>

        </PageWrapper>
      </View>

      {/* ── Dark values section ─────────────────────────────────────────────── */}
      <View style={styles.valuesBand}>
        <HeroBackground variant="dark" />
        <PageWrapper style={styles.valuesBandContent}>

          <AnimatedSection delay={0}>
            <Text style={styles.valuesEyebrow}>OUR VALUES</Text>
            <Text style={[
              styles.valuesHeading,
              { fontSize: winWidth < 600 ? 28 : 36 },
            ]}>
              The principles we build on.
            </Text>
          </AnimatedSection>

          {/* Values numbered list */}
          <View style={styles.valuesGrid}>
            {coreValues.map((value, i) => (
              <AnimatedSection key={value} delay={80 + i * 60} style={styles.valueItemWrap}>
                <View style={styles.valueItem}>
                  <Text style={styles.valueNumber}>{String(i + 1).padStart(2, '0')}</Text>
                  <View style={styles.valueDivider} />
                  <Text style={styles.valueText}>{value}</Text>
                </View>
              </AnimatedSection>
            ))}
          </View>

        </PageWrapper>
      </View>

    </ScreenContainer>
  );
}

const styles = StyleSheet.create({

  // ── Hero ────────────────────────────────────────────────────────────────
  hero: {
    backgroundColor: theme.colors.navyHero,
    overflow: 'hidden',
    position: 'relative',
  },
  kWatermark: {
    position: 'absolute',
    right: -20,
    bottom: -50,
    fontFamily: theme.typography.fontDisplayBold,
    fontSize: 300,
    color: 'rgba(255,255,255,0.03)',
    userSelect: 'none',
  } as any,
  heroContent: {
    paddingTop: theme.spacing.xxxl,
    paddingBottom: theme.spacing.xxxl,
    gap: theme.spacing.lg,
  },
  heroEyebrow: {
    fontFamily: theme.typography.fontBodyMedium,
    fontSize: theme.typography.size.caption,
    color: theme.colors.amber,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
  },
  heroHeading: {
    fontFamily: theme.typography.fontDisplayBold,
    color: theme.colors.textOnDark,
    lineHeight: 1.2 * 52,
    maxWidth: 640,
  },
  heroAccent: {
    width: 56,
    height: 2,
    backgroundColor: theme.colors.amber,
    borderRadius: 1,
    marginTop: theme.spacing.sm,
  },

  // ── Body section ─────────────────────────────────────────────────────────
  bodySection: {
    backgroundColor: theme.colors.background,
  },
  bodySectionContent: {
    paddingTop: theme.spacing.xxxl,
    paddingBottom: theme.spacing.xxxl,
  },

  splitRow: {
    gap: theme.spacing.xxl,
  },
  splitRowDesktop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  splitLeft: {
    gap: theme.spacing.lg,
  },
  splitLeftDesktop: {
    flex: 1,
  },
  introLabel: {
    fontFamily: theme.typography.fontBodyMedium,
    fontSize: theme.typography.size.caption,
    color: theme.colors.textMuted,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: theme.spacing.xs,
  },
  introText: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.body,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.size.body * 1.75,
  },

  splitRight: {},
  splitRightDesktop: {
    flex: 1,
  },
  pullQuoteCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.xxl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    position: 'relative',
    overflow: 'hidden',
    gap: theme.spacing.sm,
    elevation: 2,
    shadowColor: theme.colors.navy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },
  pullQuoteBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: theme.colors.amber,
    borderTopLeftRadius: theme.radius.lg,
    borderBottomLeftRadius: theme.radius.lg,
  },
  pullQuoteOpenQuote: {
    fontFamily: theme.typography.fontDisplayBold,
    fontSize: 64,
    color: theme.colors.amber,
    lineHeight: 64,
    marginBottom: -theme.spacing.sm,
  },
  pullQuoteText: {
    fontFamily: theme.typography.fontDisplay,
    fontSize: theme.typography.size.h3,
    color: theme.colors.textPrimary,
    lineHeight: theme.typography.size.h3 * 1.65,
    fontStyle: 'italic',
  },

  // ── Values band ──────────────────────────────────────────────────────────
  valuesBand: {
    backgroundColor: theme.colors.navyDeep,
    overflow: 'hidden',
    position: 'relative',
  },
  valuesBandContent: {
    paddingTop: theme.spacing.xxxl,
    paddingBottom: theme.spacing.xxxl,
    gap: theme.spacing.xxl,
  },
  valuesEyebrow: {
    fontFamily: theme.typography.fontBodyMedium,
    fontSize: theme.typography.size.caption,
    color: theme.colors.amber,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    marginBottom: theme.spacing.md,
  },
  valuesHeading: {
    fontFamily: theme.typography.fontDisplayBold,
    color: theme.colors.textOnDark,
    lineHeight: 1.25 * 36,
  },

  valuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  valueItemWrap: {
    width: '47%',
    minWidth: 140,
    flexGrow: 1,
  },
  valueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    backgroundColor: theme.colors.glassOnDark,
    borderWidth: 1,
    borderColor: theme.colors.glassOnDarkBorder,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
  },
  valueNumber: {
    fontFamily: theme.typography.fontDisplayBold,
    fontSize: theme.typography.size.h3,
    color: theme.colors.amber,
    opacity: 0.6,
    minWidth: 32,
  },
  valueDivider: {
    width: 1,
    height: 20,
    backgroundColor: theme.colors.glassOnDarkBorder,
  },
  valueText: {
    fontFamily: theme.typography.fontDisplay,
    fontSize: theme.typography.size.h4,
    color: theme.colors.textOnDark,
    flex: 1,
  },
});
