import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import ScreenContainer from '../../components/layout/ScreenContainer';
import PageWrapper from '../../components/layout/PageWrapper';
import Button from '../../components/ui/Button';
import HeroBackground from '../../components/ui/HeroBackground';
import AnimatedSection from '../../components/ui/AnimatedSection';
import { contactContent } from '../../constants/content';
import { theme } from '../../theme';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import type { ScreenProps } from '../../navigation/types';

export type ContactScreenProps = ScreenProps;

export default function ContactScreen({ navigate }: ContactScreenProps) {
  const winWidth = useWindowWidth();
  const isDesktop = winWidth >= 1024;
  const heroFontSize = winWidth < 600 ? 32 : winWidth < 1024 ? 42 : 52;
  const leftHeadingSize = winWidth < 600 ? 24 : 32;

  const handleEmail = () => { void Linking.openURL(`mailto:${contactContent.email}`); };
  const handlePhone = () => { void Linking.openURL(`tel:${contactContent.phone.replace(/\s/g, '')}`); };

  return (
    <ScreenContainer navigate={navigate}>

      {/* ── Dark hero header ──────────────────────────────────────────────── */}
      <View style={styles.hero}>
        <HeroBackground />
        <Text style={styles.kWatermark} accessibilityElementsHidden>C</Text>
        <PageWrapper style={styles.heroContent}>
          <AnimatedSection delay={0}>
            <Text style={styles.heroEyebrow}>GET IN TOUCH</Text>
          </AnimatedSection>
          <AnimatedSection delay={80}>
            <Text style={[
              styles.heroHeading,
              { fontSize: heroFontSize, lineHeight: heroFontSize * 1.22 },
            ]}>
              Start a conversation{'\n'}with our team.
            </Text>
          </AnimatedSection>
        </PageWrapper>
      </View>

      {/* ── Two-column content ────────────────────────────────────────────── */}
      <View style={styles.contentSection}>
        <PageWrapper style={styles.contentSectionInner}>
          <View style={[styles.columns, isDesktop && styles.columnsDesktop]}>

            {/* Left: context + intro */}
            <AnimatedSection delay={100} style={[styles.leftCol, isDesktop ? styles.leftColDesktop : undefined]}>
              <Text style={styles.leftEyebrow}>LET'S START A CONVERSATION</Text>
              <Text style={[
                styles.leftHeading,
                { fontSize: leftHeadingSize, lineHeight: leftHeadingSize * 1.3 },
              ]}>
                We partner with product companies and public-sector organisations to deliver technology on time, to specification, and at scale.
              </Text>
              <View style={styles.leftAccent} />
              <Text style={styles.leftBody}>
                If you have a technology challenge to solve, a project to scope, or want to understand how we work — we are straightforward to reach and quick to respond.
              </Text>

              {/* Three mini-highlights */}
              <View style={styles.highlightList}>
                {[
                  'No-obligation initial consultation',
                  'Quick response within 24 hours',
                  'Long-term partnership approach',
                ].map(item => (
                  <View key={item} style={styles.highlightItem}>
                    <View style={styles.highlightDot} />
                    <Text style={styles.highlightText}>{item}</Text>
                  </View>
                ))}
              </View>
            </AnimatedSection>

            {/* Right: contact card */}
            <AnimatedSection delay={200} style={[styles.rightCol, isDesktop && styles.rightColDesktop]}>
              <View style={styles.contactCard}>

                {/* Card header */}
                <View style={styles.contactCardHeader}>
                  <View style={styles.contactCardHeaderAccent} />
                  <Text style={styles.contactCardHeaderLabel}>CONTACT DETAILS</Text>
                </View>

                {/* Email */}
                <TouchableOpacity
                  style={styles.contactRow}
                  onPress={handleEmail}
                  accessibilityRole="link"
                  accessibilityLabel="Send email"
                >
                  <View style={styles.contactIconBox}>
                    <Text style={styles.contactIcon}>✉</Text>
                  </View>
                  <View style={styles.contactRowText}>
                    <Text style={styles.contactRowLabel}>Email</Text>
                    <Text style={styles.contactRowValue}>{contactContent.email}</Text>
                  </View>
                </TouchableOpacity>

                <View style={styles.contactDivider} />

                {/* Phone */}
                <TouchableOpacity
                  style={styles.contactRow}
                  onPress={handlePhone}
                  accessibilityRole="link"
                  accessibilityLabel="Call KySam Ventures"
                >
                  <View style={styles.contactIconBox}>
                    <Text style={styles.contactIcon}>📞</Text>
                  </View>
                  <View style={styles.contactRowText}>
                    <Text style={styles.contactRowLabel}>Phone</Text>
                    <Text style={styles.contactRowValue}>{contactContent.phone}</Text>
                  </View>
                </TouchableOpacity>

                <View style={styles.contactDivider} />

                {/* Offices */}
                <View style={styles.contactRow}>
                  <View style={styles.contactIconBox}>
                    <Text style={styles.contactIcon}>📍</Text>
                  </View>
                  <View style={styles.contactRowText}>
                    <Text style={styles.contactRowLabel}>Offices</Text>
                    {contactContent.offices.map(o => (
                      <View key={o.city} style={styles.officeBlock}>
                        <View style={styles.officeTagRow}>
                          <Text style={styles.officeCity}>{o.city}</Text>
                          <View style={styles.officeTypePill}>
                            <Text style={styles.officeTypeText}>{o.type}</Text>
                          </View>
                        </View>
                        <Text style={styles.officeAddress}>{o.address}</Text>
                        <TouchableOpacity
                          onPress={() => void Linking.openURL(o.mapUrl)}
                          accessibilityRole="link"
                          accessibilityLabel={`Open ${o.city} on Google Maps`}
                          style={styles.mapLink}
                        >
                          <Text style={styles.mapLinkText}>📍 View on Google Maps →</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.contactDivider} />

                {/* CTA */}
                <View style={styles.contactCTABlock}>
                  <Button
                    label="Send us a message"
                    onPress={handleEmail}
                    accessibilityLabel="Send an email to KySam Ventures"
                  />
                  <Text style={styles.contactCTANote}>
                    We respond within one business day.
                  </Text>
                </View>

              </View>
            </AnimatedSection>

          </View>
        </PageWrapper>
      </View>

      {/* ── Bottom dark stripe ────────────────────────────────────────────── */}
      <View style={styles.bottomBand}>
        <PageWrapper style={styles.bottomBandContent}>
          <AnimatedSection delay={0}>
            <Text style={styles.bottomBandText}>
              Delhi · Noida · India · Global delivery · Enterprise-grade solutions
            </Text>
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
    maxWidth: 600,
  },

  // ── Content section ──────────────────────────────────────────────────────
  contentSection: {
    backgroundColor: theme.colors.background,
  },
  contentSectionInner: {
    paddingTop: theme.spacing.xxxl,
    paddingBottom: theme.spacing.xxxl,
  },

  columns: {
    gap: theme.spacing.xxl,
  },
  columnsDesktop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  // Left column
  leftCol: {
    gap: theme.spacing.xl,
  },
  leftColDesktop: {
    flex: 1,
  },
  leftEyebrow: {
    fontFamily: theme.typography.fontBodyMedium,
    fontSize: theme.typography.size.caption,
    color: theme.colors.textMuted,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  leftHeading: {
    fontFamily: theme.typography.fontDisplayBold,
    color: theme.colors.textPrimary,
  },
  leftAccent: {
    width: 48,
    height: 2,
    backgroundColor: theme.colors.amber,
    borderRadius: 1,
  },
  leftBody: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.body,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.size.body * 1.75,
  },

  highlightList: {
    gap: theme.spacing.md,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  highlightDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.amber,
    flexShrink: 0,
  },
  highlightText: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.body,
    color: theme.colors.textSecondary,
  },

  // Right column
  rightCol: {},
  rightColDesktop: {
    flex: 1,
    maxWidth: 440,
  },
  contactCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: theme.colors.navy,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
  },
  contactCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    backgroundColor: theme.colors.surfaceAlt,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  contactCardHeaderAccent: {
    width: 3,
    height: 14,
    backgroundColor: theme.colors.amber,
    borderRadius: 2,
  },
  contactCardHeaderLabel: {
    fontFamily: theme.typography.fontBodyMedium,
    fontSize: theme.typography.size.caption,
    color: theme.colors.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },

  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.xl,
  },
  contactIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: theme.colors.blueTint,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  contactIcon: {
    fontSize: 16,
  },
  contactRowText: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  contactRowLabel: {
    fontFamily: theme.typography.fontBodyMedium,
    fontSize: theme.typography.size.caption,
    color: theme.colors.textMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  contactRowValue: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.body,
    color: theme.colors.textPrimary,
  },
  contactDivider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginHorizontal: theme.spacing.xl,
  },
  contactCTABlock: {
    padding: theme.spacing.xl,
    gap: theme.spacing.md,
    alignItems: 'flex-start',
  },
  contactCTANote: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.small,
    color: theme.colors.textMuted,
  },

  officeBlock: {
    marginTop: theme.spacing.sm,
    gap: theme.spacing.xs,
  },
  officeTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  officeCity: {
    fontFamily: theme.typography.fontBodyMedium,
    fontSize: theme.typography.size.body,
    color: theme.colors.textPrimary,
  },
  officeTypePill: {
    backgroundColor: theme.colors.blueTint,
    borderRadius: theme.radius.pill,
    paddingVertical: 2,
    paddingHorizontal: theme.spacing.sm,
  },
  officeTypeText: {
    fontFamily: theme.typography.fontBodyMedium,
    fontSize: theme.typography.size.caption,
    color: theme.colors.blue,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  officeAddress: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.small,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.size.small * 1.65,
  },
  mapLink: {
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  mapLinkText: {
    fontFamily: theme.typography.fontBodyMedium,
    fontSize: theme.typography.size.caption,
    color: theme.colors.blue,
  },

  // ── Bottom band ──────────────────────────────────────────────────────────
  bottomBand: {
    backgroundColor: theme.colors.navyHero,
    borderTopWidth: 1,
    borderTopColor: theme.colors.glassOnDarkBorder,
  },
  bottomBandContent: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    alignItems: 'center',
  },
  bottomBandText: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.small,
    color: theme.colors.textOnDarkSubtle,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
});
