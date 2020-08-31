const mongoose = require('mongoose');
const { SchemaMetaFieldDef } = require('graphql');

const Schema = mongoose.Schema;
 //creating productSchema
 const productSchema = new Schema({
    productId:Schema.Types.ObjectId,
    category:{
      type:String,
      enum:['Notebook','Pen'],
    },
    brand:{
      type:String,
      enum:['Classmate','Ajanta','Cello','Glycer'],
    },
    color:{
      type:String,
      enum:['Red','Blue','Black']//for pen category
    },
    size:{
      type:String,
      enum:['Small','Medium','Large']//for book category
    },
    description:{
      type:String
    },
    availability:
    {
      type:Boolean,
      default:true
    },
    price: {
      type:Number,
      required:true
    },
    quantity:{
      type:Number
    },
    addedBy:{
      type:Schema.Types.ObjectId,
      ref:'Seller'
    },
    addedAt:{
      type:Date,
      default:Date.now()
    }
    
 });

module.exports = mongoose.model('Product',productSchema);