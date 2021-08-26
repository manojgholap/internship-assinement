// const mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/"
exports.signIn=(req,res)=>{
{
    var data=req.body;
   var Username=data.username;
   var Password=data.password;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("assinement");
      dbo.collection("login").find({username:Username,password:Password}).toArray(function(err, result) {
        if (err) throw err
        console.log(result);
        if(result.length>0)
        {
            resdata={
                status:true,
                message:"login successfully",
                data:result
            }
        // console.log(resdata);
        res.send(resdata)
        }
        else{
            resdata={
                status:false,
                message:"invalid credentials",
            }
        // console.log(resdata);
        res.send(resdata)
        }
        db.close();
      });
    });
}
}
// exports.signIn=(req,res)=>{
// mongoose.connect("mongodb://localhost:27017/assinement",{useNewUrlParser:true,useUnifiedTopology:true},((err,db)=>{
//     if(err){
//         console.log("unable to connect database");
//     }
//     else{
        
//       db.collection("login").find({username:Username,password:Password}).toArray(function(err, result) {
//         if (err){
//             resdata={
//                 status:false,
//                 message:"invalid credentials",
//                 err:err
//             }
//             console.log(resdata);
//         }
//         else{
//             resdata={
//                 status:true,
//                 message:"login successfully",
//                 data:result
//             }
//             console.log(resdata);
//         }
//         db.close();
//       });
//     }
// }))
// }