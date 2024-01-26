const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  isReviewed:{
     type: String,
     required:true
  },
  productId:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'product',
    required: true  
 },
 userId:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user',
    required: true  
 }
});

const reviewModel = mongoose.model('review', reviewSchema);

module.exports = reviewModel;
