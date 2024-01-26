const express=require('express')
const cartRoute=express();
const verifyToken=require('../middlewares/auth')
const bodyParser=require('body-parser');
const cartModel = require('../models/cart');
const productModel = require('../models/product');
cartRoute.use(bodyParser.json())
cartRoute.use(bodyParser.urlencoded({extended:true}))

cartRoute.get("/cartitems/:id",verifyToken,async(req,res)=>{
  const { id } = req.params;
  try {
    // Find all cart items for the specified userId
    const cartItems = await cartModel.find({ userId: id });

    // Calculate the total cart price
    let totalCartPrice = 0;
    for (const item of cartItems) {
      totalCartPrice += item.price*item.productquantity; // Assuming each cart item has a "price" property
    }

    // Count the number of cart items
    const cartCount = cartItems.length;

    res.status(200).send({ cart: cartItems, cartCount, totalCartPrice });
    } catch (error) {
      res.status(401).send({"msg":error.message})
    }
  })
  cartRoute.get("/cartitems/count/:id",async(req,res)=>{
    const { id } = req.params;
    try {
      // Find all cart items for the specified userId
      const cartItems = await cartModel.find({ userId: id });
  
     
  
      // Count the number of cart items
      const cartCount = cartItems.length;
  
      res.status(200).send({  cartCount});
      } catch (error) {
        res.status(401).send({"msg":error.message})
      }
    })

  cartRoute.post("/cartitems/addcart",verifyToken,async(req,res)=>{
    try {
        const { productId, productname, category, price, rating,image1url, productquantity} = req.body;
         // Check if the product with the same productId exists in the user's cart
    const existingCartItem = await cartModel.findOne({
      userId: req.user._id,
      productId: productId,
    });

    if (existingCartItem) {
      return res.status(200).json({ message: 'Item already in cart' });
    }
        // Create a new cart item using the cartModel schema
        const cartItem = new cartModel({
            productId,
            productname,
            category,
            price,
            rating,
            image1url,
            productquantity,
            userId:req.user._id
            
        });
     
        // Save the cart item to the database
        const savedCartItem = await cartItem.save();

        const prodId=productId;

        const productItem=await productModel.findById({ _id: prodId})
        
        res.status(201).json({ message: 'Product added to cart', cartItem: savedCartItem,productImage:productItem.image1url });
    
      } catch (error) {
        res.status(500).json({ msg:error.message });
    }
  })
  // DELETE route to remove a specific cart item by ID
  cartRoute.delete('/cartitems/delete/:id',verifyToken, async (req, res) => {
  const { id } = req.params;
  
  try {
    // Find the cart item by its ID and remove it
    const deletedCartItem = await cartModel.findByIdAndRemove(id);

    if (!deletedCartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.status(200).json({ message: 'Cart item removed successfully', deletedCartItem });
  } catch (error) {
    res.status(500).json({ message: 'Error removing cart item', error: error.message });
  }
});
  cartRoute.delete('/deleteCart/:userId',verifyToken, async (req, res) => {
    const { userId } = req.params;
    try {
        // Find and remove all cart items for the specified userId
        const deletedItems = await cartModel.deleteMany({ userId });

        res.status(200).json({ message: `Deleted ${deletedItems.deletedCount} cart items for userId: ${userId}` });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting cart items' });
    }
});


module.exports=cartRoute;