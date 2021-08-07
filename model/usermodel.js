const mongoose=require('mongoose');
const bcyrpt=require('bcrypt');

//Schema for register user
var registerSchema=mongoose.Schema({
    firstname:{
        type:String,
        required:[true,"first name is required"]
    },
    lastname:{
        type:String,
        required:[true,"last name is required"]
    },
    email:{
        type:String,
        unique:[true,"email already exists"],
        required:[true,"email is required"],   
    },
    contact:{
      type:String,
      minlength:[10,'invalid phone number'],
      required:[true,"contact is required"]
    },
    password:{
        type:String,
        required:[true,"password cannot be empty"],
        minlength:[5,'password should be greater than 5']
        },

});

//encrypt password
registerSchema.pre('save',function(next){
  bcyrpt.genSalt(15,(err,salt)=>{
      bcyrpt.hash(this.password,salt,(err,hash)=>{
          this.password=hash,
          this.saltString=salt
          next();
      })
  })
})

 //verify password
 registerSchema.methods.verifyPassword=function(password){
   return bcyrpt.compareSync(password,this.password)
 }

 mongoose.model('register',registerSchema);