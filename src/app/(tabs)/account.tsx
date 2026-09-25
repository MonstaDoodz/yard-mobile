import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/ui/screen';
import { useSession } from '@/hooks/use-session';
import { signOutLocal } from '@/services/auth';
import { colors, typography } from '@/theme/tokens';

export default function AccountFoundationScreen() {
  const { customer } = useSession();

  async function logout() {
    await signOutLocal();
    router.replace('/');
  }

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.eyebrow}>ACCOUNT</Text>
        <Text style={styles.title}>{customer?.fullName || 'Yard customer'}</Text>
        <Text style={styles.body}>{customer?.email}</Text>
        <Pressable style={styles.button} onPress={() => void logout()}>
          <Text style={styles.buttonText}>Log out on this device</Text>
        </Pressable>
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
    fontSize: 15,
    fontFamily: typography.family.regular,
  },
  button: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#444',
    marginTop: 16,
  },
  buttonText: {
    color: colors.light,
    fontFamily: typography.family.bold,
  },
});
