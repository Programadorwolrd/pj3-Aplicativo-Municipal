import React from 'react';
import { View, Text, Button } from 'tamagui';
import Logo from '../../assets/logo.svg';
import styled from 'styled-components'; // Importe o styled-components

const ImageBackground = styled.div`
  /* Estilos para o plano de fundo da imagem */
  background-image: url('@/assets/background-login.png');
  background-size: cover;
  height: 100vh; /* Defina a altura conforme necessário */
`;

const LogoContainer = styled.div`
  margin: 10px; /* Adicione a margem ao redor do logotipo */
`;aaa

export default function preregistration() {
  return (
    <ImageBackground>
      <View>
        <Text marginTop="$10" fontSize="$9" alignSelf="center" color="green" fontWeight="bold">
          BioDex
        </Text>
        <Text fontSize="$10" color="white" alignSelf="center">
          Vamos à Busca!
        </Text>' '
        <Text marginBottom="$5" fontSize="$8" color="grey" width="$100" height="$40" alignSelf="center">
          Embarque agora na jornada para registrar todos os seres incríveis e fascinantes do nosso parque.
        </Text>
        {/* Use o LogoContainer para aplicar a margem ao redor do logotipo */}
        <LogoContainer>
          <Logo width={220} height={220} />
        </LogoContainer>
        <Button marginTop="$5" themeInverse margin="$2" width="$20" height="$4" size="$8" alignSelf="center" color="white" backgroundColor="#01714B" borderRadius="$9">
          Cadastrar
        </Button>
        <Button width="$20" height="$4" size="$8" alignSelf="center" color="white" backgroundColor="#BBBBBB" borderRadius="$9">
          Entrar
        </Button>
      </View>
    </ImageBackground>
  );
}
