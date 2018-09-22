import { combineReducers } from "redux";
import c from "../constants";

const userState = {
	user_list: [],
	fetching: false,
	fetchError: false
};

export const user = (state = userState, action) => {
	switch (action.type) {
		case c.FETCHING_SAMPLE_USER:
			return { ...state, fetching: true };
		case c.FETCHING_SAMPLE_USER_SUCCESS:
			return {
				...state,
				user_list: action.payload,
				fetching: false,
				fetchError: false
			};
		case c.FETCHING_SAMPLE_USER_ERROR:
			return { ...state, fetchError: action.payload, fetching: false };
		default:
			return state;
	}
};



export const rootReducer = combineReducers({
	user
});
