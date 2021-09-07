let mongoose = require('mongoose');
let url="mongodb://localhost:27017/assinement";
let conn = mongoose.createConnection((url, { useNewUrlParser: true, useUnifiedTopology: true }),(err,db)=>{
    if (err) throw err;
    console.log('database connected');
})
module.export = conn;