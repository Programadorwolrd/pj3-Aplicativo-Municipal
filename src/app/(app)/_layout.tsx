import IconsTabs from '@/components/iconsTabs';
import { Redirect, router, Tabs, useFocusEffect } from 'expo-router';
import { useEffect } from 'react';

const capivaraTriste = require('@/assets/iconLay.jpeg');

export default function HomeLayout() {
  // simular loggin até a logica estiver completa
  const isLogged = true;

  if (!isLogged) return <Redirect href={'/(auth)/'} />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='(mapa)'
        options={{ tabBarIcon: () => <IconsTabs foto={capivaraTriste} /> }}
      />
      <Tabs.Screen
        name='(home)'
        options={{ tabBarIcon: () => <IconsTabs foto={capivaraTriste} /> }}
      />
      <Tabs.Screen
        name='(qrCode)'
        options={{ tabBarIcon: () => <IconsTabs foto={capivaraTriste} /> }}
      />
      <Tabs.Screen
        name='(profile)'
        options={{ tabBarIcon: () => <IconsTabs foto={capivaraTriste} /> }}
      />
      <Tabs.Screen
        name='(ranking)'
        options={{ tabBarIcon: () => <IconsTabs foto={capivaraTriste} /> }}
      />
    </Tabs>
  );
}
