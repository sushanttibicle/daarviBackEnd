const mongoose=require('mongoose')

const cartSchema=new mongoose.Schema({
   productId:{
      type:String,
      required:true 
   },
    productname:{
        type:String,
        required:true 
     },
     category:{
         type:String,
         required:true 
      },
      price:{
         type:Number,
         required:true 
      },
      rating:{
         type:Number,
         required:true 
      },
      productquantity:{
         type:Number,
         required:true 
      },
      image1url:{
         type:String,
         required:true 
      },
     userId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user',
        required: true  
     }
   
})

const cartModel=mongoose.model('cart',cartSchema);

module.exports=cartModel;