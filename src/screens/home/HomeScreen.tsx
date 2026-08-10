import { View, Text, StyleSheet } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import ScreenContainer from '../../components/layout/ScreenContainer';
import Card from '../../components/ui/Card';
import SectionLabel from '../../components/ui/SectionLabel';
import IconBadge from '../../components/ui/IconBadge';
import Chip from '../../components/ui/Chip';
import Button from '../../components/ui/Button';
import { homeContent, whyKysam, services } from '../../constants/content';
import { theme } from '../../theme';
import type { RootTabParamList } from '../../navigation/types';

export type HomeScreenProps = BottomTabScreenProps<RootTabParamList, 'Home'>;

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <ScreenContainer>
      {/* Hero */}
      <Card variant="tinted" style={styles.heroCard}>
        <SectionLabel>{homeContent.eyebrow}</SectionLabel>
        <Text style={styles.heading}>{homeContent.heading}</Text>
        <Text style={styles.subtext}>{homeContent.subtext}</Text>
      </Card>

      {/* Why KySam */}
      <View style={styles.section}>
        <SectionLabel>Why KySam</SectionLabel>
        <View style={styles.whyRow}>
          {whyKysam.map(item => (
            <View key={item.label} style={styles.whyItem}>
              <IconBadge iconName={item.icon} tone="amber" size="md" />
              <Text style={styles.whyLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Services preview */}
      <View style={styles.section}>
        <SectionLabel>What we do</SectionLabel>
        <View style={styles.chipRow}>
          {services.slice(0, 4).map(s => (
            <View key={s.slug} style={styles.chipWrap}>
              <Chip label={s.name} tone="blue" />
            </View>
          ))}
        </View>
      </View>

      {/* CTAs */}
      <View style={styles.buttonRow}>
        <View style={styles.buttonFlex}>
          <Button
            label="Get in touch"
            onPress={() => navigation.navigate('Contact')}
          />
        </View>
        <View style={styles.buttonFlex}>
          <Button
            label="Our services"
            variant="secondary"
            onPress={() => navigation.navigate('Services')}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    marginBottom: theme.spacing.xxl,
    gap: theme.spacing.sm,
  },
  heading: {
    fontFamily: theme.typography.fontDisplay,
    fontSize: theme.typography.size.h1,
    color: theme.colors.textPrimary,
    lineHeight: theme.typography.size.h1 * 1.3,
  },
  subtext: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.body,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.size.body * 1.6,
  },
  section: {
    marginBottom: theme.spacing.xxl,
    gap: theme.spacing.md,
  },
  whyRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  whyItem: {
    alignItems: 'center',
    gap: theme.spacing.sm,
    flex: 1,
  },
  whyLabel: {
    fontFamily: theme.typography.fontBodyMedium,
    fontSize: theme.typography.size.small,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  chipWrap: {},
  buttonRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.xl,
  },
  buttonFlex: {
    flex: 1,
  },
});
