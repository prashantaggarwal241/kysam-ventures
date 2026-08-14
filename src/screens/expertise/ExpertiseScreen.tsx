import { View, StyleSheet } from 'react-native';
import ScreenContainer from '../../components/layout/ScreenContainer';
import SectionLabel from '../../components/ui/SectionLabel';
import Chip from '../../components/ui/Chip';
import { expertiseAreas, industries } from '../../constants/content';
import { theme } from '../../theme';
import type { ScreenProps } from '../../navigation/types';

export type ExpertiseScreenProps = ScreenProps;

export default function ExpertiseScreen(_: ExpertiseScreenProps) {
  return (
    <ScreenContainer>
      <View style={styles.section}>
        <SectionLabel>Areas of Expertise</SectionLabel>
        <View style={styles.twoColGrid}>
          {expertiseAreas.map(area => (
            <View key={area} style={styles.gridCell}>
              <Chip label={area} tone="blue" />
            </View>
          ))}
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <SectionLabel>Industries</SectionLabel>
        <View style={styles.chipRow}>
          {industries.map(ind => (
            <View key={ind} style={styles.chipWrap}>
              <Chip label={ind} tone="neutral" />
            </View>
          ))}
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: theme.spacing.md,
  },
  twoColGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridCell: {
    width: '50%',
    paddingRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.xl,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  chipWrap: {},
});
