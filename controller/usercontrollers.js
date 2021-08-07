require('../model/usermodel')
// const {registervalidation,loginvalidation}=require('../routes/validation')
const mongoose=require("mongoose");
const express=require('express');
var passport=require('passport');
const jwt=require('jsonwebtoken');
var localpassport=require('passport-local').Strategy;
var session=require('express-session');

var regData=mongoose.model('register');


const app=express();
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;


//middlewares
app.use(session({
    secret:'googleAuth',
    saveUninitialized:'true',
    resave:true
}));

app.use(passport.initialize());
app.use(passport.session());


//functions

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
// authentication....  generate token if user is verified
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


module.exports.loginGoogle=(req,res)=>{
    passport.authenticate('google',{scope:['profile','email']})
    const GOOGLE_CLIENT_ID='649268603964-4smdaretsvq86a3hhpe5vnuertp9kt2b.apps.googleusercontent.com';
    const GOOGLE_CLIENT_SECRET='Li0I104ifqDjd4PBBWrh5fuY'
    
    var userProfile; 
    app.get('/error',(req,res)=>{
        res.send('Error in login with gmail...') ; 
      })
      app.get('/success',(req,res)=>{
          res.send(userProfile);
          
      })
    passport.serializeUser((user,cb)=>{
        return cb(null,user);
    })
    
    passport.deserializeUser((obj,cb)=>{
        return cb(null,obj);
    })
    
    passport.use(new googleStrategy({
        clientID:GOOGLE_CLIENT_ID,
        clientSecret:GOOGLE_CLIENT_SECRET,
        callbackURL:"http://localhost:3000/auth/google/callback"
    },function(accessToken,refreshToken,profile,done){
        userProfile=profile;
        // if(!done){
        //     res.redirect("/error")
        // }
        return done(null,userProfile);

        }));
        
app.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
app.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/error'}),
function(req,res){
    res.redirect('/success')
});
        
}

// module.exports.loginErr=(req,res)=>{
//     res.send('Error in login with gmail...') ; 
// }

// module.exports.loginSucc=(req,res)=>{
//     res.send(userProfile);
// }


