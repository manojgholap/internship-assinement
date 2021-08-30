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
console.log(req.body);
const doc=new ProjectList({
    pname:req.body.pname,
    reason:req.body.reason,
    type:req.body.type,
    category:req.body.category,
    priority:req.body.priority,
    department:req.body.department,
    startDate: req.body.startdate,
    endDate: req.body.enddate,
    location:req.body.location,
})
doc.save((err,data)=>{
    if (err) {
        resdata={
            status:false,
            message:"error while creating project",
            err:err
        }
        res.send(resdata);
    }
    else
    {
        resdata={
            status:true,
            message:"project added succefully",
            data:data
        }
        res.send(resdata); 
    }
})
}
exports.getcount=(req,res)=>{
    var date=new Date();
    MongoClient.connect(url,{useNewUrlParser:true,useUnifiedTopology:true},function(err, db) {
        if (err) throw err;
        console.log(db);
        var dbo = db.db("assinement");
        // dbo.collection("projectlists").aggregate([
        //     {"$group" : {_id:{status:"$status"}, count:{$sum:1}}},
        //     {$sort:{"count":-1}}
        // ],(err,result)=>{
            dbo.collection("projectlists").countDocuments({},(err,result)=>{
                if(err) throw err;
                var documentcount=result;
            dbo.collection("projectlists").countDocuments({status:"canceled"},(err,result1)=>{
                if(err) throw err;
                var canceled=result1
            dbo.collection("projectlists").countDocuments({status:"running"},(err,result2)=>{
                if(err) throw err;
                var running=result2;
                dbo.collection("projectlists").countDocuments({status:"completed"},(err,result3)=>{
                    if(err) throw err;
                    var completed=result3;
                dbo.collection("projectlists").countDocuments({endDate:{$lt:date},status:"running"},(err,result4)=>{
                    var registered=result4;
                    var data={
                        documentcount:documentcount,
                        canceled:canceled,
                        running:running,
                        completed:completed,
                        registered:registered
                    }
                    if(err) {
                        resdata={
                            status:false,
                            err:err
                        }
                        res.send(resdata)
                    }
                    else{
                        resdata={
                            status:true,
                            message:"fetched",
                            countdata:data
                        }
                        res.send(resdata)
                        console.log(resdata);
                    }
                })
                })
            })
            })
        })
    })
}
exports.projectlist=(req,res)=>{
    MongoClient.connect(url,{useNewUrlParser:true,useUnifiedTopology:true},function(err, db) {
        if (err) throw err;
        var dbo = db.db("assinement");
        dbo.collection("projectlists").find({}).toArray(function(err, result) {
          if (err) throw err
          if(result.length>0)
          {
              resdata={
                  status:true,
                  message:"data fetched",
                  data:result
              }
          res.send(resdata)
          }
          else{
              resdata={
                  status:false,
                  message:"no data found",
              }
          res.send(resdata)
          }
          db.close();
        });
      });
  }
  exports.updatestatus=(req,res)=>{

    var data= req.body;
    var id=data.id;
    var sts=data.status;
    console.log(data); 
    MongoClient.connect(url,{useNewUrlParser:true,useUnifiedTopology:true},function(err, db) {
    if(err) throw err;
        var dbo = db.db("assinement");
        dbo.collection("projectlists").updateOne({ pname:id},{
            $set :{
                status:sts
            }
        },(function(err, result) {
            
              if(err)
              {
                  resdata={
                      status:false,
                      message:"unable to update",
                      data:err
                  }
              res.send(resdata)
              console.log(resdata)
              }
              else{
                  if(result.result.nModified>0)
                  {
                  resdata={
                      status:true,
                      message:"updated",

                  }
              res.send(resdata)
              console.log(result);
                }
                else{
                    resdata={
                        status:false,
                        message:"unable to update",
                        data:err
                    }
                res.send(resdata)
                console.log(result)
                }
              }
              db.close();
            })
            ) 
        })
}
exports.getcount1=(req,res)=>{
    var date=new Date();
    MongoClient.connect(url,{useNewUrlParser:true,useUnifiedTopology:true},function(err, db) {
        if (err) throw err;
        console.log(db);
        var dbo = db.db("assinement");
        dbo.collection("projectlists").aggregate([
            {"$group" : {_id:{status:"$status"}, count:{$sum:1}}},
            {$sort:{"count":-1}}
        ],(err,result)=>{
            if (err) throw err
            console.log(result)
        })
    })
}
