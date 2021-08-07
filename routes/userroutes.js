var express=require('express');
var passport=require('passport');
//const validation = require('../routes/validation')
var myctrl=require('../controller/usercontrollers');
var approute=express.Router();
approute.post('/newuser',myctrl.addnew);
approute.post('/login',myctrl.authenticate);
approute.get('/googlelogin',myctrl.loginGoogle);
// approute.get('/error',myctrl.loginErr);
//approute.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/error'}));

//approute.get('/success',myctrl.logSucc);


module.exports=approute;
