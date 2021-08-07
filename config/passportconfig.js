var passport=require('passport');
var localpassport=require('passport-local').Strategy;

require('../model/usermodel');

const mongoose=require('mongoose');
var regModel= mongoose.model('register');


//match user's entered field with database
passport.use(new localpassport({usernameField:'email'},
(username,password,done)=>{
    regModel.findOne({email:username},
        (err,user)=>{
            if(err)
            return done(err);
            else if(!user)
            return done (null,false,{message:'email is not registered'})
            else if(!user.verifyPassword(password))
            return done (null,false,{message:'password doesnot match'})
            else
            return done (null,user);
   })
  }))
