import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Header from "@components/header";
import StoryViewer from "@components/storyViewer/storyViewer";

class ReaderScreen extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let data = this.props.navigation.state.params.item;
		return (
			<View style={styles.container}>
				<Header
					navigation={this.props.navigation}
					title={data.title}
					episode={
						"Episode " + data.story.episode + " of " + data.story.total_episode
					}
				/>
				<StoryViewer navigation={this.props.navigation} item={data} />
			</View>
		);
	}
}

export default ReaderScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white"
	}
});
