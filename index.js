const express=require('express')
const app=express()
const mongoose=require('mongoose')
const cors = require('cors')
const userRoute = require('./routes/userRoutes')
const productRoute = require('./routes/productsRoutes')
const cartRoute = require('./routes/cart')
const orderRouter = require('./routes/order')
const verifyEmailRoute = require('./routes/emailverify')
const reviewRouter = require('./routes/review')
const contactRoute = require('./routes/contact')

var http = require('http'),
    fs = require('fs'),
    ccav = require('./ccavutil.js'),
    qs = require('querystring'),
    ccavReqHandler = require('./ccavRequestHandler.js'),
    ccavResHandler = require('./ccavResponseHandler.js');
const config = require('./config/config.js')

app.use(express.static('public'));
app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);

app.use(cors({ origin: ['https://daarvipharmaceuticals.com','http://daarvipharmaceuticals.com','https://daarvipharmaceutical.vercel.app','http://localhost:3000'], optionsSuccessStatus: 200 }));

app.options("*", cors({ origin: ['https://daarvipharmaceuticals.com','http://daarvipharmaceuticals.com','https://daarvipharmaceutical.vercel.app','http://localhost:3000'], optionsSuccessStatus: 200 }));

app.get('/api/ping',async(req,res)=>{
   try {

       res.status(200).send('Welcome to daarvi....')
       
   } catch (error) {
       throw error
   }
})
app.use('/api',userRoute)
app.use('/api/product',productRoute)
app.use('/api/verify_email',verifyEmailRoute)
app.use('/api/cart',cartRoute)
app.use('/api/order',orderRouter)
app.use('/api/review',reviewRouter)
app.use('/api/forget_password',userRoute)
app.use('/api/contact',contactRoute)

app.get('/api/about/payment_CCAvenue', function (req, res){
    console.log("api/about")
   res.render('./dataFrom.html');
});

app.post('/ccavRequestHandler', function (request, response){
ccavReqHandler.postReq(request, response);
});


app.post('/ccavResponseHandler', function (request, response){
    ccavResHandler.postRes(request, response);
});
app.listen(8080,async()=>{
    try {
       mongoose.connect('mongodb+srv://sushantshekhar:sushantshekhar@cluster0.jrb6jlo.mongodb.net/darvi?retryWrites=true&w=majority')
    console.log("server running at port 8080")
    } catch (error) {
       console.log(error) 
    }
})