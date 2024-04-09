import ProviderStyle from '@/providers/providerStyle';
import ProviderAuth from '@/providers/providerAuth';
import { Slot } from 'expo-router';

//O  Slot indica onde o grupo "(app)" será renderizado
export default function RootLayout() {
  return (
    <ProviderStyle>
      <ProviderAuth>
        <Slot />
      </ProviderAuth>
    </ProviderStyle>
  );
}
