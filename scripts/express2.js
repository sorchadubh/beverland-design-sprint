var app = require("express")();
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

var url = 'mongodb://localhost:27017/lcc';


app.use(bodyParser.json());

app.use(function (req, res, next) {
	console.log(req.method, req.path);
	res.set("Access-Control-Allow-Origin", "*");
	res.set("Access-Control-Allow-Headers", "content-type");
	res.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");

	next();
});


MongoClient.connect(url, function(err, db) {


	app.get("/concepts", function(req, res) {
		var kwColl = db.collection("concepts");
		var q = req.query.q;
		kwColl.find({label: {"$regex": "(^" + q +  "$|^" + q + "\s|\s" + q + "$)", $options: "i"}}).toArray(function(err, keywords) {
			res.send(keywords);
		});
	});

	app.listen(5002, function() {
		console.log("express listening on port: 5002");
	});
});