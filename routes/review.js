const express = require('express');
const orderModel = require('../models/order');
const Address = require('../models/address');
const cartModel = require('../models/cart');
const reviewModel = require('../models/review');
const userModel = require('../models/userModel');
const reviewRouter = express.Router();


reviewRouter.post('/create', async (req, res) => {
    try {
      const {desc,rating,isReviewed,productId,userId } = req.body;
  
      const user = await userModel.findById(userId)

      const alreadyReviewd =  await reviewModel.findOne({productId:productId,userId:userId})

      if(alreadyReviewd){
        res.status(200).json({ message: 'You already reviewed'});
      }
      else if(user){

        // Create a new order using the orderModel schema and reference the saved address
        const review = new reviewModel({
          name:user.name,
          desc,
          rating,
          isReviewed,
          userId,
          productId,
        });
    
        // Save the order to the database
        const saveReview = await review.save();
       
        
        res.status(201).json({ message: 'Review saved successfully', review: saveReview });

     }else{
      res.status(200).json({ message: 'Login first', review: saveReview });

     }
      
    
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

reviewRouter.get('/:productId',async (req,res)=>{
    try {
        const id= req.params.productId

    // Find all review  for the specified productId
    const allReviews = await reviewModel.find({ productId: id }).sort({ createdAt: 1 });
       res.status(200).json(allReviews);  
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = reviewRouter;
