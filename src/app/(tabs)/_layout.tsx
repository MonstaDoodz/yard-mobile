import { Redirect, Tabs } from 'expo-router';

import { useSession } from '@/hooks/use-session';
import { colors, radii, surfaces, typography } from '@/theme/tokens';

export default function CustomerTabsLayout() {
  const { session, customer, loading } = useSession();

  if (loading) return null;
  if (!session || !customer) return <Redirect href="/" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.darkMuted,
        tabBarActiveBackgroundColor: colors.purple,
        tabBarLabelStyle: {
          fontFamily: typography.family.semibold,
          fontSize: 13,
        },
        tabBarItemStyle: {
          borderRadius: radii.md,
          marginHorizontal: 4,
          marginVertical: 8,
        },
        tabBarStyle: {
          backgroundColor: surfaces.tabBar,
          borderTopWidth: 0,
          paddingHorizontal: 10,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Book' }} />
      <Tabs.Screen name="rides" options={{ title: 'Rides' }} />
      <Tabs.Screen name="account" options={{ title: 'Account' }} />
    </Tabs>
  );
}
