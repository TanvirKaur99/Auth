require('./usermodel');
require('../config/db');

const mongoose=require('mongoose');
//autoIncrement = require('mongoose-auto-increment');

//autoIncrement.initialize(connection);


//Schema for assigning task to user
var JobSchema=mongoose.Schema({
    job_id:{
        type:Number,
        default:0
        
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
      image:{
        type:String
         }
    
   
});

mongoose.model('jobs',JobSchema);
// JobSchema.plugin(autoIncrement.plugin, {
//     model: 'jobs',
//     field: 'job_id',
//     startAt: 10,
//     incrementBy: 10
// });
