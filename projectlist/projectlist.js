const mongoose = require('mongoose');
let url = 'mongodb://localhost:27017/assinement'
let projectlistschema = require('../projectlist/createproject');
let async = require('async');
let count = require('./count');
let conn = mongoose.createConnection("mongodb://localhost:27017/assinement", { useNewUrlParser: true, useUnifiedTopology: true })
let projectLists=conn.collection('projectlists');

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
                message: "project added successfully",
                data: data
            }
            res.send(resdata);
        }
    })
}
exports.getCount = (req, res) => {

    async.series(count.counttask, (err, result) => {
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

exports.projectList = async (req, res) => {

         projectLists.find({}).toArray(async function (err, result) {
        if (!err) {

            resdata = {
                status: true,
                message: "data fetched",
                data: result
            };
           await res.send(resdata);
        }
        else {
            resdata = {
                status: false,
                message: "no data found",
                err: err
            };
          await  res.send(resdata);
        }
    });
}
exports.updateStatus = (req, res) => {

    var data = req.body;
    var id = data.id;
    var sts = data.status;
    projectLists.updateOne({ pname: id }, {
            $set: {
                status: sts
            }
        }, (async function (err, result) {

            if (err) {
                resdata = {
                    status: false,
                    message: "unable to update",
                    data: err
                }
               await res.send(resdata)
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
                   await res.send(resdata)
                }
            }
        })
        )
}


exports.getBarCount = ( req,res) => {
   
    async.series(count.tasks,async (err, result) => {
        if (err) {
            resdata = {
                status: false,
                err: err
            }
          await  res.send(resdata)
        }
        else {
            resdata = {
                status: true,
                data: result,
                message: 'counted'
            }
        }
      await  res.send(resdata);
    })
}

exports.getBarCount1 = (req, res) => {
    
    async.series(count.task, async(err, result) => {
        if (err) {
            resdata = {
                status: false,
                err: err
            }
            await res.send(resdata)
        }
        else {
            resdata = {
                status: true,
                data: result,
                message: 'counted'
            }
        }
       await res.send(resdata);
    })
}
