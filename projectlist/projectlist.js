const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017/assinement'
let projectlistschema = require('../projectlist/createproject');
let async = require('async');
let count = require('./count');
let conn = mongoose.createConnection("mongodb://localhost:27017/assinement", { useNewUrlParser: true, useUnifiedTopology: true })
// let conn = require('../projectlist/db')
exports.createProject = (req, res) => {

    const ProjectList = conn.model("projectlists", projectlistschema)
    const doc = new ProjectList({
        pname: req.body.pname,
        reason: req.body.reason,
        type: req.body.type,
        category: req.body.category,
        priority: req.body.priority,
        department: req.body.department,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        location: req.body.location,
    })
    doc.save((err, data) => {
        if (err) {
            resdata = {
                status: false,
                message: "error while creating project",
                err: err
            }
            res.send(resdata);
        }
        else {
            resdata = {
                status: true,
                message: "project added succefully",
                data: data
            }
            res.send(resdata);
        }
    })
}
exports.getCount = (req, res) => {
    const task = [
        function countDocuments(cb) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
                if (err) throw err;
                dbo = db.db("assinement");
                dbo.collection("projectlists").countDocuments({}, (err, result) => {
                    if (err) {
                        cb(err);
                    }
                    else {
                        cb(null, result)
                    }
                })
            })
        },
        function countDocumentsCompleted(callback) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
                if (err) throw err;
                dbo = db.db("assinement");
                dbo.collection("projectlists").countDocuments({ status: "completed" }, (err, result) => {
                    if (err) {
                        callback(err);
                    }
                    else {
                        callback(null, result)
                    }
                })
            })
        },
        function countDocumentsRunning(callback) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
                if (err) throw err;
                dbo = db.db("assinement");
                dbo.collection("projectlists").countDocuments({ status: "running" }, (err, result) => {
                    if (err) {
                        callback(err);
                    }
                    else {
                        callback(null, result)
                    }
                })
            })
        },
        function countDocumentsDelay(callback) {
            let date = new Date()
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
                if (err) throw err;
                dbo = db.db("assinement");
                dbo.collection("projectlists").countDocuments({ endDate: { $gt: date }, status: "running" }, (err, result) => {
                    if (err) {
                        callback(err);
                    }
                    else {
                        callback(null, result)
                    }
                })
            })
        },
        function countDocumentsCanceled(callback) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
                if (err) throw err;
                dbo = db.db("assinement");
                dbo.collection("projectlists").countDocuments({ status: "canceled" }, (err, result) => {
                    if (err) {
                        callback(err);
                    }
                    else {
                        callback(null, result)
                    }
                })
            })
        },
    ];
    async.series(task, (err, result) => {
        if (err) {
            resdata = {
                status: false,
                err: err
            }
            res.send(resdata)
        }
        else {
            resdata = {
                status: true,
                data: result,
                message: 'counted'
            }
        }
        res.send(resdata);
    })
}

exports.projectList = (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("assinement");
        dbo.collection("projectlists").find({}).toArray(function (err, result) {
            if (err) throw err
            if (result.length > 0) {
                resdata = {
                    status: true,
                    message: "data fetched",
                    data: result
                }
                res.send(resdata)
            }
            else {
                resdata = {
                    status: false,
                    message: "no data found",
                }
                res.send(resdata)
            }
            db.close();
        });
    });
}
exports.updateStatus = (req, res) => {

    var data = req.body;
    var id = data.id;
    var sts = data.status;
    console.log(data);
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("assinement");
        dbo.collection("projectlists").updateOne({ pname: id }, {
            $set: {
                status: sts
            }
        }, (function (err, result) {

            if (err) {
                resdata = {
                    status: false,
                    message: "unable to update",
                    data: err
                }
                res.send(resdata)
                console.log(resdata)
            }
            else {
                if (result.result.nModified > 0) {
                    resdata = {
                        status: true,
                        message: "updated",

                    }
                    res.send(resdata)
                }
                else {
                    resdata = {
                        status: false,
                        message: "unable to update",
                        data: err
                    }
                    res.send(resdata)
                }
            }
            db.close();
        })
        )
    })
}


exports.getBarCount = ( res) => {
   
    async.series(count.tasks, (err, result) => {
        if (err) {
            resdata = {
                status: false,
                err: err
            }
            res.send(resdata)
        }
        else {
            resdata = {
                status: true,
                data: result,
                message: 'counted'
            }
        }
        res.send(resdata);
    })
}

exports.getBarCount1 = (req, res) => {
    const task = [
        function countDocumentStartergy(cb) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
                if (err) throw err;
                dbo = db.db("assinement");
                dbo.collection("projectlists").countDocuments({ department: "startergy", status: "completed" }, (err, result) => {
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
                dbo.collection("projectlists").countDocuments({ department: "finance", status: "completed" }, (err, result) => {
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
                dbo.collection("projectlists").countDocuments({ department: "quality", status: "completed" }, (err, result) => {
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
                dbo.collection("projectlists").countDocuments({ department: "maintainance", status: "completed" }, (err, result) => {
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
                dbo.collection("projectlists").countDocuments({ department: "store", status: "completed" }, (err, result) => {
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
                dbo.collection("projectlists").countDocuments({ department: "hr", status: "completed" }, (err, result) => {
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
    async.series(task, (err, result) => {
        if (err) {
            resdata = {
                status: false,
                err: err
            }
            res.send(resdata)
        }
        else {
            resdata = {
                status: true,
                data: result,
                message: 'counted'
            }
        }
        res.send(resdata);
    })
}
