require('./config/db');
const cors=require('cors');
var routes=require('./routes/userroutes');
var mongoose = require('mongoose');
var express=require('express');
var bodyparser=require('body-parser');


const app=express();


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(cors());

 app.use('/',routes);


 app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Methods"," GET, POST, OPTIONS, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers"," Content-Type,Origin, Accept");
  res.setHeader("Access-Control-Allow-Credentials",true)

 })

//server is created here
const port=process.env.PORT||3200
app.listen(port,()=>{
    console.log("server running at http://localhost:"+port);
})

