import React from 'react';
import { View, Text, Image } from 'tamagui'; // Certifique-se de importar Image do pacote tamagui
import myImage from '../assets/mapaoficial.png'; // substitua 'suaImagem.png' pelo nome correto da sua imagem

const Card = () => {
  return (



    
    <View style={{ display: 'flex', flexDirection: 'column' }}>
      <View
        style={{
          width: '43%',
          height: '22%',
          alignSelf: 'flex-start',
          borderRadius: 30,
          marginLeft: 20,
          backgroundColor: '#25353E',
        }}
      >
        <Image
          source={require('../assets/bandeira.png')}
          style={{ width: '20%', height: '20%', marginLeft: 20, marginTop: 20 }}
        />
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 50,
            alignSelf: 'left',
            marginLeft: 20,
          }}
        >
          4/13
        </Text>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 15,
            alignSelf: 'left',
            marginLeft: 20,
          }}
        >
          Pontos Scanead
        </Text>
      </View>

      <View
        style={{
          width: '43%',
          height: '44%',
          alignSelf: 'flex-start',
          marginTop: 15,
          borderRadius: 35,
          marginLeft: 20,
          backgroundColor: '#329f5f2b',
        }}
      >
        <Image
          source={require('../assets/mapa.png')}
          style={{ width: '15%', height: '12%', marginLeft: 20, marginTop: 20 }}
        />
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 50,
            alignSelf: 'left',
            marginLeft: 20,
          }}
        >
          1/14
        </Text>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 15,
            alignSelf: 'left',
            marginLeft: 20,
          }}
        >
          Pontos Scanead
        </Text>

        <Image
          source={require('../assets/pin.png')}
          style={{ width: '15%', height: '12%', marginLeft: 20, marginTop: 20 }}
        />
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 50,
            alignSelf: 'left',
            marginLeft: 20,
          }}
        >
          6/43
        </Text>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 15,
            alignSelf: 'left',
            marginLeft: 20,
          }}
        >
          Pontos Scanead
        </Text>
      </View>

      <View
        style={{
          width: '43%',
          height: '20%',
          alignSelf: 'flex-start',
          marginTop: 20,
          borderRadius: 25,
          marginLeft: 20,
          backgroundColor: '#ffffff3c',
        }}
      >
        <Text
          style={{
            color: 'green',
            fontWeight: 'bold',
            fontSize: 21,
            alignSelf: 'left',
            marginLeft: 20,
          }}
        >
          Dica!
        </Text>

        <Text style={{ color: 'black', fontSize: 15, alignSelf: 'left', marginLeft: 20 }}>
          Procure perto das arvores e de zonas de fluxo , com facil acesso remoto ou
          arvores.
        </Text>
      </View>


      <Image source={myImage} style={{ width: 100, height: 600, marginLeft: 510,marginTop: -210, }} />
    </View>
  );
};

export default Card;
