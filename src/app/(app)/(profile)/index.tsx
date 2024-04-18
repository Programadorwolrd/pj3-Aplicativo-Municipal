import { View, Text } from 'react-native';
import React from 'react';
import { Button } from 'tamagui'//importa tamagui
import { Activity, Airplay } from '@tamagui/lucide-icons'//importa tamagui icons
import ButtonAuth from '@/components/ButtonAuth';
import TextAuth from '@/components/TextAuth';
import { router } from 'expo-router';
import { XStack, YStack } from 'tamagui';



export default function Profile() {
  return (
    <View>
       <YStack fullscreen>
      <ButtonAuth backgroundColor="green" color="black"  bgOpaco onPress={() => router.navigate('/(auth)/preregistration')}>
        Paia NOVO
      </ButtonAuth>
    </YStack> 
    </View>
  );
}


