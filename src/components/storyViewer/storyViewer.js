import React, { Component } from "react";
import {
	Text,
	View,
	Dimensions,
	FlatList,
	ScrollView,
	AsyncStorage,
	TouchableHighlight,
	TouchableWithoutFeedback
} from "react-native";
import FastImage from "react-native-fast-image";
import * as Animatable from "react-native-animatable";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addReadStory } from "@actions";
import { DotIndicator } from "react-native-indicators";
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

class BubbleMessage extends Component {
	messages = [];
	order = 0;
	activeName = null;
	renderLeft = null;
	textHeight = 0;
	id = null;
	isTyping = false;
	constructor(props) {
		super(props);
		var tmpShowStory = [];
		if (this.props.item.current_order != null) {
			this.props.item.story.messages.map((item, index) => {
				if (this.props.item.current_order >= item.order) {
					tmpShowStory.push(item);
				}
			});
		}
		this.state = {
			showStory: tmpShowStory,
			showImage: false,
			currentImage: null
		};
		this.id = this.props.item.id;
		this.messages = this.props.item.story.messages;
		if (this.props.item.current_order != null) {
			this.order = this.props.item.current_order + 1;
		}
	}

	componentDidMount() {
		setTimeout(() => {
			this.refs.scrollView.scrollToEnd({ animated: false });
		}, 100);
	}

	pressAction = () => {
		if (this.order < this.messages.length && !this.isTyping) {
			this.addPercentage(this.id, this.order);
			var showStory = this.state.showStory;

			let thisMessage = this.messages[this.order];
			if (thisMessage.is_typing) {
				this.isTyping = true;
				this.setState({
					showStory: [...showStory, { ...thisMessage, text: "##..." }]
				});
				setTimeout(() => {
					this.setState({ showStory: [...showStory, thisMessage] });
					this.isTyping = false;
				}, 3000);
			} else {
				this.setState({ showStory: [...showStory, thisMessage] });
			}
			this.order = this.order + 1;
		}
	};

	rowItem = ({ item, index }) => {
		var content = null;
		var noName = false;
		if (index) {
			let previousName = this.state.showStory[index - 1].name;
			if (previousName == item.name) {
				noName = true;
			}
		}
		!this.renderLeft ? (this.renderLeft = item.name) : null;
		if (item.name == this.renderLeft) {
			content = (
				<Animatable.View animation="fadeIn" duration={300}>
					<Animatable.View animation="slideInLeft" duration={300}>
						{this.leftBubble(item, noName)}
					</Animatable.View>
				</Animatable.View>
			);
		} else {
			content = (
				<Animatable.View animation="fadeIn" duration={300}>
					<Animatable.View animation="slideInRight" duration={300}>
						{this.rightBubble(item, noName)}
					</Animatable.View>
				</Animatable.View>
			);
		}
		setTimeout(() => {
			this.refs.scrollView.scrollToEnd({ animated: true });
		}, 300);
		return content;
	};

	addPercentage(id, order) {
		let lastRead = order + 1;
		let tmpInprogress = [];
		this.props.inProgress.list.map((item, index) => {
			if (item.id == id) {
				tmpInprogress.push({ ...item, current_order: order, last_read: lastRead });
			} else {
				tmpInprogress.push(item);
			}
		});
		this.props.addReadStory(tmpInprogress);
		AsyncStorage.setItem("inprogress_list", JSON.stringify(tmpInprogress));
	}

	openImage(image) {
		this.setState({ currentImage: image, showImage: true });
	}

	imageViewer() {
		return (
			<TouchableWithoutFeedback
				onPress={() => this.setState({ showImage: false })}
			>
				<Animatable.View
					animation="fadeInUp"
					duration={300}
					style={styles.imageViewerContainer}
				>
					<FastImage
						style={styles.imageViewer}
						source={{ uri: this.state.currentImage }}
						resizeMode={FastImage.resizeMode.stretch}
					/>
				</Animatable.View>
			</TouchableWithoutFeedback>
		);
	}

	rightBubble = (item, noName) => {
		return (
			<View style={styles.rightBubbleContainer}>
				{!noName ? <Text style={styles.nameStyle}>{item.name}</Text> : null}
				{item.text ? (
					<View style={styles.rightBubbleMessageContainer}>
						{item.text == "##..." ? (
							<View style={styles.typingContainer}>
								<DotIndicator count={4} size={5} color="white" />
							</View>
						) : (
							<Text style={styles.rightBubbleMessageText}>{item.text}</Text>
						)}
					</View>
				) : null}
				{item.image ? (
					<TouchableWithoutFeedback onPress={() => this.openImage(item.image)}>
						<View>
							<FastImage
								style={styles.rightBubbleImage}
								source={{uri:"https://image.ibb.co/bOdunU/message_img1.jpg"}}
								resizeMode={FastImage.resizeMode.stretch}
							/>
							<View style={styles.rightBubbleAbsoluteTextContainer}>
								<Text style={styles.absuluteText}>Tap to view image</Text>
							</View>
						</View>
					</TouchableWithoutFeedback>
				) : null}
			</View>
		);
	};

