import React, { Component } from "react";
import { Text, View, Dimensions, TouchableWithoutFeedback } from "react-native";
import FastImage from "react-native-fast-image";
import Carousel from "react-native-snap-carousel";

const deviceWidth = Dimensions.get("window").width;
const originalHeight = 277;
const originalWidth = 360;
const width = deviceWidth * 0.7;
const height = (originalHeight * width) / originalWidth;

const sliderData = [
	{
		id: 1,
		title: "Haunted Camper",
		subTitle: "Who's watching me sleep?",
		episode: "Episode 1 of 10",
		thumbnail:
			"https://image.ibb.co/ccRbz9/Screen_Shot_2018_09_22_at_3_04_49_PM.png"
	},
	{
		id: 1,
		title: "Haunted Camper",
		subTitle: "Who's watching me sleep? ",
		episode: "Episode 1 of 10",
		thumbnail:
			"https://image.ibb.co/ccRbz9/Screen_Shot_2018_09_22_at_3_04_49_PM.png"
	},
	{
		id: 1,
		title: "Haunted Camper",
		subTitle: "Who's watching me sleep? ",
		episode: "Episode 1 of 10",
		thumbnail:
			"https://image.ibb.co/ccRbz9/Screen_Shot_2018_09_22_at_3_04_49_PM.png"
	},
	{
		id: 1,
		title: "Haunted Camper",
		subTitle: "Who's watching me sleep? ",
		episode: "Episode 1 of 10",
		thumbnail:
			"https://image.ibb.co/ccRbz9/Screen_Shot_2018_09_22_at_3_04_49_PM.png"
	}
];

class HeaderImageCarousel extends Component {
	renderItem({ item, index }) {
		return (
			<TouchableWithoutFeedback>
				<View style={styles.viewFlex}>
					<FastImage
						style={styles.image}
						source={{
							uri: item.thumbnail,
							priority: FastImage.priority.normal
						}}
						resizeMode={FastImage.resizeMode.contain}
					/>
					<View style={styles.absoluteContainer}>
						<View style={styles.padding}>
							<Text style={styles.title}>{item.title}</Text>
							<View style={styles.episodeContainer}>
								<Text style={styles.episode}>{item.episode}</Text>
							</View>
							<Text numberOfLines={3} style={styles.subTitle}>
								{item.subTitle}
							</Text>
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	}

	render() {
		return (
			<View>
				<View>
					<Carousel
						layout={"default"}
						ref={c => {
							this._carousel = c;
						}}
						data={sliderData}
						renderItem={item => this.renderItem(item)}
						sliderWidth={deviceWidth}
						itemWidth={width}
						autoplay={true}
						autoplayDelay={500}
						autoplayInterval={3000}
						loop={true}
						inactiveSlideScale={1}
						inactiveSlideOpacity={1}
					/>
				</View>
			</View>
		);
	}
}

export default HeaderImageCarousel;

const styles = {
	viewFlex: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center"
	},
	image: { height: height - 1, width: width - 3 },
	absoluteContainer: {
		height: height - 1,
		width: width - 3,
		position: "absolute",
		justifyContent: "flex-end"
	},
	padding: { padding: 16 },
	title: { color: "white", fontSize: 20, fontWeight: "800" },
	episodeContainer: {
		alignSelf: "flex-start",
		backgroundColor: "white",
		borderRadius: 6,
		marginTop: 4
	},
	episode: {
		fontSize: 12,
		fontWeight: "600",
		alignSelf: "stretch",
		color: "black",
		paddingLeft: 6,
		paddingRight: 6,
		paddingTop: 4,
		paddingBottom: 4
	},
	subTitle: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
		marginTop: 4
	}
};
