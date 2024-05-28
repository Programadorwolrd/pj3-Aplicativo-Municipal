//******************** AINDA NÃO TERMINEI **************************
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  LogBox,
  Image,
  TouchableOpacity,
  type ImageSourcePropType,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from 'react-native';
import React, { useEffect, useRef, useState, type ReactNode } from 'react';
import { Button, ScrollView } from 'tamagui';
import { TabsDemo } from '../../../components/tabs';
import { AirbnbRating } from 'react-native-ratings';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function InfoUrl() {
  const flatlistRef = useRef<FlatList>(null);
  // Get Dimesnions
  const screenWidth = Dimensions.get('window').width;
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation();

  // Auto Scroll

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeIndex === carouselData.length - 1) {
        flatlistRef.current?.scrollToIndex({
          index: 0,
          animated: true,
        });
      } else {
        flatlistRef.current?.scrollToIndex({
          index: activeIndex + 1,
          animated: true,
        });
      }
    }, 10000);

    return () => clearInterval(interval);
  });

  const getItemLayout = (data: unknown, index: number) => ({
    length: screenWidth,
    offset: screenWidth * index, // for first image - 300 * 0 = 0pixels, 300 * 1 = 300, 300*2 = 600
    index: index,
  });
  //

  const Content = {
    name: 'Tucano',
    age: '+20 anos de idade',
    scientificName: 'nome cientifico',
    detalhes:
      'Tucano é uma ave pertencente à família Ramphastidae, que engloba animais com bico longo, colorido, cortante e leve. Esses animais ocorrem apenas no Neotrópico, distribuindo-se do México à Argentina.',
    audio: 'audio teste',
    map: 'mapa teste',
    tabsMenu: 'bghdhnfg',
    stars: 4,
    medalha: require('../../../assets/medalha.png'),
    sound: require('../../../assets/som_tucano.mp3'),
  };

  interface CarouselData {
    id: number;
    image: ImageSourcePropType;
  }
  const carouselData: CarouselData[] = [
    {
      id: 0,
      image: require('../../../assets/tucano.png'),
    },
    {
      id: 1,
      image: require('../../../assets/tucano.png'),
    },
    {
      id: 2,
      image: require('../../../assets/tucano.png'),
    },
  ];

  //  Display Images // UI
  const renderItem = (props: { item: CarouselData; index: number }) => {
    return (
      <View style={{ backgroundColor: 'black' }}>
        <Image source={props.item.image} style={{ height: 460, width: screenWidth }} />
      </View>
    );
  };

  // Handle Scroll
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    // Get the scroll position
    const scrollPosition = event.nativeEvent.contentOffset.x;
    // Get the index of current active item
    const index = Math.round(scrollPosition / screenWidth);
    // Update the index
    setActiveIndex(index); // assuming you have a state variable called activeIndex
  };

  // Render Dot Indicators
  const renderDotIndicators = () => {
    return carouselData.map((dot, index) => {
      // if the active index === index

      return activeIndex === index ? (
        <View
          style={{
            backgroundColor: '#329F60',
            height: 10,
            width: 19,
            borderRadius: 5,
            marginHorizontal: 6,
            borderColor: 'green',
            borderWidth: 1,
          }}
        />
      ) : (
        <View
          key={dot.id}
          style={{
            backgroundColor: 'transparent',
            height: 10,
            width: 10,
            borderRadius: 5,
            marginHorizontal: 4,
            borderColor: '#329F60',
            borderWidth: 1,
          }}
        />
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ position: 'absolute', top: 50, left: 10, zIndex: 1 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='arrow-back' size={40} color='white' />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ backgroundColor: 'black' }}>
        <View style={{ position: 'relative' }}>
          <FlatList
            data={carouselData}
            ref={flatlistRef}
            getItemLayout={getItemLayout}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            pagingEnabled={true}
            onScroll={handleScroll}
            showsHorizontalScrollIndicator={false}
          />
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              bottom: 5,
              marginHorizontal: '40%',
              marginBottom: 40,
            }}
          >
            {renderDotIndicators()}
          </View>
        </View>

        <ScrollView
          style={{
            backgroundColor: 'black',
            borderTopLeftRadius: 40,
            overflow: 'hidden',
            marginTop: -36,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              margin: 20,
              justifyContent: 'space-between',
              marginBottom: -15,
            }}
          >
            <Text style={{ color: 'white', fontSize: 18 }}>{Content.age}</Text>
            <Image
              source={Content.medalha}
              style={{ marginLeft: 10 }} // Adicione algum espaço entre o texto e a imagem
            />
          </View>
          <Text style={{ color: 'white', fontSize: 18, marginHorizontal: 20 }}>
            {Content.name}
          </Text>
          <Text
            style={{
              color: '#878787',
              fontSize: 18,
              marginHorizontal: 20,
              marginVertical: 5,
            }}
          >
            {Content.scientificName}
          </Text>

          <Text style={{ marginHorizontal: 20, marginVertical: 5 }}>
            <AirbnbRating
              count={5}
              reviewSize={0}
              defaultRating={Content.stars}
              selectedColor='#329F60'
              unSelectedColor='#282828'
              showRating={false}
              reviewColor='green'
              size={20}
              isDisabled={true}
            />
          </Text>
          <TabsDemo catalogo={Content} />
          <Button
            onPress={() => {
              router.navigate('/');
            }}
            style={{
              backgroundColor: 'white',
              color: 'black',
              fontSize: 18,
              marginHorizontal: 'auto',
              marginVertical: 20,
              width: 340,
            }}
          >
            Capturar Ser vivo 🌿
          </Button>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

// export default InfoUrl;

const styles = StyleSheet.create({});
