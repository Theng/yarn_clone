import React, { Component } from "react";
import { Text, View, TouchableWithoutFeedback, Image, Platform , AsyncStorage} from "react-native";
import FastImage from "react-native-fast-image";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addReadStory } from "@actions"

const width = 148;
const height = width * 1.4;

class ArticleCard extends Component {

	openArticle=()=>{
		canAdd = true
		useStory = null
		this.props.inProgress.list.map((item,index)=>{
			if(this.props.item.id==item.id){
				canAdd = false
				useStory = item
			}
		})
		if(canAdd){
			this.props.addReadStory([...this.props.inProgress.list,this.props.item])
			AsyncStorage.setItem("inprogress_list",JSON.stringify([...this.props.inProgress.list,this.props.item]))
		}
		this.props.navigation.navigate({
			routeName: "ReaderScreen",
			key: "openReaderScreen",
			params:{
				item:canAdd?this.props.item:useStory
			}
		});
	}

	render() {
		let {
			thumbnail,
			last_read,
			title,
			subTitle,
			episode,
			isNew,
			story
		} = this.props.item;
		return (
			<TouchableWithoutFeedback onPress={this.openArticle}>
				<View style={styles.viewFlex}>
					<FastImage
						style={styles.image}
						source={{
							uri: thumbnail,
							priority: FastImage.priority.normal
						}}
						resizeMode={FastImage.resizeMode.contain}
					/>
					<View style={styles.absoluteContainer}>
						<View style={styles.flex}>
							{isNew ? (
								<View style={styles.newContainer}>
									<Image
										style={styles.newImage}
										source={require("../assets/images/new.png")}
									/>
								</View>
							) : null}
						</View>
						<View style={styles.bottomAbsoluteContainer}>
							<Text style={styles.title}>{title}</Text>
							<View style={styles.episodeContainer}>
								<Text style={styles.episode}>{"Episode "+story.episode+" of "+story.total_episode}</Text>
							</View>

							<Text numberOfLines={3} style={styles.subTitle}>
								{subTitle}
							</Text>
						</View>
					</View>
					<View style={styles.progressContainer}>
						<View
							style={[
								styles.progress,
								{
									borderBottomRightRadius: last_read != story.messages.length ? 0 : 8,
									width:last_read? (width * ( (last_read/(story.messages.length/100))/100 )):0
								}
							]}
						/>
					</View>
				</View>
			</TouchableWithoutFeedback>
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
)(ArticleCard)

const styles = {
	viewFlex: {
		height: height,
		width: width,
		backgroundColor: "gray",
		marginLeft: 8,
		borderRadius: 8
	},
	image: { height: height, width: width, borderRadius: 8 },
	absoluteContainer: {
		height: height,
		width: width,
		position: "absolute",
		justifyContent: "flex-end"
	},
	flex: { flex: 1 },
	newContainer: {
		alignSelf: "flex-end",
		marginTop: 20
	},
	newImage: { width: 55, height: 24 },
	bottomAbsoluteContainer: { padding: 10 },
	title: { color: "white", fontSize: 20, fontWeight: "800" },
	episodeContainer: {
		alignSelf: "flex-start",
		backgroundColor: "white",
		borderRadius: 6,
		marginTop: 4
	},
	episode: {
		fontSize: 12,
		fontWeight: "600",
		alignSelf: "stretch",
		color: "black",
		paddingLeft: 6,
		paddingRight: 6,
		paddingTop: 4,
		paddingBottom: 4
	},
	subTitle: {
		color: "white",
		fontSize: 16,
		fontWeight: Platform.OS=="ios"?"600": "400",
		marginTop: 4
	},
	progressContainer: {
		borderBottomLeftRadius: 8,
		borderBottomRightRadius: 8,
		position: "absolute",
		bottom: 0,
		height: 6,
		width: width,
		backgroundColor: "rgba(52, 73, 94,.1)"
	},
	progress: {
		borderBottomLeftRadius: 8,
		height: 6,
		backgroundColor: "#00F78F"
	}
};
