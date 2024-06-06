import { View, Text } from 'react-native';
import React from 'react';
import { Image } from 'react-native';
import cardCategoriaSeres from '@/components/cardCategoriaSeres';
import CardCategoriaSeres from '@/components/cardCategoriaSeres';
import { ScrollView } from 'tamagui';



export default function homePage() {
    const flavio = "Flavio";
    return (

        <View style={{ backgroundColor: '#fff' }}>
            <Text
                style={{
                    fontWeight: 'bold',
                    fontSize: 25,
                    marginStart: 30,
                    marginTop: 25,
                }}
            >
                Hello, {flavio} 🍀
            </Text>
            <Text style={{
                fontWeight: '300',
                marginStart: 25,
                marginTop: 10,
                fontSize: 22,
            }}> Seja Bem Vindo ao Parque</Text>



            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 15,
                marginStart: 23,
                marginEnd: 25
            }}>

                <Image style={{
                    width: '95%',


                }}
                    source={require('../../../assets/home-banner1.png')} />
            </View>
            <View style={{
                flexDirection: 'row',
                display: 'flex',
                justifyContent: "space-between",
                marginStart: 30,
                marginEnd: 40,
                marginTop: 30,
            }}>
                <View>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 25,
                    }}> Descubra novos seres</Text>
                </View>
                <View>
                    <Image source={require('../../../assets/flecha-verde.png')} />
                </View>
            </View>
            <ScrollView horizontal={true} 
            style={{
                marginStart: 25,
                marginEnd: 30,
                marginTop: 30,
                gap: 10
            }}>
                <CardCategoriaSeres link='https://www.dicionariopopular.com/significado-todos-emojis-de-folhas/' title='Todos os Seres'/> 
                <CardCategoriaSeres link='https://www.dicionariopopular.com/significado-todos-emojis-de-folhas/' title='Roedores'/> 
                <CardCategoriaSeres link='https://www.dicionariopopular.com/significado-todos-emojis-de-folhas/' title='Pássaros'/> 
                <CardCategoriaSeres link='https://www.dicionariopopular.com/significado-todos-emojis-de-folhas/' title='Plantas'/> 
                <CardCategoriaSeres link='https://www.dicionariopopular.com/significado-todos-emojis-de-folhas/' title='Insetos'/>  
                </ScrollView>
        </View>



    );
}

//diferença de uma varivel normal para um usestate ele é uma varivael que atualiza quando muda ele é um estado, varivaeis efunçoes glboais voce porde importar elas
