import http from "http";
import sleep from "sleep";

var MongoClient = require("mongodb").MongoClient;


let sleeping = false;

MongoClient.connect("mongodb://localhost:27017/lcc", function(err, db) {
	db.collection("concepts").drop();

	const doGet = (callback = () => {}, url = "http://id.loc.gov/authorities/classification/B", taxonomyEntry = []) => {
		const host = url.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
		const path = url.replace(/^https?:\/\//, "").replace(host, "");

		http.request({
			host: host,
			path: `${path}.skos.json`,
			method: "GET",
			headers: {
				"User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:45.0) Gecko/20100101 Firefox/45.0"
			}
		}, (resp) => {
			let raw = [];
			resp.on("data", function(chunk) { raw.push(chunk); });
			resp.on("end", function() {
				try {
					callback(JSON.parse(raw.join("")), url, taxonomyEntry);
				} catch(e) {

					console.warn("FAILED TO PARSE JSON FOR URL: " + url);
					doGet(callback, url, taxonomyEntry);
				}
			});
		})
		.on("error", () => {
			console.warn("FAILED TO REACH URL: "+ url);
			doGet(callback, url, taxonomyEntry);
		}).end();
	};

	const digestEntry = (data, url, taxonomyEntry = []) => {
		const classif = data.filter((d) => d["@id"] === url)[0];
		const label = (
			classif["http://www.w3.org/2004/02/skos/core#prefLabel"] ||
			classif["http://www.w3.org/2004/02/skos/core#altLabel"] ||
			classif["http://www.w3.org/2004/02/skos/core#hiddenLabel"]
		)[0]["@value"];
		const narrowerEntries = classif["http://www.w3.org/2004/02/skos/core#narrower"];

		db.collection("concepts").insertOne({
			url: url,
			taxonomyEntry: taxonomyEntry.reverse(),
			label: label
		}, (error, result) => {
			if (err) { console.warn(err); }
			else { console.log(result.ops); }
		});

		for(let i in narrowerEntries) {
			doGet(digestEntry, narrowerEntries[i]["@id"], taxonomyEntry.concat(label));
		}
		if(!sleeping) { sleeping = true; sleep.usleep(1000); sleeping = false; }

	};


	const init = (data) => {
		const entries = data
			.filter((entry) => entry["@type"].indexOf("http://www.w3.org/2004/02/skos/core#Collection") > -1)[0]["http://www.w3.org/2004/02/skos/core#member"]
			.map((entry) => entry["@id"]);

		for (let i in entries) {
			doGet(digestEntry, entries[i]);
		}
	};

	doGet(init);
});