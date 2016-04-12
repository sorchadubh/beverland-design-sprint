import fs from "fs";

let keywords = {};

const keywordNames = [
	"related",
	"instances",
	"hyponyms",
	"related_thinkers",
	"occurrences",
	"links",
	"classes",
	"nodes"
];

const addKeywords = (entries) => {
	for(let i in entries) {
		const entry = entries[i];
		let kwList = [];
		for(let idx in keywordNames) {
			kwList = kwList.concat(entry.keywords[keywordNames[idx]]);
		}
		for(let idx in kwList) {
			if (!keywords[kwList[idx]]) {
				keywords[kwList[idx]] = [];
			}
			if (keywords[kwList[idx]].indexOf(entry.ID) < 0) {
				keywords[kwList[idx]].push(entry.ID)
			}
		}
		addKeywords(entry.childConcepts);
	}
};

fs.readFile("big.json", (err, data) => {
	addKeywords(JSON.parse(data));
	console.log(JSON.stringify(keywords));
});