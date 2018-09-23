import React, { Component } from "react";
import {
	StyleSheet,
	View,
	Dimensions,
	Text,
	TouchableWithoutFeedback,
	ScrollView,
	AsyncStorage
} from "react-native";
import HeaderImageCarousel from "@components/headerImageCarousel"
import CardSession from "@components/cardSession"
import c from "@src/constants";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addReadStory } from "@actions"

import data from "./data.json"
class HomeScreen extends Component {
    
	constructor(props) {
		super(props);
		this.state = {
            
        };
	}

	componentDidMount() {
		AsyncStorage.getItem("inprogress_list").then((data)=>{
			if(data){
				this.props.addReadStory(JSON.parse(data))
			}
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<HeaderImageCarousel/>
					<CardSession data={data} navigation={this.props.navigation} />
					<CardSession data={this.props.inProgress} navigation={this.props.navigation} />
					<TouchableWithoutFeedback onPress={()=> AsyncStorage.clear()}>
						<Text style={{padding:20,color:"white"}}>Clear</Text>
					</TouchableWithoutFeedback>
				</ScrollView>
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
)(HomeScreen)

const styles = StyleSheet.create({
	container: {
		flex:1,
		backgroundColor: c.appBackground
	}
});
