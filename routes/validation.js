const Joi=require('joi');



//Register validation
const registervalidation=data=>{
    const schema={
        firstname:Joi.string().min(6).required(),
        lastname:Joi.string().min(6).required(),
        email:Joi.string().min(6).required(),
        password:Joi.string().min(6).required(),
        contact:Joi.number().max(10).required(),
    };
    return Joi.validate(data,schema);
}

//login validation
const loginvalidation=data=>{
    const schema={
        email:Joi.string().min(6).required(),
        password:Joi.string().min(6).required(),
       };
    return Joi.validate(data,schema);
}

module.exports.registervalidation=registervalidation;
module.exports.loginvalidation=loginvalidation;