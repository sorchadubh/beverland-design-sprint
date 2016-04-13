import xhr from "xhr";
import store from "../store";
import keywordMap from "../keyword-map";
import taxonomy from "../taxonomy";

const findTaxonomyEntry = (entries, taxId, found, path = []) => {
	for(let i in entries) {
		const entry = entries[i];
		if(entry.ID === taxId) {
			found.path = path.concat(entry.label);
		}
		findTaxonomyEntry(entry.childConcepts, taxId, found, path.concat(entry.label));
	}
};


const findPath = (taxId) => {
	let f = {path: []};
	findTaxonomyEntry(taxonomy, taxId, f);

	return f.path.reverse();
};


const searchKeyword = (query) => (dispatch) => {
	if(query.length < 2) { return; }
	xhr({url: `https://inpho.cogs.indiana.edu/entity.json?q=${query}`, method: "GET"}, (err, resp, body) => {
		const results = JSON.parse(body).responseData.results.map((r) => {
			const spread = (keywordMap[r.ID] || []).map((taxId) => {
				return {
					label: r.label,
					taxonomyEntry: findPath(taxId),
					url: `https://inpho.cogs.indiana.edu${r.url}`
				};
			});
			if (spread.length === 0) {
				spread.push({label: r.label, url: `https://inpho.cogs.indiana.edu${r.url}`, taxonomyEntry: []});
			}
			return spread;
		}).reduce((a, b) => a.concat(b), [])
		.sort((a, b) => b.taxonomyEntry.length - a.taxonomyEntry.length);

		dispatch({type: "RECEIVE_KEYWORD", results: results });
	});
};

const fetchLetters = () => (dispatch) =>
	xhr({url: `http://${location.hostname}:5001/letters`}, (err, resp, body) => {
		dispatch({type: "RECEIVE_LETTERS", letters: JSON.parse(body)});
	});

const setCurrentLetter = (idx) => (dispatch) => dispatch({type: "SET_CURRENT_LETTER", current: idx});

const login = (username, password) => (dispatch) => {
	xhr({url: `http://${location.hostname}:5001/user`, method: "POST", headers: {"Content-type": "application/json"}, body: JSON.stringify({username: username, password: password})}, (err, resp, body) => {
		const data = JSON.parse(body);
		if(data.notFound) {
			dispatch({type: "LOGIN_FAILURE", name: username});
		} else {
			dispatch({type: "LOGIN_USER", name: data.name, id: data._id});
		}
	});
};

const addKeyword = (suggestion) => (dispatch, getState) => {
	const { letters, current } = getState().letters;
	const { id } = getState().user;

	xhr({url: `http://${location.hostname}:5001/letters/${letters[current]._id}`, method: "PUT", headers: {"Content-type": "application/json"}, body: JSON.stringify({
		keyword: suggestion,
		userId: id
	})}, () => {
		dispatch(fetchLetters());
	});
};

const saveUserKeyword = (suggestion) => (dispatch, getState) => {
	const { letters, current } = getState().letters;
	const { id } = getState().user;
	xhr({url: `http://${location.hostname}:5001/keywords`, method: "POST", headers: {"Content-type": "application/json"}, body: JSON.stringify({
		keyword: suggestion,
		userId: id,
		letterId: letters[current]._id
	})}, () => {
		dispatch(fetchLetters());
	});
};

export default {
	onSearch: (query) => store.dispatch(searchKeyword(query)),
	fetchLetters: () => store.dispatch(fetchLetters()),
	onSelect: (idx) => store.dispatch(setCurrentLetter(idx)),
	onLogin: (username, password) => store.dispatch(login(username, password)),
	onSelectKeyword: (suggestion) => store.dispatch(addKeyword(suggestion)),
	onSaveKeyword: (suggestion) => store.dispatch(saveUserKeyword(suggestion))
};