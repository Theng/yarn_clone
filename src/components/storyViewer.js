import React, { Component } from "react";
import { Text, View, TouchableWithoutFeedback, Image, Platform } from "react-native";
import FastImage from "react-native-fast-image";

class StoryViewer extends Component {


	render() {
		return (
			<View style={styles.container}>
                <Text>Story</Text>
            </View>
		);
	}
}

export default StoryViewer;

const styles = {
    container:{
        flex:1,
        backgroundColor:"white"
    }
};
