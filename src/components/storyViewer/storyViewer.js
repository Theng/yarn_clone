import React, { Component } from "react";
import {
	Text,
	View,
	Dimensions,
	FlatList,
	TouchableWithoutFeedback,
	ScrollView,
	AsyncStorage,
	TouchableHighlight
} from "react-native";
import FastImage from "react-native-fast-image";
import story from "./story.json";
import * as Animatable from "react-native-animatable";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addReadStory } from "@actions";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

class BubbleMessage extends Component {
	messages = [];
	order = 0;
	activeName = null;
	renderLeft = null;
	textHeight = 0;
	id = null;
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
			showStory: tmpShowStory
		};
		this.id = this.props.item.id;
		this.messages = this.props.item.story.messages;
		// this.order = this.props.item.current_order
		// 	? this.props.item.current_order+1
		// 	: 0;
		if(this.props.item.current_order!=null){
			this.order=this.props.item.current_order+1
		}
	}

	componentDidMount() {
		setTimeout(() => {
			this.refs.scrollView.scrollToEnd({ animated: true });
		}, 100);
	}

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

	rightBubble = (item, noName) => {
		return (
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
		);
	};

	leftBubble = (item, noName) => {
		return (
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
		);
	};

	pressAction = () => {
		if (this.order < this.messages.length) {
			// console.log("this.order: ",this.order)
			// console.log("this.messages[this.order]: ",this.messages[this.order])
			this.addPercentage(this.id, this.order);
			var showStory = this.state.showStory;
			this.setState({ showStory: [...showStory, this.messages[this.order]] });
			this.order = this.order + 1;
		}
	};

	rowItem = ({ item, index }) => {
		var content = null;
		var noName = false;
		if (index) {
			let previousName = this.state.showStory[index-1].name
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
		}, 100);
		return content;
	};

	flatListFooter = () => {
		return (
			<View
				style={{
					height: 200,
					width: deviceWidth
				}}
			/>
		);
	};

	render() {
		return (
			<ScrollView
				style={{ flex: 1, backgroundColor: "white" }}
				ref="scrollView"
				showsVerticalScrollIndicator={false}
			>
				<TouchableHighlight
					style={{ flex:1 }}
					activeOpacity={1}
					onPress={this.pressAction}
					underlayColor="rgba(0, 0, 0, 0)"
				>
					<FlatList
						style={{ width: deviceWidth,minHeight:deviceHeight-100 }}
						ref="flatList"
						data={this.state.showStory}
						keyExtractor={(item, index) => index.toString()}
						renderItem={this.rowItem}
						ListFooterComponent={this.flatListFooter}
					/>
				</TouchableHighlight>
			</ScrollView>
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
	}
};
