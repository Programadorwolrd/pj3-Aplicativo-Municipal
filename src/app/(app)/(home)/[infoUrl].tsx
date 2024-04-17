//******************** AINDA NÃO TERMINEI **************************
import { View, Text, FlatList, StyleSheet, Dimensions, LogBox, Image } from 'react-native';
import React, {useEffect, useRef, useState} from 'react'

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
  const carouselData = [
    {
      id: "01",
      image: require("../../../assets/tucano.png"),
      name: "Tucano",
      age: "+20 anos de idade",
      scientificName: "balfdiuhgfuis",
      detalhes: "Tucano é uma ave pertencente à família Ramphastidae, que engloba animais com bico longo, colorido, cortante e leve. Esses animais ocorrem apenas no Neotrópico, distribuindo-se do México à Argentina.",
      audio: "",
      map: "",
	  tabsMenu: "bghdhnfg",
	  stars: "5",
    },
    {
      id: "02",
      image: require("../../../assets/tucano.png")
	  
    },
    {
      id: "03",
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
				<View>
					 <Text 
					 style={{ fontSize: "18"}}>
					{item.age}
					</Text>
				</View>
				<View>
					 <Text 
					 style={{ fontSize: "18"}}>
					{item.name}
					</Text>
				</View>
				<View>
					 <Text 
					 style={{fontSize: "18"}}>
					{item.scientificName}
					</Text>
				</View>
				<View>
					 <Text 
					 style={{fontSize: "18"}}>
					{item.stars}
					</Text>
				</View>
				<View>
					 <Text 
					 style={{fontSize: "18"}}>
					{item.tabsMenu}
					</Text>
				</View>
			</View>
		);
	};

	// Handle Scroll
const handleScroll = (event) => {
	// Get the scroll position
	const scrollPosition = event.nativeEvent.contentOffset.x;
	console.log({ scrollPosition });
	// Get the index of current active item
	const index = Math.round(scrollPosition / screenWidth);
	console.log({ index });
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
							marginVertical: -50,
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
							marginVertical: -50,
						}}
					></View>
				);
			}
		});
	};

	return (
		<View>
			<FlatList
				data={carouselData}
				ref={flatlistRef}
				getItemLayout={getItemLayout}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				horizontal={true}
				pagingEnabled={true}
				onScroll={handleScroll}
			/>

			<View
				style={{
					flexDirection: "row",
					justifyContent: "center",
					marginTop: 0,
				}}
			>
				{renderDotIndicators()}
			</View>
		</View>
	);
};

export default InfoUrl;

const styles = StyleSheet.create({});