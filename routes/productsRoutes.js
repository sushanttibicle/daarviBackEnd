const express=require('express')
const productRoute=express();
const bodyParser=require('body-parser')
productRoute.use(bodyParser.json())
productRoute.use(bodyParser.urlencoded({extended:true}))

const multer=require('multer')
const path=require('path');
const productController = require('../controllers/productController');
const productModel = require('../models/product');

// productRoute.use(express.static('public'))
// const storage=multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,path.join(__dirname,'../public/productImages'),function(error,success){
//             if(error)throw error
//         });
//     },
//     filename:function(req,file,cb){
//         const name=Date.now()+'-'+file.originalname;
//         cb(null,name,function(error1,success1){
//             if(error1)throw error1
//         })
//     }
// });
// const upload=multer({storage:storage});
productRoute.get('/allproducts',async(req,res)=>{
    
    try{
    const products=await productModel.find()
    res.status(200).send(products)
   } catch (error) {
    res.status(400).send({ msg: error.message })
   }
})
productRoute.get('/allproducts/:id',async(req,res)=>{
    const id=req.params.id
    try{
    const products=await productModel.findOne({ _id: id })
    res.status(200).send(products)
   } catch (error) {
    res.status(400).send({ msg: error.message })
   }
})
productRoute.post('/allproducts',productController.products)
productRoute.put('/edit/:id',async(req,res)=>{
    try{
    const{productName,price,shortdescription,longdescription}=req.body

    const product = await productModel.findById(req.params.id);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    product.productname = productName;
    product.price = price;
    product.shortdescription=shortdescription
    product.longdescription=longdescription
    await product.save();

    res.status(200).json({ message: 'Product updated successfully' });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
}
});
productRoute.delete('/delete/:id',async(req,res)=>{
    try{
    
    const product = await productModel.findByIdAndDelete(req.params.id);
console.log(product)
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

   

    res.status(200).json({ message: 'Product deleted successfully' });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
}
})


module.exports=productRoute;
