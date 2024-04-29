import { View } from 'react-native';
import React from 'react';
import { Button, Text } from 'tamagui'; //importa tamagui

import { router } from 'expo-router';
import { XStack, YStack } from 'tamagui';
import { ButtonCustom } from '@/components/buttonCustom';
import { storeAuth } from '@/lib/logicAuth';

export default function Profile() {
  const loggout = storeAuth((s) => s.logout);

  return (
    <View>
      <Text fontSize={100}>{''}</Text>
      <YStack>
        <ButtonCustom
          backgroundColor='green'
          color='black'
          bgOpaco
          onPress={() => router.replace('/(auth)/preregistration')}
        >
          Botão PreRegistro
        </ButtonCustom>

        <ButtonCustom onPress={() => loggout()}>Sair</ButtonCustom>
      </YStack>
    </View>
  );
}
