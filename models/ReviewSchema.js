const mongoose = require('mongoose');

//creating schema
var Schema = mongoose.Schema;
var reviewSchema = new Schema({
    review_id:{
        type:Schema.Types.ObjectId
    },
    order_id:{
        type:Schema.Types.ObjectId,
        ref:'Orders'
    },
    status:{
        type:String,
        ref:'Orders'
    },
    review:String

});

module.exports = mongoose.model('Reviews','reviewSchema');