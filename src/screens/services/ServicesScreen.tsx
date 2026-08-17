import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import ScreenContainer from '../../components/layout/ScreenContainer';
import PageWrapper from '../../components/layout/PageWrapper';
import IconBadge from '../../components/ui/IconBadge';
import HeroBackground from '../../components/ui/HeroBackground';
import AnimatedSection from '../../components/ui/AnimatedSection';
import { services } from '../../constants/content';
import { theme } from '../../theme';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import type { ScreenProps } from '../../navigation/types';
import type { ServiceContent } from '../../constants/content';

export type ServicesScreenProps = ScreenProps;

// ── Service row with hover ─────────────────────────────────────────────────
interface ServiceRowProps {
  index: number;
  service: ServiceContent;
}

function ServiceRow({ index, service }: ServiceRowProps) {
  const hover = useSharedValue(0);

  const numberStyle = useAnimatedStyle(() => ({
    color: interpolateColor(hover.value, [0, 1], [theme.colors.borderStrong, theme.colors.amber]),
  }));
  const rowBgStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      hover.value,
      [0, 1],
      [theme.colors.surface, theme.colors.amberTint],
    ),
  }));
  const barStyle = useAnimatedStyle(() => ({
    opacity: hover.value,
  }));

  function handleHoverIn() {
    hover.value = withTiming(1, { duration: 180, easing: Easing.out(Easing.quad) });
  }
  function handleHoverOut() {
    hover.value = withTiming(0, { duration: 220, easing: Easing.out(Easing.quad) });
  }

  return (
    <Pressable
      onHoverIn={handleHoverIn}
      onHoverOut={handleHoverOut}
      accessibilityRole="button"
      accessibilityLabel={service.name}
    >
      <Animated.View style={[styles.row, rowBgStyle]}>
        {/* Amber left accent bar */}
        <Animated.View style={[styles.rowAccentBar, barStyle]} />

        {/* Number */}
        <Animated.Text style={[styles.rowNumber, numberStyle]}>
          {String(index + 1).padStart(2, '0')}
        </Animated.Text>

        {/* Icon */}
        <View style={styles.rowIcon}>
          <IconBadge iconName={service.icon} tone="blue" size="md" />
        </View>

        {/* Text */}
        <View style={styles.rowText}>
          <Text style={styles.rowName}>{service.name}</Text>
          <Text style={styles.rowDesc}>{service.shortDescription}</Text>
        </View>

        {/* Arrow */}
        <Text style={styles.rowArrow}>→</Text>
      </Animated.View>
      <View style={styles.rowDivider} />
    </Pressable>
  );
}

