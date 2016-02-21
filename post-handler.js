module.exports.login = loginHandler;
module.exports.user = userHandler;
module.exports.board = boardHandler; 

// db
var mongo = require('mongodb').MongoClient;
var dbName = 'human-art';
var dbUrl = 'mongodb://human-art.cien.or.kr:27017/' + dbName;

// utils
var assert = require('assert');
var util = require('util');

function loginHandler(req, res) {
    console.log("login handler");
    var id = req.body.id;

    mongo.connect(dbUrl, afterConnect(id, postResponse(res)));
}

function userHandler(req, res) {
    console.log("user handler");

}

function boardHandler(req, res) {
    console.log("board handler");

}

function postResponse(res) {
    return function(userData) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(userData));
    }
}

function afterConnect(id, callback) {
    return function (err, db) {
        assert.equal(null, err);
        console.log("db connected");

        var userCollection = db.collection("users");

        idCheck(userCollection, id, loadUser, newUser, function(userData) {
            callback(userData);
        });
    }
}

function idCheck(collection, id, loadUser, newUser, callback) {
    collection.findOne({ gid: id }, function (err, doc) {
        assert.equal(null, err);
        if (doc == null) {
            callback(newUser(collection, id));
        }
        else {
            callback(loadUser(doc));
        }
    });
}

function newUser(collection, id) {
    console.log("새로운 유저: " + id);
    var userObj = {
        first: true,
        gid: id
    };
    collection.insertOne(userObj, function (err, result) {
        assert.equal(err, null);
    });
    return userObj;
}

function loadUser(user) {
    console.log("기존 유저: " + user.gid);
    user.first = false;
    return user;
}