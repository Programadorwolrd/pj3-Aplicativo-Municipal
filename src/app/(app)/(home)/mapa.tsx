import React from 'react';
import Button from '../../../components/botao';
import Card from '../../../components/card-mapa';
import myImage from '../../../assets/mapaoficial.png'; // substitua 'suaImagem.png' pelo nome correto da sua imagem
import { Image, Text, View } from 'tamagui';

export default function mapaPage() {
  return (
    <View>
      <Text
        style={{
          color: 'green',
          fontWeight: 'bold',
          fontSize: 25,
          alignSelf: 'center',
          margin: 30,
        }}
      >
        Liberar Areas
      </Text>
      <View flex={1} w={'100%'} flexDirection='row' height={'100%'}>
        <View f={1} height={'100%'}>
          <Card />
        </View>

        <View>
          <Image source={myImage} h={'100%'} w='100%' />
        </View>
      </View>
    </View>
  );
}

//diferença de uma varivel normal para um usestate ele é uma varivael que atualiza quando muda ele é um estado, varivaeis efunçoes glboais voce porde importar elas
