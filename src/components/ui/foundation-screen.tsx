import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/ui/screen';
import { colors, typography } from '@/theme/tokens';

type Props = {
  title: string;
  body: string;
};

export function FoundationScreen({ title, body }: Props) {
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.eyebrow}>YARD</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body}</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 12,
  },
  eyebrow: {
    color: colors.gold,
    fontSize: 12,
    fontFamily: typography.family.bold,
    letterSpacing: 2,
  },
  title: {
    color: colors.light,
    fontSize: 30,
    fontFamily: typography.family.bold,
  },
  body: {
    color: colors.darkMuted,
    fontSize: 16,
    lineHeight: 23,
    fontFamily: typography.family.regular,
  },
});
