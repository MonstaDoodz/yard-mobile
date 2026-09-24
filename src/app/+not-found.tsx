import { Link } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { Screen } from '@/components/ui/screen';

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
    color: '#e8e8e8',
    fontSize: 28,
    fontWeight: '700',
  },
  link: {
    color: '#e8c15b',
    marginTop: 16,
  },
});
