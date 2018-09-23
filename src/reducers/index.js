import { combineReducers } from "redux";
import c from "../constants";

const inProgressState = {
	session:"In Progress",
	list: []
};

export const inProgress = (state = inProgressState, action) => {
	switch (action.type) {
		case c.ADD_READ_STORY:
			return {...state, list: action.payload };
		default:
			return state;
	}
};

export const rootReducer = combineReducers({
	inProgress
});
