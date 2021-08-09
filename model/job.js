require('./usermodel');

const mongoose=require('mongoose');


//Schema for assigning task to user
var JobSchema=mongoose.Schema({
    job_id:{
        type:Number,
        required:[true,"job_id  is required"],
        unique:[true,"job_id already exists"],
    },
    job_name:{
        type:String,
        required:[true,"job_name is required"]
    },
    job_hours:{
        type:Number,
        required:[true,"job_hours required"],   
    },
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'register'
      },
      date:{
        type:Date,
        default:Date.now()
      },
    
   
});
mongoose.model('jobs',JobSchema);