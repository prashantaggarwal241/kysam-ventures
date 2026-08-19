import { useEffect, useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import ScreenContainer from '../../components/layout/ScreenContainer';
import PageWrapper from '../../components/layout/PageWrapper';
import Button from '../../components/ui/Button';
import IconBadge from '../../components/ui/IconBadge';
import Marquee from '../../components/ui/Marquee';
import HeroBackground from '../../components/ui/HeroBackground';
import AnimatedSection from '../../components/ui/AnimatedSection';
import {
  homeContent,
  services,
  whyKysam,
  clients,
  SERVICE_TICKER,
} from '../../constants/content';
import { theme } from '../../theme';
import { useWindowWidth, useIsDesktop } from '../../hooks/useWindowWidth';
import type { ScreenProps } from '../../navigation/types';
import type { ServiceContent } from '../../constants/content';

export type HomeScreenProps = ScreenProps;

const COUNTER_TARGET = 7;
const COUNTER_DURATION_MS = 900;
const COUNTER_STEP_MS = 60;

function useLiveCounter(target: number, duration: number, stepMs: number): number {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const steps = duration / stepMs;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCount(Math.round((target * step) / steps));
      if (step >= steps) clearInterval(timer);
    }, stepMs);
    return () => clearInterval(timer);
  }, [target, duration, stepMs]);
  return count;
}

// ── Numbered service row with hover animation ─────────────────────────────
interface ServiceRowProps {
  index: number;
  service: ServiceContent;
}

