let initialState = {
	letters: [],
	current: 0,
	userKeywords: []
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "RECEIVE_LETTERS":
			state = {...state, ...{
				letters: action.letters,
				userKeywords: []
			}};
			break;
		case "SET_CURRENT_LETTER":
			state = {...state, ...{
				current: state.letters.map((l) => l._id).indexOf(action.currentId),
				userKeywords: action.userKeywords
			}};
			break;
	}
	return state;
}

