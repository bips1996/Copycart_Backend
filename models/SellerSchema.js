const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const sellerSchema = new Schema({
  sellerId:Schema.Types.ObjectId,
  name:
  {   firstname:{
        type:String,
        required:true
      },
      middlename:String,
      lastname:{
        type:String,
        required:true
      }
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  contact:{
    type:String,
    required:true
  },
  addedProducts:[{
      type:Schema.Types.ObjectId,
      ref:'Product'
  }],
  orderRequested:[{
    type:Schema.Types.ObjectId,
    ref:'Order'
  }],
  approveOrder:{
      type:Boolean,
      ref:'Order'
  },
  createdAt:{
    type:Date,
    default:Date.now()
  }
});

 
module.exports = mongoose.model('Seller',sellerSchema);