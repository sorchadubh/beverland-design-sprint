var app = require("express")();
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/beverland';

MongoClient.connect(url, function(err, db) {
	console.log("init: Any error?", err);


	app.use(bodyParser.json());

	app.use(function (req, res, next) {
		console.log(req.method, req.path);
		res.set("Access-Control-Allow-Origin", "*");
		res.set("Access-Control-Allow-Headers", "content-type");
		next();
	});


	app.put("/letters/:id", function(req, res) {
	//	var record = req.body;
	//	record._id = req.params.domain + "_" + new Date().getTime();
	//
	//	entities[req.params.domain][record._id] = req.body;
	//	res
	//		.set("Location", "/api/v4/domain/" + req.params.domain + "/" + record._id)
	//		.status(201)
	//		.end();
	});

	app.post("/keywords", function(req, res) {

	});

	app.get("/letters", function(req, res) {
		var collection = db.collection("letters");
		collection.find({}).toArray(function(err, docs) {
			console.log("/letters: Any error?", err);
			res.send(docs);
		})
	//	var respData = clone(entities[req.params.domain][req.params.id]);
	//	respData["@relations"] = relationsFor(req.params.domain.replace(/^ww/, "").replace(/s$/, ""), req.params.id);
	//	res.send(respData);
	});

	app.listen(5001, function() {
		console.log("express listening on port: 5001");
	});

});