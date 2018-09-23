import React from "react";
import {
	StackNavigator
} from "react-navigation";

//Redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "./reducers";
const store = createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
//Redux

// Screen
import HomeScreen from "@containers/home-screen/home-screen"
import ReaderScreen from "@containers/reader-screen/reader-screen"
// Screen

const RootSwitchNavigator = StackNavigator(
	{
		HomeScreen: HomeScreen,
		ReaderScreen: ReaderScreen
	},
	{
		initialRouteName: "HomeScreen",
		mode: "modal",
		headerMode: 'none'
	}
);

const AppWithNavigationState = () => (
	<Provider store={store}>
		<RootSwitchNavigator />
	</Provider>
);
export default AppWithNavigationState;
