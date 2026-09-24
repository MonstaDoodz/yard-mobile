import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/ui/screen';

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
    fontSize: 16,
    lineHeight: 23,
  },
});
