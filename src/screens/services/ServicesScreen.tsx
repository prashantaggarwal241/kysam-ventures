import { View, Text, StyleSheet } from 'react-native';
import ScreenContainer from '../../components/layout/ScreenContainer';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/ui/Card';
import IconBadge from '../../components/ui/IconBadge';
import { services } from '../../constants/content';
import { theme } from '../../theme';
import type { ScreenProps } from '../../navigation/types';

export type ServicesScreenProps = ScreenProps;

export default function ServicesScreen(_: ServicesScreenProps) {
  return (
    <ScreenContainer>
      <PageWrapper>
        {services.map(service => (
          <Card key={service.slug} variant="surface" style={styles.card}>
            <View style={styles.row}>
              <IconBadge iconName={service.icon} tone="blue" size="md" />
              <View style={styles.textBlock}>
                <Text style={styles.name}>{service.name}</Text>
                <Text style={styles.desc}>{service.shortDescription}</Text>
              </View>
            </View>
          </Card>
        ))}
      </PageWrapper>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
  },
  textBlock: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  name: {
    fontFamily: theme.typography.fontDisplay,
    fontSize: theme.typography.size.h3,
    color: theme.colors.textPrimary,
  },
  desc: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.body,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.size.body * 1.6,
  },
});
