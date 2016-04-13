let initialState = {
	username: "researcher1",
	id: "570e1803e005626069a2af0b"
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
		case "LOGOUT":
			state = {...state, ...{username: null, id: null}};
			break;
	}
	return state;
}