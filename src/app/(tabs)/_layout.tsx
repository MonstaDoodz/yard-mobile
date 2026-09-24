import { Redirect, Tabs } from 'expo-router';

import { useSession } from '@/hooks/use-session';

export default function CustomerTabsLayout() {
  const { session, customer, loading } = useSession();

  if (loading) return null;
  if (!session || !customer) return <Redirect href="/" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#e8c15b',
        tabBarInactiveTintColor: '#8c8c8c',
        tabBarStyle: {
          backgroundColor: '#171717',
          borderTopColor: '#2d2d2d',
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Book' }} />
      <Tabs.Screen name="rides" options={{ title: 'Rides' }} />
      <Tabs.Screen name="account" options={{ title: 'Account' }} />
    </Tabs>
  );
}
