import {parseResults} from "./src/reducers/taxonomy";
import fs from "fs";
import request from "request";

const checkIntegrity = (entries, indent = "") => {
	for(let i in entries) {
		const entry = entries[i];
		console.log(indent + entry.children);
		console.log(indent + (entry.childConcepts || []).map((c) => c.ID));
		console.log(indent + "===");
		checkIntegrity(entry.childConcepts, indent + " ");
	}
};

let pending = 0;

const addKeywordIds = (entries) => {
	for(let i in entries) {
		const entry = entries[i];
		pending++;
		request(`https://inpho.cogs.indiana.edu/taxonomy/${entry.ID}.json`, (err, resp, body) => {
			try {
				const keywordData = JSON.parse(body).responseData.result;
				entry.keywords = keywordData;
			} catch (e) {
				console.warn(e);
			}
			pending--;
		});
		addKeywordIds(entry.childConcepts);
	}
};

const waitFor = (parsed) => {
	console.warn("PENDING REQUESTS: " + pending);
	if(pending === 0) { console.log(JSON.stringify(parsed, null, 2)); }
	else { setTimeout(() => waitFor(parsed), 50) }
}

fs.readFile("sample.json", (err, data) => {
	const parsed = parseResults(JSON.parse(data).responseData.results);

	addKeywordIds(parsed);

	waitFor(parsed);

});