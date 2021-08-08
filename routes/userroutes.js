var express=require('express');
var passport=require('passport');
//const validation = require('../routes/validation')
var myctrl=require('../controller/usercontrollers');


var approute=express.Router();



approute.post('/newuser',myctrl.addnew);   //for registering a user
approute.post('/login',myctrl.authenticate);// for authenticating a user
approute.post('/addjob',myctrl.createJob);
approute.get('/getjob/:userid',myctrl.displayUserJoB);
approute.get('/googlelogin',myctrl.loginGoogle);// login through google

// approute.get('/error',myctrl.loginErr);
//approute.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/error'}));
//approute.get('/success',myctrl.logSucc);

approute.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
approute.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/error'}),
function(req,res){
    res.redirect('/success')
});


module.exports=approute;
