var mongoose = require('mongoose');

var addtocardSchema = new mongoose.Schema({

    productId: [ {type:String} ],

   userid: { type: String }


});



module.exports = new mongoose.model('addtocart', addtocardSchema);