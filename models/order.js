const mongoose = require('mongoose');

function formatDateToDMY() {
    const now = new Date();
  
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Note: Month is 0-indexed, so we add 1.
    const year = now.getFullYear();
  
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  }
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Reference to the user model, assuming you have one
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'cart', // Reference to the cart model or the product model
                required: true,
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
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Address', // Reference to the Address model
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    status:{
        type:String,
        default:"pending"
    },
    deliveryDate: {
        type: Date,
        default: "",
    },
});

const orderModel = mongoose.model('order', orderSchema);

module.exports = orderModel;
