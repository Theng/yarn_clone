import React, { Component } from "react";
import {
	StyleSheet,
	View,
	Dimensions,
	Text,
	TouchableWithoutFeedback,
	ScrollView
} from "react-native";
import HeaderImageCarousel from "@components/headerImageCarousel"
import CardSession from "@components/cardSession"
import c from "@src/constants";

import data from "./data.json"
class HomeScreen extends Component {
    
	constructor(props) {
		super(props);
		this.state = {
            
        };
	}

	componentDidMount() {
		
	}

	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<HeaderImageCarousel/>
					<CardSession data={data} navigation={this.props.navigation} />
				</ScrollView>
            </View>
		);
	}
}

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex:1,
		backgroundColor: c.appBackground
	}
});
