import xhr from "xhr";
import store from "../store";
import keywordMap from "../keyword-map";
import taxonomy from "../taxonomy";



const searchKeyword = (query) => (dispatch) => {
	xhr({url: `https://inpho.cogs.indiana.edu/entity.json?q=${query}`, method: "GET"}, (err, resp, body) => {
		const results = JSON.parse(body).responseData.results.map((r) => {
			const spread = (keywordMap[r.ID] || []).map((t) => {
				return {
					label: r.label,
					taxonomyEntry: t,
					url: `https://inpho.cogs.indiana.edu${r.url}`
				};
			});
			if (spread.length === 0) {
				spread.push({label: r.label, url: `https://inpho.cogs.indiana.edu${r.url}`})
			}
			return spread;
		});

		console.log(results);

		dispatch({type: "RECEIVE_KEYWORD", results: results  })
	});
};

export default {
	onSearch: (query) => store.dispatch(searchKeyword(query))
};