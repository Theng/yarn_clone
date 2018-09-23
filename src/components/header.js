import React, { Component } from "react";
import {
	StyleSheet,
	View,
	Text,
	Dimensions,
	TouchableWithoutFeedback
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
const deviceWidth = Dimensions.get("window").width;
const hitSlopVal = { top: 24, left: 24, bottom: 24, right: 24 };
class Header extends Component {
	constructor(props) {
		super(props);
	}
	popNav() {
		this.props.navigation ? this.props.navigation.goBack() : null;
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={{ flexDirection: "row" }}>
					<TouchableWithoutFeedback
						hitSlop={hitSlopVal}
						onPress={() => this.popNav()}
					>
						<View>
							<Icon
								name="md-arrow-back"
								size={30}
								color="black"
								style={{ fontSize: 24, marginLeft: 24,marginTop:8 }}
							/>
						</View>
					</TouchableWithoutFeedback>
					<View  style={{marginLeft:24}}>
						<Text style={{color:"black"}}>{this.props.title}</Text>
						<Text  style={{fontSize:12,fontWeight:"500",color:"#C7CBD1"}}>{this.props.episode}</Text>
					</View>
				</View>
			</View>
		);
	}
}

export default Header;

const styles = StyleSheet.create({
	container: {
		width: deviceWidth,
		height: 60,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "flex-start",
		shadowOpacity: 0.1,
		shadowColor: "#787878",
		elevation: .5,
	}
});
