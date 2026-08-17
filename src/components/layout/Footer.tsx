import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme, maxContentWidth } from '../../theme';
import { contactContent } from '../../constants/content';
import Logo from '../ui/Logo';
import type { RouteKey } from '../../navigation/types';

const NAV_LINKS: { route: RouteKey; label: string }[] = [
  { route: 'Home', label: 'Home' },
  { route: 'About', label: 'About' },
  { route: 'Services', label: 'Services' },
  { route: 'Expertise', label: 'Expertise' },
  { route: 'Contact', label: 'Contact' },
];

export interface FooterProps {
  navigate?: (route: RouteKey) => void;
}

export default function Footer({ navigate }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <View style={styles.outer}>
      <View style={styles.inner}>

        {/* Top row: brand + nav */}
        <View style={styles.topRow}>

          {/* Brand block */}
          <View style={styles.brandBlock}>
            <View style={styles.logoRow}>
              <Logo size={32} />
              <Text style={styles.wordmark}>KYSAM VENTURES</Text>
            </View>
            <Text style={styles.tagline}>Build · Grow · Create value</Text>
            <Text style={styles.taglineBody}>
              Delhi-based IT services company delivering AFC systems, enterprise software, and government technology solutions.
            </Text>
          </View>

          {/* Nav links */}
          {navigate && (
            <View style={styles.navBlock}>
              <Text style={styles.navHeading}>NAVIGATE</Text>
              {NAV_LINKS.map(item => (
                <TouchableOpacity
                  key={item.route}
                  onPress={() => navigate(item.route)}
                  accessibilityRole="button"
                  accessibilityLabel={item.label}
                  style={styles.navLink}
                >
                  <Text style={styles.navLinkText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Contact block */}
          <View style={styles.contactBlock}>
            <Text style={styles.navHeading}>CONTACT</Text>
            <Text style={styles.contactText}>{contactContent.email}</Text>
            {contactContent.locations.map(loc => (
              <Text key={loc} style={styles.contactText}>{loc}, India</Text>
            ))}
            {navigate && (
              <TouchableOpacity
                style={styles.ctaBtn}
                onPress={() => navigate('Contact')}
                accessibilityRole="button"
                accessibilityLabel="Get in touch"
              >
                <Text style={styles.ctaBtnText}>Get in touch →</Text>
              </TouchableOpacity>
            )}
          </View>

        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Bottom row: copyright */}
        <View style={styles.bottomRow}>
          <Text style={styles.copyright}>© {year} KySam Ventures. All rights reserved.</Text>
          <Text style={styles.copyrightRight}>Technology. Expertise. Business impact.</Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    backgroundColor: theme.colors.navyHero,
    borderTopWidth: 1,
    borderTopColor: theme.colors.glassOnDarkBorder,
  },
  inner: {
    width: '100%',
    maxWidth: maxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xxxl,
    paddingBottom: theme.spacing.xxl,
  },

  // Top row
  topRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xxl,
    marginBottom: theme.spacing.xxl,
  },

  // Brand
  brandBlock: {
    flex: 2,
    minWidth: 220,
    gap: theme.spacing.md,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
  },
  wordmark: {
    fontFamily: theme.typography.fontDisplay,
    fontSize: theme.typography.size.small,
    letterSpacing: 2,
    color: theme.colors.textOnDark,
  },
  tagline: {
    fontFamily: theme.typography.fontBodyMedium,
    fontSize: theme.typography.size.caption,
    color: theme.colors.amber,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  taglineBody: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.small,
    color: theme.colors.textOnDarkMuted,
    lineHeight: theme.typography.size.small * 1.7,
    maxWidth: 280,
  },

  // Nav
  navBlock: {
    flex: 1,
    minWidth: 120,
    gap: theme.spacing.sm,
  },
  navHeading: {
    fontFamily: theme.typography.fontBodyMedium,
    fontSize: theme.typography.size.caption,
    color: theme.colors.textOnDarkSubtle,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: theme.spacing.xs,
  },
  navLink: {},
  navLinkText: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.small,
    color: theme.colors.textOnDarkMuted,
    paddingVertical: theme.spacing.xs,
  },

  // Contact
  contactBlock: {
    flex: 1,
    minWidth: 180,
    gap: theme.spacing.sm,
  },
  contactText: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.small,
    color: theme.colors.textOnDarkMuted,
    lineHeight: theme.typography.size.small * 1.6,
  },
  ctaBtn: {
    marginTop: theme.spacing.sm,
    alignSelf: 'flex-start',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(245,166,35,0.4)',
  },
  ctaBtnText: {
    fontFamily: theme.typography.fontBodyMedium,
    fontSize: theme.typography.size.small,
    color: theme.colors.amber,
  },

  // Divider & bottom row
  divider: {
    height: 1,
    backgroundColor: theme.colors.glassOnDarkBorder,
    marginBottom: theme.spacing.xl,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  copyright: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.caption,
    color: theme.colors.textOnDarkSubtle,
  },
  copyrightRight: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.caption,
    color: theme.colors.textOnDarkSubtle,
    letterSpacing: 0.5,
  },
});
