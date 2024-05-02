import { View } from 'react-native';
import React from 'react';
import { Text } from 'tamagui'; //importa tamagui

import { router } from 'expo-router';
import { XStack, YStack } from 'tamagui';
import { ButtonCustom } from '@/components/buttonCustom';
import { storeAuth } from '@/lib/logicAuth';
import { useApi } from '@/lib/axiosApi';

export default function Profile() {
  const loggout = storeAuth((s) => s.logout);

  const { data, error } = useApi('query', (axios) => ({
    queryKey: ['getMyProfile'],
    queryFn() {
      return axios.get('/usuario/123');
    },
  }));

 
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

        <Text fontSize={100}>{data?.data?.usuario?.apelido}</Text>
        <ButtonCustom onPress={loggout}>Sair</ButtonCustom>
      </YStack>
    </View>
  );
}
