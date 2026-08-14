import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ScreenContainer from '../../components/layout/ScreenContainer';
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
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <View style={styles.hero}>
        {/* "K" watermark — low-contrast, purely decorative */}
        <Text style={styles.kWatermark} accessibilityElementsHidden>K</Text>

        <Text style={styles.eyebrow}>{homeContent.eyebrow}</Text>
        <Text style={styles.heading}>{homeContent.heading}</Text>
        <Text style={styles.subtext}>{homeContent.subtext}</Text>

        <View style={styles.ctaRow}>
          <Button
            label="Get in touch"
            onPress={() => navigate('Contact')}
          />
          <Button
            label="Our services"
            variant="secondary"
            onPress={() => navigate('Services')}
          />
        </View>
      </View>

      {/* ── Floating Growth Chart card ───────────────────────────────── */}
      <View style={styles.growthCardWrap}>
        <Card variant="surface" style={styles.growthCard}>
          <SectionLabel>Growth trajectory</SectionLabel>
          <GrowthChart />
        </Card>
      </View>

      {/* ── Light section ───────────────────────────────────────────── */}
      <View style={styles.lightSection}>

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
      </View>

      {/* ── Dark CTA band ──────────────────────────────────────────── */}
      <View style={styles.ctaBand}>
        <Text style={styles.ctaBandHeading}>
          Have a technology challenge or a new idea?
        </Text>
        <Button
          label="Let's talk"
          onPress={() => navigate('Contact')}
          variant="primary"
        />
      </View>

    </ScreenContainer>
  );
}

const HERO_PADDING_H = theme.spacing.xxl;
const HERO_EXTRA_BOTTOM = 48; // space for the floating chart card

const styles = StyleSheet.create({
  // ── Hero ────────────────────────────────────────
  hero: {
    // Escape the ScreenContainer's padding to go full-bleed
    marginHorizontal: -theme.spacing.lg,
    marginTop: -theme.spacing.lg,
    backgroundColor: theme.colors.navyHero,
    paddingHorizontal: HERO_PADDING_H,
    paddingTop: theme.spacing.xxxl,
    paddingBottom: theme.spacing.xxxl + HERO_EXTRA_BOTTOM,
    overflow: 'hidden',
    gap: theme.spacing.md,
  },
  kWatermark: {
    position: 'absolute',
    right: -10,
    top: -24,
    fontFamily: theme.typography.fontDisplayBold,
    fontSize: 160,
    color: theme.colors.navy, // purposely low-contrast on navyHero background
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

  // ── Floating growth chart card ─────────────────
  growthCardWrap: {
    marginTop: -HERO_EXTRA_BOTTOM + theme.spacing.md,
    marginBottom: theme.spacing.xxl,
    zIndex: 10,
  },
  growthCard: {
    // Card variant="surface" already provides white bg + border
    elevation: 6,
    shadowColor: theme.colors.navyHero,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius: 12,
    gap: theme.spacing.sm,
  },

  // ── Light section ──────────────────────────────
  lightSection: {
    gap: theme.spacing.xxl,
    marginBottom: theme.spacing.xxl,
  },
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
  marqueeSection: {
    gap: theme.spacing.sm,
  },

  // ── Dark CTA band ──────────────────────────────
  ctaBand: {
    marginHorizontal: -theme.spacing.lg,
    backgroundColor: theme.colors.navyHero,
    paddingHorizontal: HERO_PADDING_H,
    paddingVertical: theme.spacing.xxxl,
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
