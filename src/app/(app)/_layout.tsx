import IconsTabs from '@/components/iconsTabs';
import { Tabs } from 'expo-router';

const capivaraTriste = require('@/assets/iconLay.jpeg');

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarIcon: () => <IconsTabs foto={capivaraTriste} />,
      }}
    />
  );
}
