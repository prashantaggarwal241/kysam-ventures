import { View, Text, Linking, StyleSheet } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import ScreenContainer from '../../components/layout/ScreenContainer';
import Card from '../../components/ui/Card';
import SectionLabel from '../../components/ui/SectionLabel';
import IconBadge from '../../components/ui/IconBadge';
import Button from '../../components/ui/Button';
import { contactContent } from '../../constants/content';
import { theme } from '../../theme';
import type { RootTabParamList } from '../../navigation/types';

export type ContactScreenProps = BottomTabScreenProps<RootTabParamList, 'Contact'>;

export default function ContactScreen(_: ContactScreenProps) {
  const handleEmail = () => {
    void Linking.openURL(`mailto:${contactContent.email}`);
  };

  return (
    <ScreenContainer>
      <View style={styles.section}>
        <SectionLabel>Get in touch</SectionLabel>
        <Card variant="surface" style={styles.contactCard}>
          <View style={styles.contactRow}>
            <IconBadge iconName="mail-outline" tone="blue" size="sm" />
            <Text style={styles.contactText}>{contactContent.email}</Text>
          </View>
          <View style={styles.contactRow}>
            <IconBadge iconName="location-outline" tone="blue" size="sm" />
            <Text style={styles.contactText}>{contactContent.location}</Text>
          </View>
        </Card>
      </View>

      <Button
        label="Send us a message"
        onPress={handleEmail}
        accessibilityLabel="Send an email to KySam Ventures"
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xxl,
  },
  contactCard: {
    gap: theme.spacing.md,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  contactText: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.body,
    color: theme.colors.textPrimary,
    flex: 1,
  },
});
