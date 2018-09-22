import React, { Component } from "react";
import {
	Text,
	View,
	Dimensions,
	FlatList,
	TouchableWithoutFeedback,
	ScrollView
} from "react-native";
import FastImage from "react-native-fast-image";
import story from "./story.json";
import * as Animatable from "react-native-animatable";
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const hitSlopVal = { top: 20, left: 20, bottom: 20, right: 20 };
class BubbleMessage extends Component {
	messages = story.messages;
	order = 0;
	activeName = null;
	renderLeft = null;
	textHeight = 0
	constructor(props) {
		super(props);
		this.state = {
			showStory: []
		};
	}

	componentDidMount() {}

	rightBubble = (item, noName) => {
		return (
			<Animatable.View animation="fadeIn" duration={300} onLayout={(event) => {
				var { height} = event.nativeEvent.layout;
				this.textHeight = this.textHeight+height
			  }}>
				<Animatable.View animation="slideInRight" duration={300}>
					<TouchableWithoutFeedback hitSlop={hitSlopVal} onPress={this.pressAction}>
						<View
							style={{
								width: deviceWidth - 32,
								marginRight: 16,
								marginLeft: 16,
								marginTop: 12,
								alignItems: "flex-end"
							}}
						>
							{!noName ? (
								<Text style={{ marginRight: 16, color: "#4B5968", paddingBottom: 6 }}>
									{item.name}
								</Text>
							) : null}

							<View
								style={{
									backgroundColor: "#0088F0",
									padding: 12,
									borderBottomLeftRadius: 24,
									borderBottomRightRadius: 4,
									borderTopLeftRadius: 24,
									borderTopRightRadius: 24
								}}
							>
								<Text
									style={{
										fontSize: 16,
										paddingLeft: 8,
										paddingRight: 8,
										color: "white"
									}}
								>
									{item.text}
								</Text>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</Animatable.View>
			</Animatable.View>
		);
	};

	leftBubble = (item, noName) => {
		return (
			<Animatable.View animation="fadeIn" duration={300} onLayout={(event) => {
				var {x, y, width, height} = event.nativeEvent.layout;
				this.textHeight = this.textHeight+height
			  }}>
				<Animatable.View animation="slideInLeft" duration={300}>
					<TouchableWithoutFeedback hitSlop={hitSlopVal} onPress={this.pressAction}>
						<View
							style={{
								width: deviceWidth - 32,
								marginRight: 16,
								marginLeft: 16,
								marginTop: 12,
								alignItems: "flex-start"
							}}
						>
							{!noName ? (
								<Text style={{ marginRight: 16, color: "#4B5968", paddingBottom: 6 }}>
									{item.name}
								</Text>
							) : null}

							<View
								style={{
									backgroundColor: "#EBEEF3",
									padding: 12,
									borderBottomLeftRadius: 4,
									borderBottomRightRadius: 24,
									borderTopLeftRadius: 24,
									borderTopRightRadius: 24
								}}
							>
								<Animatable.Text
									transition="fontSize"
									style={{
										fontSize: 16,
										paddingLeft: 8,
										paddingRight: 8,
										color: "black"
									}}
								>
									{item.text}
								</Animatable.Text>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</Animatable.View>
			</Animatable.View>
		);
	};

	pressAction = () => {
		if (this.order < this.messages.length) {
			var showStory = this.state.showStory;
			this.setState({ showStory: [...showStory, this.messages[this.order]] });
			this.order = this.order + 1;
		}
	};

	rowItem = ({ item, index }) => {
		var content = null;
		var noName = false;
		if (index) {
			let previousName = this.messages[index - 1].name;
			if (previousName == item.name) {
				noName = true;
			}
		}
		!this.renderLeft ? (this.renderLeft = item.name) : null;
		if (item.name == this.renderLeft) {
			content = this.leftBubble(item, noName);
		} else {
			content = this.rightBubble(item, noName);
		}

		setTimeout(() => this.refs.scrollView.scrollToEnd({ animated: true }), 100);
		return content;
	};

	flatListFooter = () => {
		return (
			<TouchableWithoutFeedback hitSlop={hitSlopVal} onPress={this.pressAction}>
				<View style={{ height: this.calculateFooterHeight(), width: deviceWidth }} />
			</TouchableWithoutFeedback>
		);
	};

	calculateFooterHeight(){
		var height = 0
		if(this.textHeight<= (deviceHeight-250)){
			height = (deviceHeight-250)-this.textHeight
		}else{
			height=150
		}
		return height
	}

	render() {
		return (
			<View style={styles.container}>
				<ScrollView ref="scrollView" showsVerticalScrollIndicator={false}>
					<FlatList
						ref="flatList"
						data={this.state.showStory}
						keyExtractor={(item, index) => index.toString()}
						renderItem={this.rowItem}
						ListFooterComponent={this.flatListFooter}
					/>
				</ScrollView>
			</View>
		);
	}
}

export default BubbleMessage;

const styles = {
	container: {
		flex: 1,
		backgroundColor: "white"
	}
};
