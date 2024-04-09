import IconsTabs from '@/components/iconsTabs';
import { Tabs } from 'expo-router';

const capivaraTriste = require('@/assets/iconLay.jpeg');

export default function HomeLayout() {
  return (
    <Tabs screenOptions={{ tabBarIcon: () => <IconsTabs foto={capivaraTriste} /> }}>
      <Tabs.Screen name='index' />
      <Tabs.Screen name='paia' />
      <Tabs.Screen name='profile' />
    </Tabs>
  );
}
