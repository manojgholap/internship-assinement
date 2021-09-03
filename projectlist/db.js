let mongoose = require('mongoose');
conn = mongoose.createConnection("mongodb://localhost:27017/assinement", { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log('database connected')
}).catch((err)=>console.log(err));
module.exports=conn;