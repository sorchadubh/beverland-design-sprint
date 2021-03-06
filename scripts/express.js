var app = require("express")();
var bodyParser = require("body-parser");
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectId;

var mongohost = process.env.MONGO_PORT_27017_TCP_ADDR || "localhost";
var url = "mongodb://" + mongohost + ":27017/beverland";


app.use(bodyParser.json());

app.use(function (req, res, next) {
	console.log(req.method, req.path);
	res.set("Access-Control-Allow-Origin", "*");
	res.set("Access-Control-Allow-Headers", "content-type");
	res.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");

	next();
});


MongoClient.connect(url, function(err, db) {



	app.put("/letters/:id", function(req, res) {
		var collection = db.collection("letters");
		var keyword = req.body.keyword;
		collection.findOne({_id: new ObjectId(req.params.id)}, function(err, item) {
			if (keyword._id) {
				var userKeywords = item.userKeywords || [];
				userKeywords.push(keyword._id);
				item.userKeywords = userKeywords;
			} else {
				var keywords = item.keywords || [];
				keywords.push(keyword);
				item.keywords = keywords;
			}
			collection.updateOne({_id: new ObjectId(item._id)}, {$set: item});
			res.end();
		});
	});

	app.post("/user", function(req, res) {
		var login = req.body;
		var collection = db.collection("users");
		collection.findOne({name: login.username, password: login.password}, function(err, item) {

			res.send(item || {notFound: true});
		});
	});

	app.get("/keywords/:id", function(req, res) {
		var kwColl = db.collection("keywords");
		kwColl.findOne({_id: new ObjectId(req.params.id)}, function(err, keyword) {
			var userColl = db.collection("users");
			userColl.findOne({_id: new ObjectId(keyword.userId)}, function(err, user) {
				res.send({
					keyword: keyword,
					username: user.name,
					created: new ObjectId(keyword._id).getTimestamp().toString()
				});
			});
		});
	});

	app.get("/keywords", function(req, res) {
		var query = req.query.query;
		var collection = db.collection("keywords");
		collection.find({label: query}).toArray(function(err, docs) {
			res.send(docs);
		});
	});



	app.post("/keywords", function(req, res) {
		var data = req.body;
		var keywordColl = db.collection("keywords");
		keywordColl.insertOne({
			label: data.keyword.label,
			userId: data.userId,
			parentUrl: data.keyword.parentUrl,
			taxonomyEntry: data.keyword.taxonomyEntry
		}, function(err, result) {
			var letterColl = db.collection("letters");
			letterColl.findOne({_id: new ObjectId(data.letterId)}, function(err, item) {
				var userKeywords = item.userKeywords || [];
				userKeywords.push(result.ops[0]._id);
				item.userKeywords = userKeywords;
				letterColl.updateOne({_id: new ObjectId(item._id)}, {$set: item});
				res.end();
			});
		});
	});

	app.delete("/letters/:id/keywords", function(req, res) {
		var keyword = req.body;
		var collection = db.collection("letters");
		collection.findOne({_id: new ObjectId(req.params.id)}, function(err, item) {
			if (keyword._id) {
				var userKeywords = item.userKeywords || [];
				var idx = userKeywords.map(function(uk) { return uk.toString(); }).indexOf(keyword._id);
				if (idx > -1) { item.userKeywords.splice(idx, 1); }
			} else {
				var keywords = item.keywords || [];
				var idx1 = keywords.map(function(k) { return k.url; }).indexOf(keyword.url);
				if(idx1 > -1) { item.keywords.splice(idx1, 1); }
			}
			collection.updateOne({_id: new ObjectId(item._id)}, {$set: item});
			res.end();
		});
		res.end();
	});

	app.get("/letters/:id/keywords", function(req, res) {
		var collection = db.collection("letters");
		collection.findOne({_id: new ObjectId(req.params.id)}, function(err, item) {
			if(item === null) {
				res.send([]);
			} else {
				var kwColl = db.collection("keywords");
				var objectIds = (item.userKeywords || []).map(function(kwId) {
					return new ObjectId(kwId);
				});
				kwColl.find({_id: {$in: objectIds}}).toArray(function (err, docs) {
					res.send(docs);
				});
			}
		});
	});

	app.get("/letters", function(req, res) {
		var collection = db.collection("letters");
		collection.find({}).sort({"Date": 1}).toArray(function(err, docs) {
			res.send(docs);
		});
	});

	app.listen(5001, function() {
		console.log("express listening on port: 5001");
	});

});