let initialState = {
	username: null,
	id: null
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "LOGIN_USER":
			state = {...state, ...{
				username: action.name,
				id: action.id
			}};
			break;
		case "LOGIN_FAILURE":
			state = {...state, ...{username: null, id: null}};
			break;
	}
	return state;
}