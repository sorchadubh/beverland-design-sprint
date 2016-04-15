let initialState = {
	suggestions: [],
	userSuggestions: [],
	moreSuggestions: [],
	pending: false
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "RECEIVE_KEYWORD":
			state = {...state, ...{
				suggestions: action.results,
				pending: false
			}};
			break;
		case "RECEIVE_MORE_KEYWORD":
			state = {...state, ...{
				moreSuggestions: action.results,
				pending: false
			}};
			break;

		case "RECEIVE_USER_KEYWORD":
			state = {...state, ...{
				userSuggestions: action.results
			}};
			break;
		case "REMOTE_KEYWORD_PENDING":
			state = {...state, ...{
				suggestions: [],
				userSuggestions: [],
				moreSuggestions: [],
				pending: true
			}};
	}
	return state;
}

