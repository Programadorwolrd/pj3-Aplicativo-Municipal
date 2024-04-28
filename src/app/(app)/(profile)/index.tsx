import { View } from 'react-native';
import React from 'react';
import { Button, Text } from 'tamagui'; //importa tamagui


import { router } from 'expo-router';
import { XStack, YStack } from 'tamagui';
import { ButtonCustom } from '@/components/buttonCustom';
import { useGetToken, useLogout } from '@/lib/logicAuth';

export default function Profile() {
  const { mutate } = useLogout();

  const { data } = useGetToken();

  return (
    <View>
      <Text fontSize={100}>{data}</Text>
      <YStack>
        <ButtonCustom
          backgroundColor='green'
          color='black'
          bgOpaco
          onPress={() => router.replace('/(auth)/preregistration')}
        >
          Botão PreRegistro
        </ButtonCustom>

        <ButtonCustom onPress={(x) => mutate()}>Sair</ButtonCustom>
      </YStack>
    </View>
  );
}
