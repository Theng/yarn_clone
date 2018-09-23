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
				<View style={styles.flexRow}>
					<TouchableWithoutFeedback
						hitSlop={hitSlopVal}
						onPress={() => this.popNav()}
					>
						<View>
							<Icon
								name="md-arrow-back"
								size={30}
								color="black"
								style={styles.iconStyle}
							/>
						</View>
					</TouchableWithoutFeedback>
					<View style={styles.infoContainer}>
						<Text style={styles.title}>{this.props.title}</Text>
						<Text style={styles.episode}>{this.props.episode}</Text>
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
		elevation: 0.5
	},
	flexRow: { flexDirection: "row" },
	iconStyle: { fontSize: 24, marginLeft: 24, marginTop: 8 },
	infoContainer: { marginLeft: 24 },
	title: { color: "black" },
	episode: { fontSize: 12, fontWeight: "500", color: "#C7CBD1" }
});
