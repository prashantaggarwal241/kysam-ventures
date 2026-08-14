import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ScreenContainer from '../../components/layout/ScreenContainer';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SectionLabel from '../../components/ui/SectionLabel';
import GrowthChart from '../../components/ui/GrowthChart';
import Marquee from '../../components/ui/Marquee';
import { homeContent, services } from '../../constants/content';
import { theme } from '../../theme';
import type { ScreenProps } from '../../navigation/types';

export type HomeScreenProps = ScreenProps;

const SERVICE_NAMES = services.map(s => s.name);
const COUNTER_TARGET = 6;
const COUNTER_DURATION_MS = 700;
const COUNTER_STEP_MS = 50;

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

export default function HomeScreen({ navigate }: HomeScreenProps) {
  const counter = useLiveCounter(COUNTER_TARGET, COUNTER_DURATION_MS, COUNTER_STEP_MS);

  return (
    <ScreenContainer>

      {/* ── Hero — full-bleed dark band ──────────────────────────────── */}
      <View style={styles.hero}>
        {/* "K" watermark — decorative, absolute-positioned within hero */}
        <Text style={styles.kWatermark} accessibilityElementsHidden>K</Text>
        <PageWrapper style={styles.heroContent}>
          <Text style={styles.eyebrow}>{homeContent.eyebrow}</Text>
          <Text style={styles.heading}>{homeContent.heading}</Text>
          <Text style={styles.subtext}>{homeContent.subtext}</Text>
          <View style={styles.ctaRow}>
            <Button label="Get in touch" onPress={() => navigate('Contact')} />
            <Button
              label="Our services"
              variant="secondary"
              onPress={() => navigate('Services')}
            />
          </View>
        </PageWrapper>
      </View>

      {/* ── Content — floating chart card + light section ─────────────── */}
      <PageWrapper style={styles.contentSection}>

        {/* Floating Growth Chart card — overlaps the hero bottom */}
        <View style={styles.growthCardWrap}>
          <Card variant="surface" style={styles.growthCard}>
            <SectionLabel>Growth trajectory</SectionLabel>
            <GrowthChart />
          </Card>
        </View>

        {/* Fact cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.factRow}
        >
          {homeContent.factCards.map(card => (
            <Card key={card.stat} variant="surface" style={styles.factCard}>
              <Text style={styles.factStat}>{card.stat}</Text>
              <Text style={styles.factLabel}>{card.label}</Text>
            </Card>
          ))}
        </ScrollView>

        {/* Live counter */}
        <View style={styles.counterRow}>
          <Text style={styles.counterNumber}>{counter}</Text>
          <Text style={styles.counterCaption}> core service lines, one long-term partner</Text>
        </View>

        {/* Service marquee */}
        <View style={styles.marqueeSection}>
          <SectionLabel>What we do</SectionLabel>
          <Marquee items={SERVICE_NAMES} />
        </View>

      </PageWrapper>

      {/* ── Dark CTA band — full-bleed ───────────────────────────────── */}
      <View style={styles.ctaBand}>
        <PageWrapper style={styles.ctaBandContent}>
          <Text style={styles.ctaBandHeading}>
            Have a technology challenge or a new idea?
          </Text>
          <Button
            label="Let's talk"
            onPress={() => navigate('Contact')}
            variant="primary"
          />
        </PageWrapper>
      </View>

    </ScreenContainer>
  );
}

const HERO_EXTRA_BOTTOM = 56; // extra space at hero bottom for the floating card overlap

const styles = StyleSheet.create({

  // ── Hero ──────────────────────────────────────────────────
  hero: {
    backgroundColor: theme.colors.navyHero,
    paddingTop: theme.spacing.xxxl,
    paddingBottom: theme.spacing.xxxl + HERO_EXTRA_BOTTOM,
    overflow: 'hidden',
  },
  kWatermark: {
    position: 'absolute',
    right: -10,
    top: -24,
    fontFamily: theme.typography.fontDisplayBold,
    fontSize: 160,
    color: theme.colors.navy,
  },
  heroContent: {
    paddingTop: 0,
    paddingBottom: 0,
    gap: theme.spacing.md,
  },
  eyebrow: {
    fontFamily: theme.typography.fontBodyMedium,
    fontSize: theme.typography.size.caption,
    color: theme.colors.textOnDarkMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  heading: {
    fontFamily: theme.typography.fontDisplayBold,
    fontSize: theme.typography.size.h1,
    color: theme.colors.textOnDark,
    lineHeight: theme.typography.size.h1 * 1.2,
    marginTop: theme.spacing.sm,
  },
  subtext: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.body,
    color: theme.colors.textOnDarkMuted,
    lineHeight: theme.typography.size.body * 1.65,
  },
  ctaRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.sm,
    flexWrap: 'wrap',
  },

  // ── Content section ────────────────────────────────────────
  contentSection: {
    paddingTop: 0, // growthCardWrap negative marginTop creates the hero overlap
    gap: theme.spacing.xxl,
  },

  // ── Floating growth chart card ─────────────────────────────
  growthCardWrap: {
    marginTop: -HERO_EXTRA_BOTTOM,
    zIndex: 10,
  },
  growthCard: {
    elevation: 6,
    shadowColor: theme.colors.navyHero,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius: 12,
    gap: theme.spacing.sm,
  },

  // ── Facts ──────────────────────────────────────────────────
  factRow: {
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
  },
  factCard: {
    width: 180,
    gap: theme.spacing.xs,
  },
  factStat: {
    fontFamily: theme.typography.fontDisplay,
    fontSize: theme.typography.size.h3,
    color: theme.colors.textPrimary,
    lineHeight: theme.typography.size.h3 * 1.3,
  },
  factLabel: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.small,
    color: theme.colors.textSecondary,
  },

  // ── Counter ────────────────────────────────────────────────
  counterRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  counterNumber: {
    fontFamily: theme.typography.fontDisplayBold,
    fontSize: 40,
    color: theme.colors.amber,
    lineHeight: 44,
  },
  counterCaption: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.body,
    color: theme.colors.textSecondary,
    flexShrink: 1,
    lineHeight: theme.typography.size.body * 1.5,
  },

  // ── Marquee ────────────────────────────────────────────────
  marqueeSection: {
    gap: theme.spacing.sm,
  },

  // ── Dark CTA band ──────────────────────────────────────────
  ctaBand: {
    backgroundColor: theme.colors.navyHero,
  },
  ctaBandContent: {
    paddingTop: theme.spacing.xxxl,
    paddingBottom: theme.spacing.xxxl,
    alignItems: 'flex-start',
    gap: theme.spacing.xl,
  },
  ctaBandHeading: {
    fontFamily: theme.typography.fontDisplay,
    fontSize: theme.typography.size.h2,
    color: theme.colors.textOnDark,
    lineHeight: theme.typography.size.h2 * 1.35,
  },
});
