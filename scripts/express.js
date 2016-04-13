var app = require("express")();
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/beverland';


app.use(bodyParser.json());

app.use(function (req, res, next) {
	console.log(req.method, req.path);
	res.set("Access-Control-Allow-Origin", "*");
	res.set("Access-Control-Allow-Headers", "content-type");
	res.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");

	next();
});


MongoClient.connect(url, function(err, db) {
	console.log("init: Any error?", err);



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

	app.post("/user", function(req, res) {
		var login = req.body;
		var collection = db.collection("users");
		collection.findOne({name: login.username, password: login.password}, function(err, item) {
			console.log("/user: Any error?", err, item);

			res.send(item || {notFound: true});
		});
	});

	app.get("/letters", function(req, res) {
		var collection = db.collection("letters");
		collection.find({}).toArray(function(err, docs) {
			console.log("/letters: Any error?", err);
			res.send(docs);
		});
	//	var respData = clone(entities[req.params.domain][req.params.id]);
	//	respData["@relations"] = relationsFor(req.params.domain.replace(/^ww/, "").replace(/s$/, ""), req.params.id);
	//	res.send(respData);
	});

	app.listen(5001, function() {
		console.log("express listening on port: 5001");
	});

});