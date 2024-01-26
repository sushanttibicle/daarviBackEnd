const productModel = require("../models/product")



const products=async(req,res)=>{
    try {
        const product=new productModel({
            productname:req.body.productname,
            category:req.body.category,
            shortdescription:req.body.shortdescription,
            longdescription:req.body.longdescription,
            price:req.body.price,
            productquantity:req.body.productquantity,
            rating:req.body.rating,
            dosage:req.body.dosage,
            warning:req.body.warning,
            image1url:req.body.image1url,
            image2url:req.body.image2url,
            image3url:req.body.image3url,
            image4url:req.body.image4url,

        })
       const products=await product.save();
       res.status(200).send({success:true,msg:'uploaded successfully'})
    } catch (error) {
        res.status(400).send(error.message)
    }
}
module.exports={
    products
    
}