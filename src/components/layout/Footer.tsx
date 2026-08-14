import { View, Text, StyleSheet } from 'react-native';
import { theme, maxContentWidth } from '../../theme';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <View style={styles.outer}>
      <View style={styles.inner}>
        <Text style={styles.left}>© {year} KySam Ventures</Text>
        <Text style={styles.right}>Build · Grow · Create value</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
  inner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    width: '100%',
    maxWidth: maxContentWidth,
    alignSelf: 'center',
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
