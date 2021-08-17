var express=require('express');
var passport=require('passport');
//const validation = require('../routes/validation')
var myctrl=require('../controller/usercontrollers');


var approute=express.Router();



/**
 * @swagger
 * /newuser:
 *   post:
 *     summary: Create a JSONPlaceholder user.
 *     description: Registering a user
 *     requestBody: 
 *       required: true 
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: The user's firstname.
 *                 example: Sahib
 *               lastname:
 *                 type: string                  
 *                 description: The user's lastname.                
 *                 example: Singh
 *               email: 
 *                 type: string
 *                 description: The user's email.  
 *                 example: sahib123@gmail.com 
 *               password: 
 *                 type: string
 *                 description: The user's password.
 *                 example: sahib123#890  
 *               contact:
 *                  type: number
 *                  description: The user's contact number.
 *                  example: 9779942135 
 *     responses:
 *       200:
 *         description: user registered successfully.
 *       500:
 *         description: Error in registering a user.
 *                                 
*/

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a JSONPlaceholder user.
 *     description: Login a user
 *     requestBody: 
 *       required: true 
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: 
 *                 type: string
 *                 description: The user's email.  
 *                 example: sahib123@gmail.com 
 *               password: 
 *                 type: string
 *                 description: The user's password.
 *                 example: sahib123#890  
 *     responses:
 *       200:
 *         description: user registered successfully.
 *       500:
 *         description: Error in registering a user.
 *                                 
*/

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a JSONPlaceholder user.
 *     description: Login a user
 *     requestBody: 
 *       required: true 
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: 
 *                 type: string
 *                 description: The user's email.  
 *                 example: sahib123@gmail.com 
 *               password: 
 *                 type: string
 *                 description: The user's password.
 *                 example: sahib123#890  
 *     responses:
 *       200:
 *         description: user registered successfully.
 *       500:
 *         description: Error in registering a user.
 *                                 
*/

/**
 * @swagger
 * /addjob:
 *   post:
 *     summary: create a JSONPlaceholder jobs.
 *     description: creating a job
 *     components: 
 *       securitySchemes: 
 *     parameters: 
 *       - in: header
 *         name: token
 *         required: true
 *     requestBody: 
 *       required: true 
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               job_id: 
 *                 type: number
 *                 description: Job Id created by user.  
 *                 example: 11 
 *               job_name: 
 *                 type: string
 *                 description: The Job's name.
 *                 example: Pickup
 *               job_hours:
 *                 type: number
 *                 description: The Job hours.
 *                 example: 9
 *               job_date:
 *                  type: date
 *                  description: The date when Job was assigned
 *                  example: 2021-06-22T11:27:12.175+00:00        
 *     responses:
 *       200:
 *         description: Job created successfully.
 *       500:
 *         description: Error in creating a Job.
 *                                 
*/

 /**
 * @swagger
 * /getjob/{userid}:
 *   get:
 *     summary: Retrieve Array of jobs created by a particular JSONPlaceholder user.
 *     description: Retrieve jobs JSONPlaceholder user.
 *     parameters: 
 *       - name: userid
 *         in: path
 *         required: true
 *         schema: 
 *           type: string
 *     responses: 
 *       200: 
 *          description: success
 *       500:
 *          description: failure        
*/   

approute.post('/newuser',myctrl.addnew);   //for registering a user
approute.post('/login',myctrl.authenticate);// for authenticating a user
approute.post('/addjob',myctrl.tokenverify, myctrl.createJob);
approute.get('/getjob/:userid',myctrl.displayUserJoB);

module.exports=approute;
