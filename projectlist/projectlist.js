const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/"

exports.createproject=(req,res)=>{
    mongoose.connect("mongodb://localhost:27017/assinement",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("connection successfully"))
.catch((err)=>{console.log(err)})
const projectlistschema=new mongoose.Schema({
    pname:String,
    reason:String,
    type:String,
    category:String,
    priority:String,
    department:String,
    startDate:Date,
    endDate:Date,
    location:String,
    status:{
        type:String,
        default:"Registered"
    }
})
const ProjectList=new mongoose.model("projectlist",projectlistschema)
const doc=new ProjectList({
    pname:"newproject",
    reason:"business",
    type:"self",
    category:"service",
    priority:"high",
    department:"Strategy",
    startDate: new Date,
    endDate: new Date,
    location:"mumbai",
})
doc.save();
console.log('document saved')
}

exports.projectlist=(req,res)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("assinement");
        dbo.collection("projectlists").find({}).toArray(function(err, result) {
          if (err) throw err
        //   console.log(result);
          if(result.length>0)
          {
              resdata={
                  status:true,
                  message:"data fetched",
                  data:result
              }
          // console.log(resdata);
          res.send(resdata)
          }
          else{
              resdata={
                  status:false,
                  message:"no data found",
              }
          // console.log(resdata);
          res.send(resdata)
          }
          db.close();
        });
      });
  }
