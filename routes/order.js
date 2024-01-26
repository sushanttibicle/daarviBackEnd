const express = require('express');
const orderModel = require('../models/order');
const Address = require('../models/address');
const cartModel = require('../models/cart');
const verifyToken=require('../middlewares/auth')
const orderRouter = express.Router();

// Route to place an order
orderRouter.post('/placeorder', async (req, res) => {
    try {
      const { userId, products,totalPrice, name,address,zipcode,city,mobile } = req.body;
  
      // Calculate the total price by summing the prices of all products in the order
    //   const totalPrice = products.reduce((total, product) => {
    //     return total + product.quantity * product.product.price;
    //   }, 0);
  
      // Create an array to hold the product subdocuments
      const productsArray = products.map((product) => ({
        productId: product.productId, // Assuming productId is the ID of the product being ordered
        productname:product.productname,
        category:product.category,
        price:product.price,
        rating:product.rating,
        productquantity: product.productquantity,
        image1url:product.image1url,
        
      }));
  
      // Create a new address using the Address model
      const newAddress = new Address({
        name: name,
        address: address,
        zipcode: zipcode,
        city: city,
        mobile: mobile,
        userId:userId
      });
  
      // Save the address to the database
      const savedAddress = await newAddress.save();
  
      // Create a new order using the orderModel schema and reference the saved address
      const order = new orderModel({
        userId,
        products: productsArray,
        totalPrice,
        address: savedAddress._id, // Reference the saved address
      });
  
      // Save the order to the database
      const savedOrder = await order.save();
     
      const deletedItems = await cartModel.deleteMany({ userId });

      res.status(201).json({ message: 'Order placed successfully', order: savedOrder });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
// Add more routes related to orders (e.g., get order history) here if needed
orderRouter.get('/myorders/:userId',verifyToken, async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all orders with the specified userId
    const orders = await orderModel.find({ userId }).populate('address').sort({ createdAt: 1 }); // Assuming you want to populate the associated address

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }
    const reversedOrders = orders.reverse();

    res.status(200).json({ message: 'Orders found', orders:reversedOrders });
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
});
orderRouter.put('/update/:id', async (req, res) => {
  try{
    const{status}=req.body

    const product = await orderModel.findById(req.params.id);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }else if(product.status=="cancelled"){
      return res.status(200).json({ message: 'Already Requested' });
    }else{
      product.status = status;
      await product.save();
  
      res.status(200).json({ message: 'updated successfully' });
    }

   
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
}
});

orderRouter.get('/admin/allorders',verifyToken, async (req, res) => {
  try {
   

    // Find all orders with the specified userId
    const orders = await orderModel.find().populate('address').sort({ createdAt: 1 }); // Assuming you want to populate the associated address

    
    const reversedOrders = orders.reverse();

    res.status(200).json({ message: 'Orders found', orders:reversedOrders });
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
});

orderRouter.put('/admin/update/:id', async (req, res) => {
  try{
    const{status,deliveryDate}=req.body

    const product = await orderModel.findById(req.params.id);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    product.status = status;
    product.deliveryDate = deliveryDate;
    await product.save();

    res.status(200).json({ message: 'updated successfully' });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
}
});
module.exports = orderRouter;
