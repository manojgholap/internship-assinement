const mongoose = require('mongoose');

exports.signIn=(req,res)=>{
    mongoose.connect("mongodb://localhost:27017/assinement",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("connection successfully"))
.catch((err)=>{console.log(err)})
    var data=req.body;
    console.log(data)
    var response={
        status:true,
        message:'server get the details of user'
    }
    res.send(response)
}