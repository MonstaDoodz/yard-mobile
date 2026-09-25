import { Redirect, router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/ui/screen';
import { useSession } from '@/hooks/use-session';
import { signOutLocal } from '@/services/auth';
import { colors, typography } from '@/theme/tokens';

export default function UnsupportedAccountScreen() {
  const { session, customer, loading } = useSession();

  if (!loading && (!session || customer)) return <Redirect href="/" />;

  async function leave() {
    await signOutLocal();
    router.replace('/');
  }

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Customer app only</Text>
        <Text style={styles.body}>
          This Yard app does not expose driver, fleet, provider, dispatch, payout, or admin functionality.
        </Text>
        <Pressable style={styles.button} onPress={() => void leave()}>
          <Text style={styles.buttonText}>Sign out on this device</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 18,
  },
  title: {
    color: colors.light,
    fontSize: 28,
    fontFamily: typography.family.bold,
  },
  body: {
    color: colors.darkMuted,
    fontSize: 16,
    lineHeight: 23,
    fontFamily: typography.family.regular,
  },
  button: {
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#444',
  },
  buttonText: {
    color: colors.light,
    fontFamily: typography.family.bold,
  },
});
