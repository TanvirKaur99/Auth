const mongoose=require('mongoose');

Schema = mongoose.Schema,

//autoIncrement = require('mongoose-auto-increment');


mongoose.connect("mongodb://localhost:27017/AuthDB",{useNewUrlParser:true,
useUnifiedTopology:true}).then(()=>{
    console.log(" database connect successfully")
}).catch((err)=>{
    console.log("error in connection"+err);
})
// autoIncrement.initialize(connection);



