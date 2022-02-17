var mongoose = require('mongoose');

var addProductSchema = new mongoose.Schema({

    
    productname: { type: String },

    cat: { type: String },

    modelno: { type: String },

    color: { type: String },

    price: { type: String },

    description: { type: String },



    
    image:
    {
        data: Buffer,
        contentType: String,
        filename:String
    }


});



module.exports = new mongoose.model('addProduct', addProductSchema);