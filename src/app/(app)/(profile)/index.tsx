import { View, Text } from 'react-native';
import React from 'react';
import { Button } from 'tamagui'; //importa tamagui
import { Activity, Airplay } from '@tamagui/lucide-icons'; //importa tamagui icons


import { router } from 'expo-router';
import { XStack, YStack } from 'tamagui';
import { ButtonCustom } from '@/components/buttonCustom';

export default function Profile() {
  return (
    <View>
      <YStack fullscreen>
        <ButtonCustom
          backgroundColor='green'
          color='black'
          bgOpaco
          onPress={() => router.replace('/(auth)/preregistration')}
        >
          Paia NOVO
        </ButtonCustom>
      </YStack>
    </View>
  );
}
