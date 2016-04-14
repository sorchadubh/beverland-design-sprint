let initialState = {
	info: null
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "RECEIVE_KEYWORD_INFO":
			state = {...state, ...{
				info: action.data
			}};
			break;
	}
	return state;
}

