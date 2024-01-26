const jwt=require('jsonwebtoken');
const config = require('../config/config');

const verifyToken=async(req,res,next)=>{

    const token=req.body.token|| req.query.token || req.headers["authorization"];

    if(!token){
      console.log("here")
        res.status(401).send({success:false,msg:"Token is required"})
    }else{
      try {
        const decode = jwt.verify(token, config.jwtSecretKey);
        req.user=decode;
      } catch (error) {
        res.status(400).send(error.message) 
      }
    }
    return next()
}
module.exports=verifyToken
