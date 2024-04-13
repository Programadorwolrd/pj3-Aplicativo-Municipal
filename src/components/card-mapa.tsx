import React from 'react';
import { View, Text, Image } from 'tamagui'; // Certifique-se de importar Image do pacote tamagui

const Card = () => {
  return (
    <View style={{ display: 'flex', flexDirection: 'column' }}>
      
      <View style={{ width: '43%', height: '22%', alignSelf: 'flex-start', borderRadius:30, marginLeft: 20, backgroundColor: '#25353E' }}>
      <Image source={require('../assets/bandeira.png')} style={{ width: '20%', height: '20%',marginLeft:20,marginTop: 20 }} />
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 50, alignSelf: 'left',marginLeft:20, }}>4/13</Text>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize:15, alignSelf: 'left',marginLeft:20 }}>Pontos Scanead</Text>
        
      </View>

      <View style={{ width: '43%', height: '44%', alignSelf: 'flex-start', marginTop: 15, borderRadius: 35, marginLeft: 20, backgroundColor: '#329f5f2b' }}>
      <Image source={require('../assets/mapa.png')} style={{ width: '15%', height: '15%',marginLeft:20,marginTop: 20 }} />
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 50, alignSelf: 'left',marginLeft:20, }}>4/13</Text>
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize:15, alignSelf: 'left',marginLeft:20 }}>Pontos Scanead</Text>
        
        
        <Image source={require('../assets/pin.png')} style={{ width: '15%', height: '15%',marginLeft:20,marginTop: 20 }} />
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 50, alignSelf: 'left',marginLeft:20, }}>4/13</Text>
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize:15, alignSelf: 'left',marginLeft:20 }}>Pontos Scanead</Text>
        
      </View>

      <View style={{ width: '43%', height: '20%', alignSelf: 'flex-start', marginTop: 20, borderRadius: 25, marginLeft: 20, backgroundColor: '#ffffff3c' }}>
      <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 21, alignSelf: 'left',marginLeft:20, }}>Dica!</Text>
      <Text style={{ color: 'black', fontSize:15, alignSelf: 'left',marginLeft:20 }}>
      Procure perto das arvores e de zonas de fluxo , com facil acesso remoto ou arvores.</Text>
      </View>
    </View>
  );
};

export default Card;
