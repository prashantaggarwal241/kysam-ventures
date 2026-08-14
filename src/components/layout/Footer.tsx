import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <View style={styles.footer}>
      <Text style={styles.left}>© {year} KySam Ventures</Text>
      <Text style={styles.right}>Build · Grow · Create value</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
    marginTop: theme.spacing.xxl,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  left: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.caption,
    color: theme.colors.textMuted,
  },
  right: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.caption,
    color: theme.colors.textMuted,
    letterSpacing: 0.5,
  },
});
