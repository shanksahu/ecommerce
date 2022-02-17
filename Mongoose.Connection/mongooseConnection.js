const mongoose = require("mongoose")



// var database = mongoose.connect("mongodb://127.0.0.1/ARsecurity",
var database = mongoose.connect("mongodb+srv://shank11:shank11@cluster0.whm2p.mongodb.net/ArSecurity?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }, err => {
        if (err) {
            console.log(err);}
        console.log('connected to database')
       
    }); 