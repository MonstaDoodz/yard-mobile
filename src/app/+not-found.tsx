import { Link } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { Screen } from '@/components/ui/screen';
import { colors, typography } from '@/theme/tokens';

export default function NotFoundScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Not found</Text>
      <Link href="/" style={styles.link}>Return to Yard</Link>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.light,
    fontSize: 28,
    fontFamily: typography.family.bold,
  },
  link: {
    color: colors.gold,
    marginTop: 16,
    fontFamily: typography.family.medium,
  },
});
