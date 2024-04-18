//******************** AINDA NÃO TERMINEI **************************
import { View, Text, FlatList, StyleSheet, Dimensions, LogBox, Image } from 'react-native';
import React, {useEffect, useRef, useState} from 'react'
import { Button, ScrollView } from 'tamagui';
import {TabsDemo} from '../../../components/tabs'
import { AirbnbRating} from 'react-native-ratings';


export default function InfoUrl() {

  const flatlistRef = useRef();
	// Get Dimesnions
	const screenWidth = Dimensions.get("window").width;
	const [activeIndex, setActiveIndex] = useState(0);

	// Auto Scroll

	useEffect(() => {
		let interval = setInterval(() => {
			if (activeIndex === carouselData.length - 1) {
				flatlistRef.current.scrollToIndex({
					index: 0,
					animation: true,
				});
			} else {
				flatlistRef.current.scrollToIndex({
					index: activeIndex + 1,
					animation: true,
				});
			}
		}, 10000);

		return () => clearInterval(interval);
	});

	const getItemLayout = (data, index) => ({
		length: screenWidth,
		offset: screenWidth * index, // for first image - 300 * 0 = 0pixels, 300 * 1 = 300, 300*2 = 600
		index: index,
	});
	//

  const Content = 
	{
	name: "Tucano",
	age: "+20 anos de idade",
	scientificName: "nome cientifico",
	detalhes: "Tucano é uma ave pertencente à família Ramphastidae, que engloba animais com bico longo, colorido, cortante e leve. Esses animais ocorrem apenas no Neotrópico, distribuindo-se do México à Argentina.",
	audio: "audio teste",
	map: "mapa teste",
	tabsMenu: "bghdhnfg",
	stars: 4,
	}
  

  const carouselData = [
		{
		id: "01",
		image: require("../../../assets/tucano.png"),
		},
		{
		id: "02",
		image: require("../../../assets/tucano.png")
		
		},
		{
		id: "03",
		image: require("../../../assets/tucano.png")
		},
		{
		id: "04",
		image: require("../../../assets/tucano.png")
		},
  ];

	//  Display Images // UI
	const renderItem = ({ item, index }) => {
		return (
			<View style={{ backgroundColor: "black"}}>
				<Image
					source={item.image}
					style={{ height: 430, width: screenWidth }}
				/>
			</View>

		);
	};

	// Handle Scroll
const handleScroll = (event) => {
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

			if (activeIndex === index) {
				return (
					<View
						style={{
							backgroundColor: "#329F60",
							height: 10,
							width: 25,
							borderRadius: 5,
							marginHorizontal: 6,
							
						}}
					></View>
				);
			} else {
				return (
					<View
						key={index}
						style={{
							backgroundColor: "#D9D9D9",
							height: 10,
							width: 10,
							borderRadius: 5,
							marginHorizontal: 4,
						

						}}
					></View>
				);
			}
		});
	};

	return (
		<ScrollView >
			<View	style={{position:'relative'}}>
			<FlatList
	
				data={carouselData}
				ref={flatlistRef}
				getItemLayout={getItemLayout}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				horizontal={true}
				pagingEnabled={true}
				onScroll={handleScroll}
				showsHorizontalScrollIndicator={false}
				
			/>
			<View style={{
				flexDirection:"row",
				position:'absolute',
				// right:'auto',
				// left:'auto',
				bottom: 5,
				// paddingLeft: 155,
				marginHorizontal: '40%'
				}}>
				{renderDotIndicators()}
			</View>
			</View>
			<ScrollView style={{ backgroundColor: "black"}}>
				<Text style={{color:"white", fontSize: 18, margin: 15}}>
					{Content.age}
				</Text >
				<Text style={{color:"white", fontSize: 18, marginHorizontal: 20 }}>
					{Content.name}
				</Text>
				<Text style={{color:"#878787", fontSize: 18, marginHorizontal: 20, marginVertical: 5}}>
					{Content.scientificName}
				</Text>
		
				<Text style={{ marginHorizontal: 20, marginVertical: 5}}>
				<AirbnbRating
					count={5}
					reviewSize={0}
					defaultRating={Content.stars}
					selectedColor="#329F60"
					unSelectedColor="#282828"
					showRating={false}
					reviewColor='green'
					size={20}
					isDisabled={true}
				/>
				</Text>
				< TabsDemo
				catalogo={Content}
				/>
				<Button style={{backgroundColor:"white" ,color:"black", fontSize: 18, marginHorizontal: "auto", marginVertical: 20, width: 340}}>
					Capturar Ser vivo 🌿
				</Button>
			</ScrollView>

			<View
				style={{
					flexDirection: "row",
					justifyContent: "center",
					marginTop: 0,
				}}
			>
			
			</View>
		</ScrollView>
	);
};

export default InfoUrl;

const styles = StyleSheet.create({});