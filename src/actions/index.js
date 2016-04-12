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
}


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
				spread.push({label: r.label, url: `https://inpho.cogs.indiana.edu${r.url}`, taxonomyEntry: []})
			}
			return spread;
		}).reduce((a, b) => a.concat(b), [])
		.sort((a, b) => b.taxonomyEntry.length - a.taxonomyEntry.length);

		console.log(results);

		dispatch({type: "RECEIVE_KEYWORD", results: results  })
	});
};

export default {
	onSearch: (query) => store.dispatch(searchKeyword(query))
};