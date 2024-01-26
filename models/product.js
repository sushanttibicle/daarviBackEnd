const mongoose=require('mongoose')

const productSchema=mongoose.Schema({
    productname:{
       type:String,
       required:true 
    },
    category:{
        type:String,
        default:"Syrup"
     },
     shortdescription:{
        type:String,
        required:true 
     },
     longdescription:{
        type:String,
        required:true 
     },
     price:{
        type:Number,
        required:true 
     },
     rating:{
        type:Number,
        default:4 
     },
     productquantity:{
        type:Number,
        default:1
     },
     dosage:{
      type:String

     },
     warning:{
      type:String

     },
     image1url:{
        type:String

    },
    image2url:{
        type:String
       
    },
    image3url:{
        type:String
       
    },
    image4url:{
      type:String
     
  },
})
const productModel=mongoose.model("product",productSchema)
module.exports=productModel;