	leftBubble = (item, noName) => {
		return (
			<View style={styles.leftBubbleContainer}>
				{!noName ? <Text style={styles.nameStyle}>{item.name}</Text> : null}
				{item.text ? (
					<View style={styles.leftBubbleTypingContainer}>
						{item.text == "##..." ? (
							<View style={styles.typingContainer}>
								<DotIndicator count={4} size={5} color="black" />
							</View>
						) : (
							<Text style={styles.leftBubbleMessageText}>{item.text}</Text>
						)}
					</View>
				) : null}
				{item.image ? (
					<TouchableWithoutFeedback onPress={() => this.openImage(item.image)}>
						<View>
							<FastImage
								style={styles.leftBubbleImage}
								source={{uri:"https://image.ibb.co/bOdunU/message_img1.jpg"}}
								resizeMode={FastImage.resizeMode.stretch}
							/>
							<View style={styles.leftBubbleAbsoluteTextContainer}>
								<Text style={styles.absuluteText}>Tap to view image</Text>
							</View>
						</View>
					</TouchableWithoutFeedback>
				) : null}
			</View>
		);
	};

	flatListFooter = () => {
		return <View style={styles.flatListFooter} />;
	};

	render() {
		return (
			<View style={styles.flex}>
				<ScrollView
					style={styles.scrollViewStyle}
					ref="scrollView"
					showsVerticalScrollIndicator={false}
				>
					<TouchableHighlight
						style={styles.flex}
						activeOpacity={1}
						onPress={this.pressAction}
						underlayColor="rgba(0, 0, 0, 0)"
					>
						<FlatList
							style={styles.flatListStyle}
							ref="flatList"
							data={this.state.showStory}
							keyExtractor={(item, index) => index.toString()}
							renderItem={this.rowItem}
							ListFooterComponent={this.flatListFooter}
						/>
					</TouchableHighlight>
				</ScrollView>
				{this.state.showImage ? this.imageViewer() : null}
			</View>
		);
	}
}

const mapStateToProps = state => {
	return {
		inProgress: state.inProgress
	};
};

function matchDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			addReadStory
		},
		dispatch
	);
}
export default connect(
	mapStateToProps,
	matchDispatchToProps
)(BubbleMessage);

const styles = {
	container: {
		flex: 1,
		backgroundColor: "white"
	},
	rightBubbleContainer: {
		width: deviceWidth - 32,
		marginRight: 16,
		marginLeft: 16,
		marginTop: 12,
		alignItems: "flex-end"
	},
	nameStyle: { marginRight: 16, color: "#4B5968", paddingBottom: 6 },
	rightBubbleMessageContainer: {
		backgroundColor: "#0088F0",
		padding: 12,
		borderBottomLeftRadius: 24,
		borderBottomRightRadius: 4,
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24
	},
	typingContainer: { width: 40, height: 16 },
	rightBubbleMessageText: {
		fontSize: 16,
		paddingLeft: 8,
		paddingRight: 8,
		color: "white"
	},
	rightBubbleImage: {
		width: deviceWidth / 2,
		height: (deviceWidth / 2) * 1.4,
		borderBottomLeftRadius: 24,
		borderBottomRightRadius: 4,
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		backgroundColor: "#0088F0"
	},
	rightBubbleAbsoluteTextContainer: {
		width: deviceWidth / 2,
		height: (deviceWidth / 2) * 1.4,
		position: "absolute",
		justifyContent: "center",
		alignItems: "center"
	},
	absuluteText: { color: "white", fontWeight: "bold", fontSize: 14 },
	leftBubbleContainer: {
		width: deviceWidth - 32,
		marginRight: 16,
		marginLeft: 16,
		marginTop: 12,
		alignItems: "flex-start"
	},
	leftBubbleTypingContainer: {
		backgroundColor: "#EBEEF3",
		padding: 12,
		borderBottomLeftRadius: 4,
		borderBottomRightRadius: 24,
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24
	},
	leftBubbleMessageText: {
		fontSize: 16,
		paddingLeft: 8,
		paddingRight: 8,
		color: "black"
	},
	leftBubbleImage: {
		width: deviceWidth / 2,
		height: (deviceWidth / 2) * 1.4,
		borderBottomLeftRadius: 4,
		borderBottomRightRadius: 24,
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		backgroundColor: "#EBEEF3"
	},
	leftBubbleAbsoluteTextContainer: {
		width: deviceWidth / 2,
		height: (deviceWidth / 2) * 1.4,
		position: "absolute",
		justifyContent: "center",
		alignItems: "center"
	},
	imageViewerContainer: {
		width: deviceWidth,
		height: deviceHeight - 60,
		position: "absolute",
		backgroundColor: "rgba(0, 0, 0,.9)",
		justifyContent: "center",
		alignItems: "center"
	},
	imageViewer: {
		width: deviceWidth - 64,
		height: (deviceWidth - 64) * 1.4,
		borderBottomLeftRadius: 24,
		borderBottomRightRadius: 24,
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24
	},
	flatListFooter: {
		height: 200,
		width: deviceWidth
	},
	flex: { flex: 1 },
	scrollViewStyle: { flex: 1, backgroundColor: "white" },
	flatListStyle: { width: deviceWidth, minHeight: deviceHeight - 60 }
};
