let initialState = {
	taxonomy: null
};

const parseResults = (results, current = 0) => {
	let parsed = results
		.filter((r) => r.parent === current)
		.map((cur) => { 
			cur.childConcepts = parseResults(results, cur.ID)
			return cur;
		});

	return parsed;
}

export default function(state=initialState, action) {
	switch (action.type) {
		case "LOAD_TAXONOMY":
			state = {...state, ...{
				taxonomy: parseResults(action.data.responseData.results)
			}};
			break;
	};
	return state;
}

export { parseResults };

