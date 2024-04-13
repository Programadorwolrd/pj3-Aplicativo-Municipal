import { View, Text } from 'react-native';
import React from 'react';
import Button from '../../../components/botao'
import Card from '../../../components/card-mapa'


export default function Profile() {
  return (
    <View>
       <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 25, alignSelf: 'center',margin:30 }}>Liberar Areas</Text>
       
     
      <Card></Card>
    </View>
  );
}

//diferença de uma varivel normal para um usestate ele é uma varivael que atualiza quando muda ele é um estado, varivaeis efunçoes glboais voce porde importar elas 
