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
import ArticleCard from "@components/articleCard"

import c from "@src/constants";

class HomeScreen extends Component {
    
	constructor(props) {
		super(props);
		this.state = {
            
        };
	}

	componentDidMount() {
		
	}

	openReaderScreen=()=>{
		this.props.navigation.navigate({
			routeName: "ReaderScreen",
			key: "openReaderScreen"
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<HeaderImageCarousel/>
					<TouchableWithoutFeedback onPress={this.openReaderScreen}>
						<View style={{padding:20}}>
							<Text>Home</Text>
						</View>
					</TouchableWithoutFeedback>
					<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
					<ArticleCard/>
					<ArticleCard/>
					<ArticleCard/>
					</ScrollView>
					
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
