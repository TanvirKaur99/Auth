const mongoose=require('mongoose');


//Schema for assigning task to user
var JobSchema=mongoose.Schema({
    job_id:{
        type:Number,
        required:[true,"first name is required"]
    },
    job_name:{
        type:String,
        required:[true,"last name is required"]
    },
    job_hours:{
        type:String,
        unique:[true,"email already exists"],
        required:[true,"email is required"],   
    },
   
});