import { Redirect, router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Screen } from '@/components/ui/screen';
import { useSession } from '@/hooks/use-session';
import { signInWithPassword } from '@/services/auth';

export default function SignInScreen() {
  const { session, customer, loading } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!loading && session && customer) return <Redirect href="/(tabs)" />;
  if (!loading && session && !customer) {
    return <Redirect href="/(auth)/unsupported-account" />;
  }

  async function submit() {
    if (!email.trim() || !password) return;
    setSubmitting(true);
    setError(null);

    const { error: signInError } = await signInWithPassword(email, password);
    setSubmitting(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.replace('/');
  }

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.eyebrow}>YARD</Text>
        <Text style={styles.title}>Customer sign in</Text>
        <Text style={styles.body}>
          Foundation login against Yard staging. Social sign-in will be wired when native deep-link handling is implemented.
        </Text>
        <TextInput
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor="#777"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          autoCapitalize="none"
          autoComplete="current-password"
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="#777"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Pressable
          disabled={submitting || !email.trim() || !password}
          onPress={() => void submit()}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
            (submitting || !email.trim() || !password) && styles.buttonDisabled,
          ]}
        >
          {submitting ? (
            <ActivityIndicator color="#171717" />
          ) : (
            <Text style={styles.buttonText}>Sign in</Text>
          )}
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 14,
  },
  eyebrow: {
    color: '#e8c15b',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
  },
  title: {
    color: '#e8e8e8',
    fontSize: 30,
    fontWeight: '700',
  },
  body: {
    color: '#a8a8a8',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  input: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: '#3a3a3a',
    borderRadius: 14,
    paddingHorizontal: 16,
    color: '#e8e8e8',
    backgroundColor: '#222222',
  },
  error: {
    color: '#dc2626',
    fontSize: 13,
  },
  button: {
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: '#e8c15b',
    marginTop: 4,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  buttonText: {
    color: '#171717',
    fontWeight: '700',
    fontSize: 15,
  },
});
