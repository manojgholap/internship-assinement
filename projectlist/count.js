const MongoClient = require('mongodb').MongoClient
let url = 'mongodb://localhost:27017/assinement'

exports.tasks = [
    function countDocumentStartergy(cb) {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
            if (err) throw err;
            dbo = db.db("assinement");
            dbo.collection("projectlists").countDocuments({ department: "startergy" }, (err, result) => {
                if (err) {
                    cb(err);
                }
                else {
                    cb(null, result)
                }
            })
        })
    },
    function countDocumentsFinance(callback) {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
            if (err) throw err;
            dbo = db.db("assinement");
            dbo.collection("projectlists").countDocuments({ department: "finance" }, (err, result) => {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, result)
                }
            })
        })
    },
    function countDocumentsQuality(callback) {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
            if (err) throw err;
            dbo = db.db("assinement");
            dbo.collection("projectlists").countDocuments({ department: "quality" }, (err, result) => {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, result)
                }
            })
        })
    },
    function countDocumentMaintainance(callback) {
        let date = new Date()
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
            if (err) throw err;
            dbo = db.db("assinement");
            dbo.collection("projectlists").countDocuments({ department: "maintainance" }, (err, result) => {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, result)
                }
            })
        })
    },
    function countDocumentsStore(callback) {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
            if (err) throw err;
            dbo = db.db("assinement");
            dbo.collection("projectlists").countDocuments({ department: "store" }, (err, result) => {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, result)
                }
            })
        })
    },
    function countDocumentHr(callback) {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
            if (err) throw err;
            dbo = db.db("assinement");
            dbo.collection("projectlists").countDocuments({ department: "hr" }, (err, result) => {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, result)
                }
            })
        })
    }
];