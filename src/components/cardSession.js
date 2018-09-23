import React, { Component } from "react";
import { Text, ScrollView, View } from "react-native";
import ArticleCard from "@components/articleCard";
class CardSession extends Component {
	render() {
		let data = this.props.data;
		return data.list.length > 0 ? (
			<View style={styles.container}>
				<Text style={styles.title}>{data.session}</Text>
				<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
					{data.list.map((item, index) => (
						<ArticleCard key={index} item={item} navigation={this.props.navigation} />
					))}
				</ScrollView>
			</View>
		) : null;
	}
}

export default CardSession;

const styles = {
	container: {
		marginTop: 16
	},
	title: {
		color: "white",
		fontSize: 18,
		fontWeight: "700",
		margin: 16
	}
};
