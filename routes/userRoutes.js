const express=require('express')
const userRoute=express()

const bodyParser=require('body-parser')
userRoute.use(bodyParser.json())
userRoute.use(bodyParser.urlencoded({extended:true}))

const multer=require('multer')
const path=require('path')

// userRoute.use(express.static('public'))
// const storage=multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,path.join(__dirname,'../public/userImages'),function(error,success){
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
// upload.single('image')
const user_controller=require("../controllers/userController")
const verifyToken = require('../middlewares/auth')
const userModel = require('../models/userModel')
userRoute.get('/:id',async(req,res)=>{
    try {
        const userId=req.params.id;

        const user=await userModel.findOne({_id:userId});

        const role=user.role

        res.status(200).send({success:true,role:role})

    } catch (error) {
        
        res.status(400).send(error.message)
    }
})
userRoute.post('/register',user_controller.register_user)
userRoute.post('/login',user_controller.login)
userRoute.post('/forgetmail',user_controller.forget_password)
userRoute.post('/update_password',user_controller.update_password)

module.exports=userRoute