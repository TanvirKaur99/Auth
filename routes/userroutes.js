var express=require('express');
var passport=require('passport');
//const validation = require('../routes/validation')
var myctrl=require('../controller/usercontrollers');


var approute=express.Router();

approute.post('/newuser',myctrl.addnew);   //for registering a user
approute.post('/login',myctrl.authenticate);// for authenticating a user
approute.post('/addjob',myctrl.createJob);
approute.get('/getjob/:userid',myctrl.displayUserJoB);

module.exports=approute;
