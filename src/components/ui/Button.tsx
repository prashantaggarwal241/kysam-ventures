import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

export interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  accessibilityLabel?: string;
}

export default function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  accessibilityLabel,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.base,
        variant === 'primary' ? styles.primary : styles.secondary,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled }}
    >
      <Text
        style={[
          styles.label,
          variant === 'primary' ? styles.primaryLabel : styles.secondaryLabel,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xxl,
    borderRadius: theme.radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: theme.colors.amber,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: theme.colors.navy,
  },
  disabled: {
    opacity: 0.4,
  },
  label: {
    fontFamily: theme.typography.fontBodyMedium,
    fontSize: theme.typography.size.body,
  },
  primaryLabel: {
    color: theme.colors.amberTextOnFill,
  },
  secondaryLabel: {
    color: theme.colors.navy,
  },
});
