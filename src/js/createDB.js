"use-strict"

var fs = require("fs");
var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;

MongoClient.connect('mongodb://localhost:27017/TARPAZ', function(err, db) {
    if (err) {
        console.info("Error:" + err);
        return;
    } else {
        db.createCollection("devicetokens", {
            "token": "testing",
            "badges": 0
        }, function(err, collection) {
            if (err) throw err;
            console.info("devicetokens created");

        });

        db.createCollection("rss_feed", {
            "lastModifedDate": 1
        }, function(err, collection) {
            if (err) throw err;
            var rss_feed = db.collection("rss_feed");
            rss_feed.insertOne({
                "lastModifedDate": 0
            }, function(err) {
                if (err) throw err;
            });

            console.info("rss_feed created");
            db.close();
        });
    }
});
