import {
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Modal,
  TouchableHighlight,
  type ImageSourcePropType,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
  Pressable,
} from "react-native";
import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { Button, Image, ScrollView, Text, View } from "tamagui";
import { TabsDemo } from "../../../components/tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import useAxios, { getFiles } from "@/lib/useAxios";
import ErrorScreen from "@/components/ErrorScreen";
import { clientQuery } from "@/app/_layout";
import { useGetQrcode } from "@/lib/querys";
import Loading from "@/components/loading";

export default function InfoUrl() {
  const flatlistRef = useRef<FlatList>(null);
  const screenWidth = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const { infoUrl } = useLocalSearchParams();

  const uri = Array.isArray(infoUrl) ? infoUrl[0] : infoUrl;

  const { data, isLoading, isSuccess } = useGetQrcode(uri);
  const carouselData = data?.data.catalogo.catalogoGaleria;
  const content = data?.data.catalogo;

  useEffect(() => {
    if (isSuccess && carouselData) {
      clientQuery.invalidateQueries({ queryKey: ["currentUser"] });
      clientQuery.invalidateQueries({ queryKey: ["rank"] });

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
    }
  }, [isSuccess]);

  if (isLoading) return <Loading />;

  if (!data)
    return (
      <ErrorScreen
        title="Ser vivo não encontrado"
        text="Escaneie um QrCode valido"
      />
    );

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
    som: string;
    especie: string;
    tabsMenu: string;
    medalha: string;
    catalogoGaleria: Array<{
      id: number;
      catalogo_uuid: string;
      url: string;
      deleted_at: string | null;
    }>;
  }

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
            source={{ uri: getFiles(galeriaItem?.url) }}
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

  if (content)
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
              <Text
                style={{ color: "white", fontSize: 18, marginVertical: 15 }}
              >
                {content?.nomePopular}
              </Text>
              <Image
                source={{ uri: getFiles(content?.medalha) }}
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

            <Text
              style={{
                color: "#878787",
                fontSize: 18,
                marginHorizontal: 20,
                marginTop: 10,
                marginBottom: 5,
              }}
            >
              {content?.especie}
            </Text>

            <TabsDemo catalogo={content} />
            <Button
              onPress={() => setModalVisible(true)}
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

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.5)",
                  }}
                >
                  <TouchableWithoutFeedback>
                    <View
                      style={{
                        backgroundColor: "white",
                        padding: 20,
                        borderRadius: 10,
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: "black", fontSize: 16 }}>
                        Sucesso
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontSize: 16,
                          marginBottom: 10,
                        }}
                      >
                        Você capturou o Ser vivo com sucesso!
                      </Text>

                      <TouchableHighlight
                        onPress={() => {
                          setModalVisible(!modalVisible);
                        }}
                        style={{
                          backgroundColor: "#329F60",
                          padding: 10,
                          marginTop: 30,
                          borderRadius: 10,
                          position: "absolute",
                          bottom: -20,
                          width: "30%",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ color: "white", fontSize: 18 }}>
                          Fechar
                        </Text>
                      </TouchableHighlight>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({});
