let mongoose = require('mongoose')
const projectlistschema = new mongoose.Schema({
    pname: String,
    reason: String,
    type: String,
    category: String,
    priority: String,
    department: String,
    startDate: Date,
    endDate: Date,
    location: String,
    status: {
        type: String,
        default: "Registered"
    }
})
module.exports=projectlistschema