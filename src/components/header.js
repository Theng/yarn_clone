import React, { Component } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;
class Header extends Component {
	constructor(props) {
		super(props);
	}
	popNav() {
		this.props.navigation?this.props.navigation.goBack():null
	}

	shareLink() {
		alert("Share a link.");
	}

	render() {
		return (
			<View style={styles.container}>
                <Text style={{color:"black",fontSize:16}}>Header</Text>
            </View>
		);
	}
}

export default Header


const styles = StyleSheet.create({
	container: {
		backgroundColor:"gray",height:100,width:deviceWidth
	}
});
