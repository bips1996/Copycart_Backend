const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var orderSchema = new Schema({
    orderId:Schema.Types.ObjectId,
    placedBy:{
      type:Schema.Types.ObjectId,
      ref:'Customer'
    },
    orderProduct:{
      type:Schema.Types.ObjectId,
      ref:'Product'
    },
    orderStatus:{
      type:String,
      enum:['Requested','approved','Placed','Shipped','Delievered','Cancelled']
    },
    orderQuantity:{
      type:Number,
      required:true
    },
    subTotal:{
      type:Number
    },
    orderAt:{
      type:Date,
      default:Date.now()
    }
    
  });

module.exports = mongoose.model('Order',orderSchema);