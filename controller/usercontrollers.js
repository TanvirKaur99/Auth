
const mongoose = require('mongoose')
const express=require('express');
var passport=require('passport');
const jwt=require('jsonwebtoken');
// var localpassport=require('passport-local').Strategy;
// const googleStrategy=require('passport-google-oauth').OAuth2Strategy;

let ObjectId = mongoose.Types.ObjectId;


require('../model/usermodel');
require('../model/job');
require('../config/passportconfig')
// const {registervalidation,loginvalidation}=require('../routes/validation')


var session=require('express-session');




//MODELS REFERENCES
var regData=mongoose.model('register');
var jobData=mongoose.model('jobs');




//FOR REGISTERING A NEW USER

module.exports.addnew=(req,res)=>{
// const {error}=registervalidation(req.body);
// if (error) return res.status(400).send(error.details[0].message) 
// const emailExist=regData.findOne({email:req.body.email});
// if(emailExist) return res.status(400).send('Email already exists')

    var reg=new regData({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password,
        contact:req.body.contact,

    });
    reg.save().then((docs)=>{
        return res.status(200).json({
            message:"new user register successfully",
            success:true,
            data:docs

        })
    }).catch((err)=>{
        return res.status(401).json({
            message:"error in adding",
            success:false,
            error:err.message
        })
    })
}



//AUTHENTICATION...GENERATING A TOKEN IF USER IS VALID 
module.exports.authenticate=(req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(err) return res.status(404).json(err);
        if (user) return res.status(200).json({
            "token":jwt.sign({_id:user._id},"SecretToken",{expiresIn:'2000m'}),
            "user":user
        });
        
        if(info) return res.status(401).json(info)
    })(req,res,next)
     
  }
  module.exports.tokenverify=(req,res, next)=>{
    let decoded;
    try {
        decoded = jwt.verify(req.headers.token, "SecretToken");
    }catch (e) {
        console.error(e);
    }
    console.log("decoded",decoded);
    // req.body.decoded = decoded;
    req.body.userid=decoded._id
    next();
  }




//CREATING A JOB
module.exports.createJob=async(req,res)=>{
    console.log(req.body);
    //for finding the maximum jobid number
    const num=await jobData.find({},{job_id: 1}).sort({job_id:-1}).limit(1)
    console.log({num});
    var idjob=num[0].job_id+1;
    console.log(idjob);
  

var job=new jobData({
    job_id:idjob,
    job_name:req.body.job_name,
    job_hours:req.body.job_hours,
    // userid:ObjectId(req.body.userid),
    userid:req.body.userid
});
//console.log({job})
job.save().then((docs)=>{
    return res.status(200).json({
        message:"new job entered successfully",
        success:true,
        data:docs

    })
}).catch((err)=>{
    return res.status(401).json({
        message:"error in adding job",
        success:false,
        error:err.message
    })
})
}


//FOR DISPLAYING THE NUMBER OF JOBS ASSIGNED TO A PARTICULAR USER
module.exports.displayUserJoB=(req,res)=>{
    console.log(req.body);
    let jobdata=jobData.find({userid:req.body.userid}).exec().then((docs)=>{
        let dataJob=docs;
       console.log(docs);
       regData.find({_id:req.body.userid}).exec().then((docs)=>{
          let userinfo= {docs,dataJob}
        return res.status(200).json({
            success:true,
            message:'list of jobs',
            data:userinfo
        })
       }).catch((err)=>{
        return res.status(400).json({
          success:false,
          message:'error in displaying jobs',
          error:err.message
      })
      })
         
  })
  }



  

  


