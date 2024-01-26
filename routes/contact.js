const express=require('express')
const contactRoute=express();
const bodyParser=require('body-parser');
const contactModel = require('../models/contact');
contactRoute.use(bodyParser.json())
contactRoute.use(bodyParser.urlencoded({extended:true}))

contactRoute.post('/create',async(req,res)=>{
    try {
       const {name,email,message}=req.body;

       const alreadyContacted = await contactModel.findOne({email:email})

       if(alreadyContacted){

        res.status(200).json({ message: 'already contacted'});
     

       }else{

        const contactObj = new contactModel({
            name,
            email,
            message
           });
     
            const contact = await contactObj.save()
           
            res.status(201).json({ message: 'Submit successfully'});
     
       }

       
    } catch (error) {

      res.status(500).json({ error: error.message });

    }
})

contactRoute.get('/getContact',async(req,res)=>{
  try {
    

   
        const contactData =  await contactModel.find()
         
          res.status(200).json(contactData);
   
     

     
  } catch (error) {

    res.status(500).json({ error: error.message });

  }
})

module.exports=contactRoute;
