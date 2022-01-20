const mongoose = require('mongoose');
let url = 'mongodb://localhost:27017/assinement'
let projectlistschema = require('../projectlist/createproject');
let async = require('async');
let count = require('./count');
const firebaseAdminInstance= require('firebase-admin');
let conn = mongoose.createConnection("mongodb://localhost:27017/assinement", { useNewUrlParser: true, useUnifiedTopology: true })
let projectLists=conn.collection('projectlists');


exports.sendNotification=(req,res)=>{

    const registrationToken = req.body.token;
    projectLists.findOne({firebaseToken:registrationToken},(err,result)=>{
        if(err){
            console.log(err)
        }
        else if(result){
            console.log("you have allready logged in ");    
        }
        else
        {
            const message = {
                notification: {
                  body: 'you have successfully login',
                  title:'Marg Health',
                  image : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fgirl%2F&psig=AOvVaw0ChvL2kIrDvtc2qCVPNIyN&ust=1634124804940000&source=images&cd=vfe&ved=0CAgQjRxqFwoTCMii-bfjxPMCFQAAAAAdAAAAABAD",
                },
                token: registrationToken
                };
                
                // Send a message to the device corresponding to the provided
                // registration token.
                firebaseAdminInstance.messaging().send(message)
                .then((response) => {
                  // Response is a message ID string.
                  console.log('Successfully sent message:', response);
                })
                .catch((error) => {
                  console.log('Error sending message:', error);
                });
        }
})
}

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
