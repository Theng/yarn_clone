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
		title: "The House with a Clock in Its Walls",
		subTitle: "A young orphan named Lewis Barnavelt aids.",
		episode: "Episode 1 of 10",
		thumbnail: "https://image.ibb.co/m9BmHU/webp_net_resizeimage_3_Ivb_S.jpg"
	},
	{
		id: 1,
		title: "Fahrenheit 11/9",
		subTitle: "Filmmaker Michael Moore examines",
		episode: "Episode 1 of 10",
		thumbnail: "https://image.ibb.co/eq8Bj9/webp_net_resizeimage_i_Gs8_B.jpg"
	},
	{
		id: 1,
		title: "Life Itself",
		subTitle: "As a young New York couple goes from college romance to marriage and the birth of their first child, the unexpected twists of their journey create reverberations that echo over continents and through lifetimes.",
		episode: "Episode 1 of 10",
		thumbnail: "https://image.ibb.co/bJ8oWp/webp_net_resizeimage_m0u08.jpg"
	},
	{
		id: 1,
		title: "Assassination Nation",
		subTitle: "After a malicious data hack exposes the secrets of the perpetually American town of Salem,",
		episode: "Episode 1 of 10",
		thumbnail: "https://image.ibb.co/b4ETWp/webp_net_resizeimage_Tr_B1_Q.jpg"
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
	image: {
		height: height - 1,
		width: width - 3,
		backgroundColor: "#95a5a6"
	},
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
