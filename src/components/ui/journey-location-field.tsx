import type { RefObject } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, spacing, typography } from '@/theme/tokens';

type Props = {
  kind: 'pickup' | 'destination';
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  inputRef: RefObject<TextInput | null>;
  onSubmitEditing?: () => void;
};

export function JourneyLocationField({ kind, label, placeholder, value, onChangeText, inputRef, onSubmitEditing }: Props) {
  return (
    <View style={styles.row}>
      <View style={[styles.marker, kind === 'destination' && styles.destinationMarker]} />
      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          ref={inputRef}
          accessibilityLabel={label}
          autoCapitalize="words"
          autoCorrect={false}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          placeholder={placeholder}
          placeholderTextColor={colors.inkSoft}
          returnKeyType={kind === 'pickup' ? 'next' : 'done'}
          style={styles.input}
          value={value}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { minHeight: 78, flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
  marker: { width: 11, height: 11, borderRadius: 6, backgroundColor: colors.purple },
  destinationMarker: { borderRadius: 3, backgroundColor: colors.dark },
  content: { flex: 1, gap: spacing.xs },
  label: {
    color: colors.inkMuted,
    fontFamily: typography.family.mono,
    fontSize: typography.size.micro,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  input: {
    minHeight: 34,
    padding: 0,
    color: colors.dark,
    fontFamily: typography.family.medium,
    fontSize: 17,
  },
});
