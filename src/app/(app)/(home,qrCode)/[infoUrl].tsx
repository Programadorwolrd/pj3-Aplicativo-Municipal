import {
  FlatList,
  StyleSheet,
  Dimensions,
  Alert,
  type ImageSourcePropType,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
  Pressable,
} from "react-native";
import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { Button, Image, ScrollView, Text, View } from "tamagui";
import { TabsDemo } from "../../../components/tabs";
import { AirbnbRating } from "react-native-ratings";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import useAxios, { getFiles } from "@/lib/useAxios";
import { isAxiosError } from "axios";

export default function InfoUrl() {
  const axios = useAxios();
  const flatlistRef = useRef<FlatList>(null);
  const screenWidth = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation();
  const { infoUrl } = useLocalSearchParams();

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
    offset: screenWidth * index,
    index: index,
  });

  interface CarouselData {
    id: number;
    image: ImageSourcePropType;
    catalogoGaleria: Array<{
      id: number;
      catalogo_uuid: string;
      url: string;
      deleted_at: string | null;
    }>;
  }

  interface ContentData {
    nomePopular: string;
    nomeCientifico: string;
    nascimento: string;
    som: string;
    tabsMenu: string;
    estrela: number;
    medalha: string;
    catalogoGaleria: Array<{
      id: number;
      catalogo_uuid: string;
      url: string;
      deleted_at: string | null;
    }>;
  }

  const [carouselData, setCarouselData] = useState<CarouselData[]>([]);
  const [content, setContent] = useState<ContentData | null>(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/usuario/lerqrcode/${infoUrl}`);

        setCarouselData(data.catalogo.catalogoGaleria);
        setContent(data.catalogo);
      } catch (error) {
        if (isAxiosError(error)) console.log(error?.response?.data);
      }
    };

    fetchData();
  }, [infoUrl]);

  if (!content) return null;

  const renderItem = ({
    item,
    index,
  }: {
    item: ContentData;
    index: number;
  }) => {
    return (
      <View
        style={{ backgroundColor: "black", maxHeight: 550, aspectRatio: 1 }}
      >
        {item.catalogoGaleria.map((galeriaItem) => (
          <Image
            key={galeriaItem.id}
            source={{ uri: getFiles(galeriaItem.url) }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        ))}
      </View>
    );
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveIndex(index);
  };

  const renderDotIndicators = () => {
    if (!carouselData) {
      return null;
    }

    return carouselData.map((dot, index) => {
      return activeIndex === index ? (
        <View
          key={dot.id}
          style={{
            backgroundColor: "#329F60",
            height: 10,
            width: 19,
            borderRadius: 5,
            marginHorizontal: 6,
            borderColor: "green",
            borderWidth: 1,
          }}
        />
      ) : (
        <View
          key={dot.id}
          style={{
            backgroundColor: "transparent",
            height: 10,
            width: 10,
            borderRadius: 5,
            marginHorizontal: 4,
            borderColor: "#329F60",
            borderWidth: 1,
          }}
        />
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ position: "absolute", top: 50, left: 10, zIndex: 1 }}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={40} color="white" />
        </Pressable>
      </View>
      <ScrollView style={{ backgroundColor: "black" }}>
        <View style={{ position: "relative" }}>
          <FlatList
            data={carouselData}
            ref={flatlistRef}
            getItemLayout={getItemLayout}
            renderItem={({ item }) => (
              <Image
                source={{ uri: getFiles(item.url) }}
                w={screenWidth}
                aspectRatio={"12/15"}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            pagingEnabled={true}
            onScroll={handleScroll}
            showsHorizontalScrollIndicator={false}
          />
          <View
            style={{
              flexDirection: "row",
              position: "absolute",
              bottom: 5,
              marginHorizontal: "40%",
              marginBottom: 40,
            }}
          >
            {renderDotIndicators()}
          </View>
        </View>

        <ScrollView
          style={{
            backgroundColor: "black",
            borderTopLeftRadius: 40,
            overflow: "hidden",
            marginTop: -36,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              margin: 20,
              justifyContent: "space-between",
              marginBottom: -15,
            }}
          >
            <Text style={{ color: "white", fontSize: 18, marginVertical: 15 }}>
              {content?.nomePopular}
            </Text>
            <Image
              source={{ uri: getFiles(content.medalha) }}
              style={{
                marginLeft: 10,
                height: 50,
                width: 50,
                borderRadius: 50,
              }}
            />
          </View>

          <Text
            style={{
              color: "#878787",
              fontSize: 18,
              marginHorizontal: 20,
              marginTop: 10,
              marginBottom: 5,
            }}
          >
            {content?.nomeCientifico}
          </Text>

          <Text style={{ marginHorizontal: 20, marginVertical: 5 }}>
            <AirbnbRating
              count={5}
              reviewSize={0}
              defaultRating={content?.estrela}
              selectedColor="#329F60"
              showRating={false}
              reviewColor="green"
              size={20}
              isDisabled={true}
            />
          </Text>
          <TabsDemo catalogo={content} />
          <Button
            onPress={() =>
              Alert.alert("Sucesso", "Você capturou o Ser vivo com sucesso!")
            }
            style={{
              backgroundColor: "white",
              color: "black",
              fontSize: 18,
              marginHorizontal: "auto",
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

const styles = StyleSheet.create({});
