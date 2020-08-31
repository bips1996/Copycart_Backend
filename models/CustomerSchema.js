const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const customerSchema = new Schema({
  customerId:Schema.Types.ObjectId,
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
  address:{
    hostelName:String,
    roomNo:String
  },
  // userType:{
  //   type:String,
  //   enum:['Buyer','Developer'],
  // },
  placedOrder:[{
    type:Schema.Types.ObjectId,
    ref:'Order'
  }],
  createdAt:{
    type:Date,
    default:Date.now()
  }
});

 
module.exports = mongoose.model('Customer',customerSchema);