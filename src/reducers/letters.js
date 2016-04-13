let initialState = {
	letters: [],
	current: -1,
	offset: 0,
	limit: 10
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "RECEIVE_LETTERS":
			state = {...state, ...{
				letters: action.letters,
				current: 0
			}};
			break;
	};
	return state;
};

