import React, { Component } from "react";
import {
	StyleSheet,
	View,
	Dimensions,
	Text,
	TouchableWithoutFeedback
} from "react-native";
import Header from "@components/header"
import StoryViewer from "@components/storyViewer/storyViewer"
import c from "@src/constants";

class ReaderScreen extends Component {
    
	constructor(props) {
		super(props);
		this.state = {
            
        };
	}


	componentDidMount() {
		
	}

	close=()=>{
		this.props.navigation.goBack()
	}

	render() {
		let data = this.props.navigation.state.params.item
		return (
			<View style={styles.container}>
				<Header navigation={this.props.navigation} title={data.title} episode={"Episode "+data.story.episode+" of "+data.story.total_episode}/>
				{/* <TouchableWithoutFeedback onPress={this.close}>
					<View style={{padding:20}}>
						<Text>Close</Text>
					</View>
				</TouchableWithoutFeedback> */}
				<StoryViewer navigation={this.props.navigation} item={data}/>
            </View>
		);
	}
}

export default ReaderScreen;

const styles = StyleSheet.create({
	container: {
		flex:1,
		backgroundColor: "white"
	}
});
