
const mongoose = require('mongoose');
let url = 'mongodb://localhost:27017/assinement';
let conn = mongoose.createConnection(url,{ useNewUrlParser: true, useUnifiedTopology: true })
let projectLists=conn.collection('projectlists');

exports.tasks = [
        function countDocumentStartergy(cb) {

            projectLists.countDocuments({ department: "startergy" },async (err, result) => {
                if (err) {
                 await   cb(err);
                }
                else {
                  await  cb(null, result)
                }
            })
    },
    function countDocumentsFinance(callback) {

        projectLists.countDocuments({ department: "finance" }, async(err, result) => {
                if (err) {
                    await callback(err);
                }
                else {
                    await callback(null, result)
                }
            })
    },
    function countDocumentsQuality(callback) {
       
        projectLists.countDocuments({ department: "quality" }, async(err, result) => {
                if (err) {
                    await callback(err);
                }
                else {
                    await callback(null, result)
                }
            })
    },
    function countDocumentMaintainance(callback) {

            projectLists.countDocuments({ department: "maintainance" }, async(err, result) => {
                if (err) {
                    await callback(err);
                }
                else {
                    await callback(null, result)
                }
            })
    },
    function countDocumentsStore(callback) {

            projectLists.countDocuments({ department: "store" }, async(err, result) => {
                if (err) {
                    await callback(err);
                }
                else {
                    await callback(null, result)
                }
            })
    },
    function countDocumentHr(callback) {
        
      projectLists.countDocuments({ department: "hr" },(err, result) => {
                if (err) {
                     callback(err);
                }
                else {
                    callback(null, result)
                }
            })
    }
];

exports.task = [
     function countDocumentStartergy(cb) {

        projectLists.countDocuments({ department: "startergy", status: "completed" }, async(err, result) => {
                if (err) {
                    cb(err);
                }
                else {
                    cb(null, result)
                }
            })
    },
    function countDocumentsFinance(callback) {
        
        projectLists.countDocuments({ department: "finance", status: "completed" }, async(err, result) => {
                if (err) {
                    await callback(err);
                }
                else {
                    await callback(null, result)
                }
            })
    },
    function countDocumentsQuality(callback) {
        
            projectLists.countDocuments({ department: "quality", status: "completed" }, async(err, result) => {
                if (err) {
                    await callback(err);
                }
                else {
                    await callback(null, result)
                }
            })
    },
    function countDocumentMaintainance(callback) {
    
        projectLists.countDocuments({ department: "maintainance", status: "completed" }, async(err, result) => {
                if (err) {
                    await callback(err);
                }
                else {
                    await callback(null, result)
                }
            })
    },
    function countDocumentsStore(callback) {
       
            projectLists.countDocuments({ department: "store", status: "completed" }, async(err, result) => {
                if (err) {
                    await callback(err);
                }
                else {
                    await callback(null, result)
                }
            })
    },
    function countDocumentHr(callback) {
        
            projectLists.countDocuments({ department: "hr", status: "completed" }, async(err, result) => {
                if (err) {
                    await callback(err);
                }
                else {
                    await callback(null, result)
                }
            })
    }
];

exports.counttask = [
    function countDocuments(cb) {
        
        projectLists.countDocuments({}, async(err, result) => {
                if (err) {
                    cb(err);
                }
                else {
                    cb(null, result)
                }
            })
    },
    function countDocumentsCompleted(callback) {
       
        projectLists.countDocuments({ status: "completed" }, async(err, result) => {
                if (err) {
                    await callback(err);
                }
                else {
                    await callback(null, result)
                }
            })
    },
    function countDocumentsRunning(callback) {
        
        projectLists.countDocuments({ status: "running" }, async(err, result) => {
                if (err) {
                    await callback(err);
                }
                else {
                    await callback(null, result)
                }
            })
    },
    function countDocumentsDelay(callback) {
        let date = new Date()
        projectLists.countDocuments({ endDate: { $gt: date }, status: "running" }, async(err, result) => {
                if (err) {
                    await callback(err);
                }
                else {
                    await callback(null, result)
                }
            })
    },
    function countDocumentsCanceled(callback) {

        projectLists.countDocuments({ status: "canceled" }, async(err, result) => {
                if (err) {
                    await callback(err);
                }
                else {
                    await callback(null, result)
                }
            })
    },
];