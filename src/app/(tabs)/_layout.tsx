import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import IconsTabs from '@/components/iconsTabs';

const capivaraTriste = require('src/assets/iconLay.jpeg');

export default function layoutTabs() {
  const icon = () => <IconsTabs foto={capivaraTriste} />;

  return (
    <Tabs>
      <Tabs.Screen name='index' options={{ tabBarIcon: icon }} />

      <Tabs.Screen name='paia1' options={{ tabBarIcon: icon }} />
    </Tabs>
  );
}
