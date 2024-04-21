
import React from 'react'//importação do react
import { Activity, Airplay } from '@tamagui/lucide-icons'
import {View, Text,Image, Button} from 'tamagui'


export default function preregistration() {
  return (
    <View >
     <Text  marginTop="$10" fontSize="$9"alignSelf="center" color="green" fontWeight="bold" >BioDex</Text>
      {/* /fundo de folhas */}
      {/*  logo biodex  */}
      {/* Titulo */}
      <Text  fontSize="$10"  alignSelf="center">Vamos à Busca! </Text>
      {/* sub Titulo */}
      <Text  fontSize="$8" width="$100" height="$50"  alignSelf="center">Embarque agora na jornada para registrar todos os seres íncriveis e fascinantes do nosso parque. </Text>



      {/* logo */}


      <Image
  marginLeft="$5"
  alignSelf="center"
  source={require('../../assets/logo.svg')}
  style={{ width: 200, height: 300 }}
/>
{/* <Image margin="$10" alignSelf="center"
      source={{
        uri: 'https://picsum.photos/200/300',
        width: 200,
        height: 300,
        
      }} */}

      {/* notao */}
      <Button margin="$2" themeInverse width="$20" height="$4"  alignSelf="center" color="white" backgroundColor="#01714B" borderRadius="$9">
      Cadastrar
        </Button>



      {/* biotao2 */}
        <Button  width="$20" height="$4" size="$8"  alignSelf="center" color="white" backgroundColor="#BBBBBB" borderRadius="$9">
        Entrar
        </Button>
      
    </View>
  );
}







