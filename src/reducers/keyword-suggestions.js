let initialState = {
	suggestions: []
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "RECEIVE_KEYWORD":
			state = {...state, ...{
				suggestions: action.results
			}};
			break;
	};
	return state;
};

