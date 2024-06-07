import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { Image } from 'react-native';
import { ScrollView } from 'tamagui';
import CardCategoriaSeres, { PropsCard } from '@/components/cardCategoriaSeres';
import CardSeres from '@/components/CardSeres';




export default function homePage() {
    const categorias: PropsCard[] = [
        { link: "", title: 'Todos' },
        { link: "", title: 'Pássaros' },
        { link: "", title: 'Insetos' },
        { link: "", title: 'Roedores' },
        { link: "", title: 'Plantas' },
    ]

    const seres: PropsCardSeres[] = [
        { nome: "Tucano", categoria: "Passáros", }
    ]
    
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
                <View style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Image source={require('../../../assets/flecha-verde.png')} />
                </View>
            </View>
            <FlatList style={{
                marginStart: 25,
                marginEnd: 30,
                marginTop: 20,
                gap: 10
            }}

                ItemSeparatorComponent={() => <View style={{ padding: 3 }} />}

                horizontal={true}
                data={categorias}
                renderItem={({ item }) => <CardCategoriaSeres title={item.title} />}

            />
            <FlatList style={{
                marginStart: 25,
                marginEnd: 30,
                marginTop: 20,
                gap: 10,
                paddingBottom: 200
            }}

                ItemSeparatorComponent={() => <View style={{ padding: 3 }} />}

                horizontal={true}
                data={seres}
                renderItem={({ item }) => <CardSeres nome={item.nome} />}

            />


        </View>



    );
}

//diferença de uma varivel normal para um usestate ele é uma varivael que atualiza quando muda ele é um estado, varivaeis efunçoes glboais voce porde importar elas