function ServiceRow({ index, service }: ServiceRowProps) {
  const hover = useSharedValue(0);

  const numberStyle = useAnimatedStyle(() => ({
    color: interpolateColor(hover.value, [0, 1], ['rgba(255,255,255,0.22)', '#F5A623']),
  }));
  const barStyle = useAnimatedStyle(() => ({ opacity: hover.value }));
  const nameStyle = useAnimatedStyle(() => ({
    color: interpolateColor(hover.value, [0, 1], ['rgba(255,255,255,0.88)', '#FFFFFF']),
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
      <View style={styles.serviceRow}>
        <Animated.View style={[styles.serviceHoverBar, barStyle]} />
        <Animated.Text style={[styles.serviceNumber, numberStyle]}>
          {String(index + 1).padStart(2, '0')}
        </Animated.Text>
        <View style={styles.serviceNameBlock}>
          <Animated.Text style={[styles.serviceName, nameStyle]}>
            {service.name}
          </Animated.Text>
          <Text style={styles.serviceDesc}>{service.shortDescription}</Text>
        </View>
        <IconBadge iconName={service.icon} tone="blue" size="sm" />
      </View>
      <View style={styles.serviceRowDivider} />
    </Pressable>
  );
}

// ── Client trust card ─────────────────────────────────────────────────────
function ClientCard({ client, delay }: { client: typeof clients[0]; delay: number }) {
  const handleVisit = () => { void Linking.openURL(client.website); };
  return (
    <AnimatedSection delay={delay} style={styles.clientCard}>
      <View style={styles.clientCardTop}>
        <View style={styles.clientDot} />
        <Text style={styles.clientSector}>{client.sector}</Text>
      </View>
      <Text style={styles.clientName}>{client.name}</Text>
      <Text style={styles.clientDesc}>{client.description}</Text>
      {client.website ? (
        <TouchableOpacity
          onPress={handleVisit}
          accessibilityRole="link"
          accessibilityLabel={`Visit ${client.name} website`}
          style={styles.clientWebsiteRow}
        >
          <Text style={styles.clientWebsiteText}>Visit website →</Text>
        </TouchableOpacity>
      ) : null}
    </AnimatedSection>
  );
}

// ── Feature card ──────────────────────────────────────────────────────────
function FeatureCard({ item, delay }: { item: typeof whyKysam[0]; delay: number }) {
  return (
    <AnimatedSection delay={delay} style={styles.featureCard}>
      <View style={styles.featureIconCircle}>
        <IconBadge iconName={item.icon} tone="blue" size="md" />
      </View>
      <Text style={styles.featureLabel}>{item.label.replace('\n', ' ')}</Text>
      <Text style={styles.featureDesc}>{item.description}</Text>
    </AnimatedSection>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────
export default function HomeScreen({ navigate }: HomeScreenProps) {
  const counter = useLiveCounter(COUNTER_TARGET, COUNTER_DURATION_MS, COUNTER_STEP_MS);
  const isDesktop = useIsDesktop();
  const winWidth = useWindowWidth();
  const heroFontSize = winWidth < 600 ? 38 : winWidth < 1024 ? 52 : 64;
  const clientSectionFontSize = winWidth < 600 ? 24 : 32;
  const ctaFontSize = winWidth < 600 ? 24 : winWidth < 1024 ? 32 : 42;

  return (
    <ScreenContainer navigate={navigate}>

      {/* ══ 1. HERO ════════════════════════════════════════════════════════ */}
      <View style={styles.hero}>
        <HeroBackground />
        <Text style={styles.kWatermark} accessibilityElementsHidden>K</Text>
        <PageWrapper style={styles.heroContent}>

          {/* Eyebrow */}
          <View style={styles.eyebrowRow}>
            <View style={styles.eyebrowDot} />
            <Text style={styles.eyebrow}>{homeContent.eyebrow}</Text>
          </View>

          {/* Headline */}
          <AnimatedSection delay={60} style={styles.headingBlock}>
            <Text style={[styles.heading, { fontSize: heroFontSize, lineHeight: heroFontSize * 1.18 }]}>
              Technology{'\n'}
              <Text style={styles.headingAccent}>Delivery.</Text>{'\n'}
              Business{'\n'}Outcomes.
            </Text>
          </AnimatedSection>

          <View style={styles.accentRule} />

          {/* Subtext */}
          <AnimatedSection delay={120}>
            <Text style={styles.heroSubtext}>{homeContent.subtext}</Text>
          </AnimatedSection>

          {/* Client trust badges */}
          <AnimatedSection delay={180}>
            <View style={styles.trustBadgeRow}>
              <Text style={styles.trustBadgeLabel}>Delivery partner to</Text>
              <View style={styles.trustBadge}>
                <Text style={styles.trustBadgeText}>Aurionpro Solutions</Text>
              </View>
              <View style={styles.trustBadge}>
                <Text style={styles.trustBadgeText}>Sileo</Text>
              </View>
            </View>
          </AnimatedSection>

          {/* CTAs */}
          <AnimatedSection delay={240}>
            <View style={styles.ctaRow}>
              <Button label="Get in touch" onPress={() => navigate('Contact')} />
              <Button label="Our services" variant="ghost" onPress={() => navigate('Services')} />
            </View>
          </AnimatedSection>

        </PageWrapper>
      </View>

      {/* ══ 2. CLIENT CREDIBILITY SECTION ══════════════════════════════════ */}
      <View style={styles.clientSection}>
        <PageWrapper style={styles.clientSectionContent}>
          <View style={styles.sectionLabelRow}>
            <Text style={styles.sectionLabel}>OUR CLIENTS</Text>
            <View style={styles.sectionLabelRule} />
          </View>
          <Text style={[styles.sectionHeading, { fontSize: clientSectionFontSize, lineHeight: clientSectionFontSize * 1.3 }]}>
            Trusted by leading technology{'\n'}product companies.
          </Text>
          <View style={[styles.clientGrid, isDesktop && styles.clientGridDesktop]}>
            {clients.map((client, i) => (
              <ClientCard key={client.name} client={client} delay={60 * i} />
            ))}
          </View>
        </PageWrapper>
      </View>

      {/* ══ 3. FEATURES + CHART ════════════════════════════════════════════ */}
      <View style={styles.featuresSection}>
        <PageWrapper style={styles.featuresSectionContent}>

          {/* Why KySam feature cards */}
          <View style={[styles.featureGrid, isDesktop && styles.featureGridDesktop]}>
            {whyKysam.map((item, i) => (
              <FeatureCard key={item.label} item={item} delay={80 * i} />
            ))}
          </View>

          {/* Ticker */}
          <View style={styles.marqueeSeparator}>
            <Marquee items={SERVICE_TICKER} />
          </View>

        </PageWrapper>
      </View>

      {/* ══ 4. SERVICES DARK BAND ══════════════════════════════════════════ */}
      <View style={styles.servicesBand}>
        <HeroBackground variant="dark" />
        <PageWrapper style={styles.servicesBandContent}>

          <View style={[styles.servicesBandHeader, isDesktop && styles.servicesBandHeaderDesktop]}>
            <View style={styles.servicesBandLeft}>
              <Text style={styles.servicesBandEyebrow}>WHAT WE DELIVER</Text>
              <Text style={[styles.servicesBandHeading, { fontSize: winWidth < 600 ? 26 : 34 }]}>
                {counter} service lines.{'\n'}One delivery partner.
              </Text>
            </View>
            <View style={styles.counterBlock}>
              <Text style={styles.counterNumber}>{counter}</Text>
              <View style={styles.counterAccent} />
            </View>
          </View>

          <View style={styles.servicesList}>
            <View style={styles.servicesListTopRule} />
            {services.map((service, i) => (
              <ServiceRow key={service.slug} index={i} service={service} />
            ))}
          </View>

        </PageWrapper>
      </View>

      {/* ══ 5. CTA BAND ════════════════════════════════════════════════════ */}
      <View style={styles.ctaBand}>
        <HeroBackground />
        <PageWrapper style={styles.ctaBandContent}>
          <Text style={styles.ctaBandEyebrow}>WORK WITH US</Text>
          <Text style={[
            styles.ctaBandHeading,
            { fontSize: ctaFontSize, lineHeight: ctaFontSize * 1.25 },
          ]}>
            Evaluating a delivery partner{'\n'}or specialist technology vendor?
          </Text>
          <Text style={styles.ctaBandSub}>
            AFC domain expertise, an established delivery track record, and the flexibility to scale alongside your roadmap — talk to our team.
          </Text>
          <View style={styles.ctaBandRule} />
          <Button label="Get in touch" onPress={() => navigate('Contact')} />
        </PageWrapper>
      </View>

    </ScreenContainer>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({

  // ── Hero ────────────────────────────────────────────────────────────────
  hero: {
    backgroundColor: theme.colors.navyHero,

    overflow: 'hidden',
    position: 'relative',
  },
  kWatermark: {
    position: 'absolute',
    right: -16,
    bottom: -40,
    fontFamily: theme.typography.fontDisplayBold,
    fontSize: 320,
    color: 'rgba(255,255,255,0.035)',
    userSelect: 'none',
  } as any,
  heroContent: {
    paddingTop: theme.spacing.xxxl,
    paddingBottom: 0,
    gap: theme.spacing.lg,
  },
  eyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  eyebrowDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.amber,
  },
  eyebrow: {
    fontFamily: theme.typography.fontBodyMedium,
    fontSize: theme.typography.size.caption,
    color: theme.colors.textOnDarkMuted,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  headingBlock: {},
  heading: {
    fontFamily: theme.typography.fontDisplayBold,
    color: theme.colors.textOnDark,
    marginTop: theme.spacing.sm,
  },
  headingAccent: {
    color: theme.colors.amber,
  },
  accentRule: {
    width: 56,
    height: 2,
    backgroundColor: theme.colors.amber,
    borderRadius: 1,
    marginTop: theme.spacing.xs,
  },
  heroSubtext: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.body,
    color: theme.colors.textOnDarkMuted,
    lineHeight: theme.typography.size.body * 1.7,
    maxWidth: 560,
  },

  // Trust badges
  trustBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.xs,
  },
  trustBadgeLabel: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.small,
    color: theme.colors.textOnDarkSubtle,
  },
  trustBadge: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    borderRadius: theme.radius.pill,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
  },
  trustBadgeText: {
    fontFamily: theme.typography.fontBodyMedium,
    fontSize: theme.typography.size.small,
    color: theme.colors.textOnDark,
  },

  ctaRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    flexWrap: 'wrap',
    paddingBottom: theme.spacing.xxxl,
    marginTop: theme.spacing.sm,
  },

  // ── Client section ────────────────────────────────────────────────────
  clientSection: {
    backgroundColor: theme.colors.surfaceAlt,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  clientSectionContent: {
    paddingTop: theme.spacing.xxxl,
    paddingBottom: theme.spacing.xxxl,
    gap: theme.spacing.xxl,
  },
  sectionLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  sectionLabel: {
    fontFamily: theme.typography.fontBodyMedium,
    fontSize: theme.typography.size.caption,
    color: theme.colors.textMuted,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  sectionLabelRule: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border,
  },
  sectionHeading: {
    fontFamily: theme.typography.fontDisplayBold,
    color: theme.colors.textPrimary,
  },

  clientGrid: {
    gap: theme.spacing.lg,
  },
  clientGridDesktop: {
    flexDirection: 'row',
  },
  clientCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.xxl,
    gap: theme.spacing.md,
    elevation: 2,
    shadowColor: theme.colors.navy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },
  clientCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  clientDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.amber,
  },
  clientSector: {
    fontFamily: theme.typography.fontBodyMedium,
    fontSize: theme.typography.size.caption,
    color: theme.colors.amber,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  clientName: {
    fontFamily: theme.typography.fontDisplayBold,
    fontSize: theme.typography.size.h2,
    color: theme.colors.textPrimary,
    lineHeight: theme.typography.size.h2 * 1.2,
  },
  clientDesc: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.small,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.size.small * 1.7,
  },
  clientWebsiteRow: {
    marginTop: theme.spacing.sm,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  clientWebsiteText: {
    fontFamily: theme.typography.fontBodyMedium,
    fontSize: theme.typography.size.small,
    color: theme.colors.blue,
    letterSpacing: 0.3,
  },

  // ── Features + Chart ─────────────────────────────────────────────────
  featuresSection: {
    backgroundColor: theme.colors.background,
  },
  featuresSectionContent: {
    paddingTop: 0,
    gap: theme.spacing.xxl,
  },


  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.lg,
  },
  featureGridDesktop: {
    flexWrap: 'nowrap',
  },
  featureCard: {
    flex: 1,
    minWidth: 160,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.xl,
    gap: theme.spacing.md,
    alignItems: 'flex-start',
  },
  featureIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.blueTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureLabel: {
    fontFamily: theme.typography.fontBodyMedium,
    fontSize: theme.typography.size.h4,
    color: theme.colors.textPrimary,
    lineHeight: theme.typography.size.h4 * 1.4,
  },
  featureDesc: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.small,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.size.small * 1.65,
  },

  marqueeSeparator: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: theme.spacing.lg,
    backgroundColor: theme.colors.surfaceAlt,
  },

  // ── Services dark band ────────────────────────────────────────────────
  servicesBand: {
    backgroundColor: theme.colors.navy,
    overflow: 'hidden',
    position: 'relative',
  },
  servicesBandContent: {
    paddingTop: theme.spacing.xxxl,
    paddingBottom: theme.spacing.xxxl,
    gap: theme.spacing.xxl,
  },
  servicesBandHeader: {
    gap: theme.spacing.xl,
  },
  servicesBandHeaderDesktop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  servicesBandLeft: {
    gap: theme.spacing.md,
    flex: 1,
  },
  servicesBandEyebrow: {
    fontFamily: theme.typography.fontBodyMedium,
    fontSize: theme.typography.size.caption,
    color: theme.colors.amber,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
  },
  servicesBandHeading: {
    fontFamily: theme.typography.fontDisplayBold,
    color: theme.colors.textOnDark,
    lineHeight: 1.22 * 34,
  },
  counterBlock: {
    alignItems: 'center',
    gap: theme.spacing.xs,
    paddingRight: theme.spacing.xl,
  },
  counterNumber: {
    fontFamily: theme.typography.fontDisplayBold,
    fontSize: 96,
    color: theme.colors.amber,
    lineHeight: 96,
    opacity: 0.9,
  },
  counterAccent: {
    width: 40,
    height: 2,
    backgroundColor: theme.colors.amber,
    opacity: 0.4,
    borderRadius: 1,
  },

  servicesList: {},
  servicesListTopRule: {
    height: 1,
    backgroundColor: theme.colors.glassOnDarkBorder,
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.xl,
    position: 'relative',
    overflow: 'hidden',
  },
  serviceHoverBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: theme.colors.amber,
    borderRadius: 2,
  },
  serviceNumber: {
    fontFamily: theme.typography.fontDisplayBold,
    fontSize: theme.typography.size.h2,
    minWidth: 52,
    lineHeight: theme.typography.size.h2 * 1.2,
  },
  serviceNameBlock: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  serviceName: {
    fontFamily: theme.typography.fontDisplay,
    fontSize: theme.typography.size.h3,
    lineHeight: theme.typography.size.h3 * 1.3,
  },
  serviceDesc: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.small,
    color: theme.colors.textOnDarkMuted,
    lineHeight: theme.typography.size.small * 1.6,
  },
  serviceRowDivider: {
    height: 1,
    backgroundColor: theme.colors.glassOnDarkBorder,
    marginHorizontal: theme.spacing.md,
  },

  // ── CTA band ─────────────────────────────────────────────────────────
  ctaBand: {
    backgroundColor: theme.colors.navyHero,
    overflow: 'hidden',
    position: 'relative',
  },
  ctaBandContent: {
    paddingTop: theme.spacing.section,
    paddingBottom: theme.spacing.section,
    alignItems: 'flex-start',
    gap: theme.spacing.xl,
  },
  ctaBandEyebrow: {
    fontFamily: theme.typography.fontBodyMedium,
    fontSize: theme.typography.size.caption,
    color: theme.colors.amber,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
  },
  ctaBandHeading: {
    fontFamily: theme.typography.fontDisplayBold,
    color: theme.colors.textOnDark,
  },
  ctaBandSub: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.body,
    color: theme.colors.textOnDarkMuted,
    lineHeight: theme.typography.size.body * 1.7,
    maxWidth: 560,
  },
  ctaBandRule: {
    width: 48,
    height: 2,
    backgroundColor: theme.colors.amber,
    opacity: 0.5,
    borderRadius: 1,
  },
});
