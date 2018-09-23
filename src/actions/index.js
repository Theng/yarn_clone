import c from "../constants";

export const addReadStory = story => {
	return {
		type: c.ADD_READ_STORY,
		payload: story
	};
};
