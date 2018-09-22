import React, { Component } from "react";
import {
	Text,
	View,
	TouchableWithoutFeedback,
	Image
} from "react-native";
import FastImage from "react-native-fast-image";

const width = 148;
const height = width * 1.4;

class ArticleCard extends Component {
	render() {
		let thumbnail = "https://image.ibb.co/kbRq99/AXL_trailer_min.jpg";
		let percentage = 5;
		let title = "Haunted Camper";
		let subTitle = "Who's watching me sleep?";
		let episode = "Episode 1 of 10";
		return (
			<TouchableWithoutFeedback>
				<View style={styles.viewFlex}>
					<FastImage
						style={styles.image}
						source={{
							uri: thumbnail,
							priority: FastImage.priority.normal
						}}
						resizeMode={FastImage.resizeMode.contain}
					/>
					<View style={styles.absoluteContainer}>
						<View style={styles.flex}>
							<View style={styles.newContainer}>
								<Image
									style={styles.newImage}
									source={require("../assets/images/new.png")}
								/>
							</View>
						</View>
						<View style={styles.bottomAbsoluteContainer}>
							<Text style={styles.title}>{title}</Text>
							<View style={styles.episodeContainer}>
								<Text style={styles.episode}>{episode}</Text>
							</View>

							<Text numberOfLines={3} style={styles.subTitle}>
								{subTitle}
							</Text>
						</View>
					</View>
					<View style={styles.progressContainer}>
						<View
							style={[
								styles.progress,
								{
									borderBottomRightRadius: percentage != 100 ? 0 : 8,
									width: width * (percentage / 100)
								}
							]}
						/>
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

export default ArticleCard;

const styles = {
	viewFlex: {
		height: height,
		width: width,
		backgroundColor: "gray",
		marginLeft: 6,
		borderRadius: 8
	},
	image: { height: height, width: width, borderRadius: 8 },
	absoluteContainer: {
		height: height,
		width: width,
		position: "absolute",
		justifyContent: "flex-end"
	},
	flex: { flex: 1 },
	newContainer: {
		alignSelf: "flex-end",
		marginTop: 20
	},
	newImage: { width: 55, height: 24 },
	bottomAbsoluteContainer: { padding: 10 },
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
	},
	progressContainer: {
		borderBottomLeftRadius: 8,
		borderBottomRightRadius: 8,
		position: "absolute",
		bottom: 0,
		height: 6,
		width: width,
		backgroundColor: "rgba(52, 73, 94,.1)"
	},
	progress: {
		borderBottomLeftRadius: 8,
		height: 6,
		backgroundColor: "#00F78F"
	}
};
