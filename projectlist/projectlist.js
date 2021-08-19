const mongoose = require('mongoose');
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