import { View, Text, StyleSheet } from 'react-native';
import ScreenContainer from '../../components/layout/ScreenContainer';
import PageWrapper from '../../components/layout/PageWrapper';
import HeroBackground from '../../components/ui/HeroBackground';
import AnimatedSection from '../../components/ui/AnimatedSection';
import { expertiseAreas, industries } from '../../constants/content';
import { theme } from '../../theme';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import type { ScreenProps } from '../../navigation/types';

export type ExpertiseScreenProps = ScreenProps;

export default function ExpertiseScreen({ navigate }: ExpertiseScreenProps) {
  const winWidth = useWindowWidth();
  const isDesktop = winWidth >= 1024;

  return (
    <ScreenContainer navigate={navigate}>

      {/* ── Dark hero header ──────────────────────────────────────────────── */}
      <View style={styles.hero}>
        <HeroBackground />
        <Text style={styles.kWatermark} accessibilityElementsHidden>E</Text>
        <PageWrapper style={styles.heroContent}>
          <AnimatedSection delay={0}>
            <Text style={styles.heroEyebrow}>WHERE WE EXCEL</Text>
          </AnimatedSection>
          <AnimatedSection delay={80}>
            <Text style={[
              styles.heroHeading,
              { fontSize: winWidth < 600 ? 32 : winWidth < 1024 ? 42 : 52 },
            ]}>
              AFC expertise.{'\n'}Enterprise delivery.
            </Text>
          </AnimatedSection>
          <AnimatedSection delay={160}>
            <Text style={styles.heroSubtext}>
              Deep technical capability in Automatic Fare Collection, smart mobility, and enterprise software — proven through delivery for Aurionpro and Sileo.
            </Text>
          </AnimatedSection>
        </PageWrapper>
      </View>

      {/* ── Expertise areas (light) ───────────────────────────────────────── */}
      <View style={styles.expertiseSection}>
        <PageWrapper style={styles.expertiseSectionContent}>

          <AnimatedSection delay={0}>
            <Text style={styles.sectionEyebrow}>TECHNICAL EXPERTISE</Text>
            <Text style={[
              styles.sectionHeading,
              { fontSize: winWidth < 600 ? 24 : 32 },
            ]}>
              Eight technology domains,{'\n'}led by AFC & transit.
            </Text>
          </AnimatedSection>

          {/* Expertise numbered grid */}
          <View style={[styles.expertiseGrid, isDesktop && styles.expertiseGridDesktop]}>
            {expertiseAreas.map((area, i) => (
              <AnimatedSection key={area} delay={50 * i} style={[
                styles.expertiseItem,
                isDesktop ? styles.expertiseItemDesktop : undefined,
              ]}>
                <Text style={styles.expertiseItemNumber}>{String(i + 1).padStart(2, '0')}</Text>
                <View style={styles.expertiseItemDivider} />
                <Text style={styles.expertiseItemText}>{area}</Text>
              </AnimatedSection>
            ))}
          </View>

        </PageWrapper>
      </View>

      {/* ── Industries dark band ──────────────────────────────────────────── */}
      <View style={styles.industriesBand}>
        <HeroBackground variant="dark" />
        <PageWrapper style={styles.industriesBandContent}>

          <AnimatedSection delay={0}>
            <Text style={styles.industriesEyebrow}>INDUSTRIES SERVED</Text>
            <Text style={[
              styles.industriesHeading,
              { fontSize: winWidth < 600 ? 24 : 32 },
            ]}>
              Sectors we understand.
            </Text>
          </AnimatedSection>

          <View style={[styles.industriesGrid, isDesktop && styles.industriesGridDesktop]}>
            {industries.map((industry, i) => (
              <AnimatedSection key={industry} delay={60 * i} style={styles.industryItemWrap}>
                <View style={styles.industryItem}>
                  <View style={styles.industryDot} />
                  <Text style={styles.industryText}>{industry}</Text>
                </View>
              </AnimatedSection>
            ))}
          </View>

          {/* Decorative bottom label */}
          <AnimatedSection delay={380}>
            <View style={styles.industriesNote}>
              <View style={styles.industriesNoteRule} />
              <Text style={styles.industriesNoteText}>
                Our team brings direct delivery and advisory experience in these sectors — including live AFC deployments for major Indian transit authorities via Aurionpro and Sileo.
              </Text>
            </View>
          </AnimatedSection>

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
    right: -10,
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
  },
  heroSubtext: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.body,
    color: theme.colors.textOnDarkMuted,
    lineHeight: theme.typography.size.body * 1.7,
    maxWidth: 520,
  },

  // ── Expertise section ────────────────────────────────────────────────────
  expertiseSection: {
    backgroundColor: theme.colors.background,
  },
  expertiseSectionContent: {
    paddingTop: theme.spacing.xxxl,
    paddingBottom: theme.spacing.xxxl,
    gap: theme.spacing.xxl,
  },
  sectionEyebrow: {
    fontFamily: theme.typography.fontBodyMedium,
    fontSize: theme.typography.size.caption,
    color: theme.colors.textMuted,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: theme.spacing.sm,
  },
  sectionHeading: {
    fontFamily: theme.typography.fontDisplayBold,
    color: theme.colors.textPrimary,
    lineHeight: 1.25 * 32,
  },

  expertiseGrid: {
    gap: 0,
  },
  expertiseGridDesktop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  expertiseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  expertiseItemDesktop: {
    width: '50%',
    borderRightWidth: 1,
    borderRightColor: theme.colors.border,
    paddingHorizontal: theme.spacing.md,
  },
  expertiseItemNumber: {
    fontFamily: theme.typography.fontDisplayBold,
    fontSize: theme.typography.size.h2,
    color: theme.colors.amber,
    opacity: 0.4,
    minWidth: 44,
    lineHeight: theme.typography.size.h2 * 1.2,
  },
  expertiseItemDivider: {
    width: 1,
    height: 20,
    backgroundColor: theme.colors.border,
  },
  expertiseItemText: {
    fontFamily: theme.typography.fontDisplay,
    fontSize: theme.typography.size.h4,
    color: theme.colors.textPrimary,
    flex: 1,
  },

  // ── Industries band ──────────────────────────────────────────────────────
  industriesBand: {
    backgroundColor: theme.colors.navyDeep,
    overflow: 'hidden',
    position: 'relative',
  },
  industriesBandContent: {
    paddingTop: theme.spacing.xxxl,
    paddingBottom: theme.spacing.xxxl,
    gap: theme.spacing.xxl,
  },
  industriesEyebrow: {
    fontFamily: theme.typography.fontBodyMedium,
    fontSize: theme.typography.size.caption,
    color: theme.colors.amber,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    marginBottom: theme.spacing.sm,
  },
  industriesHeading: {
    fontFamily: theme.typography.fontDisplayBold,
    color: theme.colors.textOnDark,
    lineHeight: 1.25 * 32,
  },

  industriesGrid: {
    gap: theme.spacing.md,
  },
  industriesGridDesktop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  industryItemWrap: {
    minWidth: 200,
    flexGrow: 1,
    flexBasis: '45%',
  },
  industryItem: {
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
  industryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.amber,
    opacity: 0.7,
  },
  industryText: {
    fontFamily: theme.typography.fontBodyMedium,
    fontSize: theme.typography.size.h4,
    color: theme.colors.textOnDark,
  },

  industriesNote: {
    flexDirection: 'row',
    gap: theme.spacing.lg,
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  industriesNoteRule: {
    width: 40,
    height: 1,
    backgroundColor: theme.colors.amber,
    opacity: 0.4,
    flexShrink: 0,
  },
  industriesNoteText: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.small,
    color: theme.colors.textOnDarkMuted,
    lineHeight: theme.typography.size.small * 1.65,
    flex: 1,
  },
});
