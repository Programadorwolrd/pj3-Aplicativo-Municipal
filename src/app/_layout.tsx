import ProviderStyle from '@/components/providerStyle';
import { router, Slot, Stack } from 'expo-router';
import { Text } from 'tamagui';

export default function AppLayout() {

  return (
    <ProviderStyle>

      <Slot/>
    </ProviderStyle>
  );
}
