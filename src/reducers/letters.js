let initialState = {
	letters: [],
	current: -1
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "RECEIVE_LETTERS":
			state = {...state, ...{
				letters: action.letters,
				current: state.current < 0 ? 0 : state.current
			}};
			break;
		case "SET_CURRENT_LETTER":
			state = {...state, ...{current: action.current}};
			break;
	}
	return state;
}

