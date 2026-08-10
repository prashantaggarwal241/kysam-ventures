import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { theme } from '../../theme';

export interface TextFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  multiline?: boolean;
}

export default function TextField({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  required = false,
  multiline = false,
}: TextFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  const underlineColor = error
    ? theme.colors.amber
    : isFocused
      ? theme.colors.blue
      : theme.colors.border;

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.labelText}>{label}</Text>
        {required && (
          <Text style={styles.asterisk} testID="required-indicator">
            {' *'}
          </Text>
        )}
      </View>
      <TextInput
        style={[
          styles.input,
          multiline && styles.multiline,
          { borderBottomColor: underlineColor },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        multiline={multiline}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        accessibilityLabel={label}
        accessibilityHint={error}
        accessibilityRequired={required}
      />
      {error ? (
        <Text style={styles.errorText} accessibilityRole="alert">
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  labelText: {
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontBodyMedium,
    fontSize: theme.typography.size.body,
  },
  asterisk: {
    color: theme.colors.amber,
    fontFamily: theme.typography.fontBodyMedium,
    fontSize: theme.typography.size.body,
  },
  input: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xs,
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.body,
    color: theme.colors.textPrimary,
    backgroundColor: 'transparent',
    borderBottomWidth: 1.5,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: theme.colors.amber,
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.small,
    marginTop: theme.spacing.xs,
  },
});