// ── Main screen ─────────────────────────────────────────────────────────────
export default function ServicesScreen({ navigate }: ServicesScreenProps) {
  const winWidth = useWindowWidth();
  const heroFontSize = winWidth < 600 ? 32 : winWidth < 1024 ? 42 : 52;

  return (
    <ScreenContainer navigate={navigate}>

      {/* ── Dark hero header ──────────────────────────────────────────────── */}
      <View style={styles.hero}>
        <HeroBackground />
        <Text style={styles.kWatermark} accessibilityElementsHidden>S</Text>
        <PageWrapper style={styles.heroContent}>
          <AnimatedSection delay={0}>
            <Text style={styles.heroEyebrow}>WHAT WE OFFER</Text>
          </AnimatedSection>
          <AnimatedSection delay={80}>
            <Text style={[
              styles.heroHeading,
              { fontSize: heroFontSize, lineHeight: heroFontSize * 1.2 },
            ]}>
              Six delivery lines.{'\n'}One trusted partner.
            </Text>
          </AnimatedSection>
          <AnimatedSection delay={160}>
            <Text style={styles.heroSubtext}>
              Covering the full technology lifecycle — from AFC and transit platforms to enterprise software and government digitisation — for product companies and public-sector clients.
            </Text>
          </AnimatedSection>
        </PageWrapper>
      </View>

      {/* ── Services list ─────────────────────────────────────────────────── */}
      <View style={styles.listSection}>
        <PageWrapper style={styles.listContent}>

          {/* List header */}
          <AnimatedSection delay={0}>
            <View style={styles.listHeader}>
              <Text style={styles.listHeaderLabel}>OUR SERVICES</Text>
              <View style={styles.listHeaderAccent} />
            </View>
          </AnimatedSection>

          {/* List */}
          <View style={styles.list}>
            <View style={styles.listTopRule} />
            {services.map((service, i) => (
              <AnimatedSection key={service.slug} delay={60 * i}>
                <ServiceRow index={i} service={service} />
              </AnimatedSection>
            ))}
          </View>

        </PageWrapper>
      </View>

      {/* ── Bottom note ───────────────────────────────────────────────────── */}
      <View style={styles.noteSection}>
        <PageWrapper style={styles.noteSectionContent}>
          <AnimatedSection delay={0}>
            <View style={styles.noteCard}>
              <View style={styles.noteAccent} />
              <View style={styles.noteText}>
                <Text style={styles.noteHeading}>All services delivered as a long-term vendor engagement.</Text>
                <Text style={styles.noteBody}>
                  We operate as an embedded delivery partner — meeting SLAs, scaling teams on demand, and maintaining quality standards required by tier-1 product companies like Aurionpro and Sileo.
                </Text>
              </View>
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
  },
  heroSubtext: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.body,
    color: theme.colors.textOnDarkMuted,
    lineHeight: theme.typography.size.body * 1.7,
    maxWidth: 520,
  },

  // ── List section ────────────────────────────────────────────────────────
  listSection: {
    backgroundColor: theme.colors.background,
  },
  listContent: {
    paddingTop: theme.spacing.xxxl,
    paddingBottom: theme.spacing.xxxl,
    gap: theme.spacing.xxl,
  },

  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  listHeaderLabel: {
    fontFamily: theme.typography.fontBodyMedium,
    fontSize: theme.typography.size.caption,
    color: theme.colors.textMuted,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  listHeaderAccent: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border,
  },

  list: {},
  listTopRule: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginBottom: 0,
  },

  // Service row
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.xl,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: theme.radius.sm,
  },
  rowAccentBar: {
    position: 'absolute',
    left: 0,
    top: 8,
    bottom: 8,
    width: 3,
    backgroundColor: theme.colors.amber,
    borderRadius: 2,
  },
  rowNumber: {
    fontFamily: theme.typography.fontDisplayBold,
    fontSize: theme.typography.size.h2,
    minWidth: 48,
    lineHeight: theme.typography.size.h2 * 1.2,
  },
  rowIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: theme.colors.blueTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowText: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  rowName: {
    fontFamily: theme.typography.fontDisplay,
    fontSize: theme.typography.size.h3,
    color: theme.colors.textPrimary,
  },
  rowDesc: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.small,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.size.small * 1.65,
  },
  rowArrow: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.body,
    color: theme.colors.borderStrong,
  },
  rowDivider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginHorizontal: theme.spacing.lg,
  },

  // ── Note section ────────────────────────────────────────────────────────
  noteSection: {
    backgroundColor: theme.colors.surfaceAlt,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  noteSectionContent: {
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.xxl,
  },
  noteCard: {
    flexDirection: 'row',
    gap: theme.spacing.xl,
    alignItems: 'flex-start',
  },
  noteAccent: {
    width: 4,
    height: 60,
    backgroundColor: theme.colors.amber,
    borderRadius: 2,
    flexShrink: 0,
    marginTop: 2,
  },
  noteText: {
    flex: 1,
    gap: theme.spacing.sm,
  },
  noteHeading: {
    fontFamily: theme.typography.fontDisplay,
    fontSize: theme.typography.size.h3,
    color: theme.colors.textPrimary,
    lineHeight: theme.typography.size.h3 * 1.4,
  },
  noteBody: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.body,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.size.body * 1.65,
  },
});
