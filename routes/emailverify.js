const express=require('express')
const verifyEmailRoute=express();
const bodyParser=require('body-parser');
const userModel = require('../models/userModel');
verifyEmailRoute.use(bodyParser.json())
verifyEmailRoute.use(bodyParser.urlencoded({extended:true}))


verifyEmailRoute.post('/get_user',async(req,res)=>{
    try {

        const token=req.body.token
       
        const userToken=await userModel.findOne({token:token});
       
        if(userToken){
            if(userToken.emailVerify=="true" && userToken.token==null){
                res.status(200).send({success:true,data:userToken})
            }
           
        }
       
        
    } catch (error) {
        res.status(400).send({ msg: error.message })
    }
  

})

verifyEmailRoute.post('/',async(req,res)=>{
    try {

        const token=req.body.token
        const userToken=await userModel.findOne({token:token});
        let emailVerified
       
        if(userToken){

             emailVerified=await userModel.findByIdAndUpdate({_id:userToken._id},{$set:{
                emailVerify:true,
                token:null
               }})
        
            }
            
        res.status(200).send({success:true,data:userToken})
    } catch (error) {
        res.status(400).send({ msg: error.message })
    }
  

})
module.exports=verifyEmailRoute