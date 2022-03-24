const jwt = require('jsonwebtoken')
const UserModel = require('./User.model')


module.exports.register=async (req, res, next) => {
    const { email, firstName, lastName, password, country, street, zip } = req.body;
    const errors = validationResult(req);
    const user=await UserModel.findOne({email});
    if (errors.errors.length) {
        res.status(404).json(!errors.errors.length)
        return ;
    }
   if(user){
//handle error
    return ;
   }
   const newUser=new UserModel({
    email, firstName, lastName, hashedPassword:password, country, street, phone 
   }).save()
   .then((data,error)=>{
       if(error)
       {
        res.status(404).json(error);
        return ;
       }
       res.status(200).json({status:"success",data:"user added succsufully"})
   })
}
module.exports.login=async (req,res,next)=>{
    const {email, password}=req.body;
    const user=await UserModel.findOne({email});
    if(!user)
    {
//handle error
        return ;
    }
 user.comparePassword(password ,(err,isMatch)=>{
    if(err)
    {
//handle error
        return ;
    }
    if(isMatch)
    {
        const userId=user._id;
        const token = jwt.sign({userId }, 'secret');
        res.status(200).json({ststus:"success",token})
        return;
    }

//handle error email or passowrd not correct
})
       
}
