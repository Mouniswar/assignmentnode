const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";

var _db;

module.exports = {

    connectToServer: function (callback) {
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
            console.log("Connected to MongoDb.....");
            _db = client.db('interviews');
            return callback(err);
        });
    },

    getDb: function () {
        return _db;
    }
};