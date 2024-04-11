import IconsTabs from '@/components/iconsTabs';
import { Tabs } from 'expo-router';

const capivaraTriste = require('@/assets/iconLay.jpeg');

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

      }}
    >

      <Tabs.Screen name='(mapa)' options={{ tabBarIcon: () => <IconsTabs foto={capivaraTriste} />, }} />
      <Tabs.Screen name='(home)' options={{ tabBarIcon: () => <IconsTabs foto={capivaraTriste} />, }} />
      <Tabs.Screen name='(qrCode)' options={{ tabBarIcon: () => <IconsTabs foto={capivaraTriste} />, }} />
      <Tabs.Screen name='(profile)' options={{  tabBarIcon: () => <IconsTabs foto={capivaraTriste} />, }} />
      <Tabs.Screen name='(ranking)' options={{  tabBarIcon: () => <IconsTabs foto={capivaraTriste} />, }} />
    </Tabs>
  );
}
