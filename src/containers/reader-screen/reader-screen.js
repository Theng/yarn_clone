import React, { Component } from "react";
import {
	StyleSheet,
	View,
	Dimensions,
	Text,
	TouchableWithoutFeedback
} from "react-native";
import Header from "@components/header"

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
		return (
			<View style={styles.container}>
				<Header />
				<TouchableWithoutFeedback onPress={this.close}>
					<View style={{padding:20}}>
						<Text>Close</Text>
					</View>
				</TouchableWithoutFeedback>
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
