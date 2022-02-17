const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: { type: String },
    fullname: { type: String },
    phoneno: { type: String },
    password: { type: String },
    cnfpassword: { type: String },
    role:{type:String}
    
   
})
                                
const userdata = new mongoose.model("userdata", userSchema)

module.exports = userdata