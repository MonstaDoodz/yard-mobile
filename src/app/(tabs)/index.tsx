import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { JourneyLocationField } from '@/components/ui/journey-location-field';
import { colors, radii, spacing, surfaces, typography } from '@/theme/tokens';

export default function BookHomeScreen() {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const pickupRef = useRef<TextInput>(null);
  const destinationRef = useRef<TextInput>(null);

  function startBooking() {
    if (!pickup.trim()) {
      pickupRef.current?.focus();
      return;
    }

    destinationRef.current?.focus();
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.identity}>
          <Text style={styles.wordmark}>YARD</Text>
          <Text style={styles.identityDetail}>PRIVATE TRAVEL</Text>
        </View>

        <View style={styles.intro}>
          <Text style={styles.eyebrow}>YOUR NEXT JOURNEY</Text>
          <Text style={styles.title}>Where to next?</Text>
          <Text style={styles.subtitle}>Thoughtful travel, on your schedule.</Text>
        </View>

        <View style={styles.locationCard}>
          <JourneyLocationField
            kind="pickup"
            label="Pickup"
            placeholder="Enter pickup location"
            value={pickup}
            onChangeText={setPickup}
            inputRef={pickupRef}
            onSubmitEditing={() => destinationRef.current?.focus()}
          />
          <View style={styles.fieldDivider} />
          <JourneyLocationField
            kind="destination"
            label="Destination"
            placeholder="Where are you going?"
            value={destination}
            onChangeText={setDestination}
            inputRef={destinationRef}
          />
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={startBooking}
          style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryButtonPressed]}
        >
          <Text style={styles.primaryButtonText}>Start a booking</Text>
          <Text style={styles.primaryButtonArrow}>→</Text>
        </Pressable>
        <Text style={styles.stepHint}>First, add your locations. Scheduling follows in the booking flow.</Text>

        <View style={styles.scheduledCard}>
          <View style={styles.scheduledDot} />
          <View style={styles.scheduledContent}>
            <Text style={styles.scheduledLabel}>SCHEDULED TRAVEL</Text>
            <Text style={styles.scheduledBody}>
              Plan ahead with a private chauffeur. Your schedule sets the pace.
            </Text>
          </View>
        </View>

        <View style={styles.places}>
          <Text style={styles.placesTitle}>Your places</Text>
          <Text style={styles.placesBody}>Saved and recent locations will live here.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: surfaces.canvas },
  content: {
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.hero,
  },
  identity: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  wordmark: {
    color: colors.dark,
    fontFamily: typography.family.bold,
    fontSize: 23,
    letterSpacing: 3.5,
  },
  identityDetail: {
    color: colors.inkMuted,
    fontFamily: typography.family.mono,
    fontSize: typography.size.micro,
    letterSpacing: 0.7,
  },
  intro: { marginTop: 54, marginBottom: spacing.xxl },
  eyebrow: {
    color: colors.purple,
    fontFamily: typography.family.mono,
    fontSize: typography.size.micro,
    letterSpacing: 1.5,
    marginBottom: spacing.md,
  },
  title: {
    color: colors.dark,
    fontFamily: typography.family.semibold,
    fontSize: typography.size.display,
    lineHeight: 44,
    letterSpacing: -1.5,
  },
  subtitle: {
    color: colors.inkMuted,
    fontFamily: typography.family.regular,
    fontSize: typography.size.body,
    lineHeight: 23,
    marginTop: spacing.sm,
  },
  locationCard: {
    backgroundColor: surfaces.card,
    borderRadius: radii.xl,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xs,
  },
  fieldDivider: { height: 1, marginLeft: 27, backgroundColor: colors.line },
  primaryButton: {
    minHeight: 62,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.xxl,
    borderRadius: radii.lg,
    backgroundColor: colors.purple,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  primaryButtonPressed: { opacity: 0.82 },
  primaryButtonText: {
    color: colors.white,
    fontFamily: typography.family.semibold,
    fontSize: 16,
  },
  primaryButtonArrow: {
    color: colors.white,
    fontFamily: typography.family.regular,
    fontSize: 28,
    lineHeight: 30,
  },
  stepHint: {
    color: colors.inkMuted,
    fontFamily: typography.family.regular,
    fontSize: typography.size.caption,
    lineHeight: 18,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  scheduledCard: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.hero,
    padding: spacing.xl,
    borderRadius: radii.lg,
    backgroundColor: surfaces.inverse,
  },
  scheduledDot: {
    width: 8,
    height: 8,
    borderRadius: radii.pill,
    backgroundColor: colors.gold,
    marginTop: 4,
  },
  scheduledContent: { flex: 1, gap: spacing.sm },
  scheduledLabel: {
    color: colors.gold,
    fontFamily: typography.family.mono,
    fontSize: typography.size.micro,
    letterSpacing: 1.2,
  },
  scheduledBody: {
    color: colors.white,
    fontFamily: typography.family.regular,
    fontSize: 14,
    lineHeight: 21,
  },
  places: { marginTop: spacing.hero, gap: spacing.sm },
  placesTitle: {
    color: colors.dark,
    fontFamily: typography.family.semibold,
    fontSize: 18,
  },
  placesBody: {
    color: colors.inkMuted,
    fontFamily: typography.family.regular,
    fontSize: 14,
    lineHeight: 21,
  },
});
