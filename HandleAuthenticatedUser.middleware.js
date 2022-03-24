const jwt =require('jsonwebtoken');
const handleAuthenticatedUser=(req,res,next)=>{
    try{
        const {token}=req.body;
        const decoded = jwt.verify(token, 'secret');
        req.userId=decoded.userId;
        next();
    }
    catch(err)
    {
//handle error
    }
}
module.exports=handleAuthenticatedUser;