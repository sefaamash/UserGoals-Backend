const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler'); //to handle exception we can use builtin express async handler instead of try catch
const User = require('../models/usermodel')
const mongoose = require('mongoose');

//Now we are making this auth middleware function to actually protect our routes
const protect =asyncHandler(async(req,res,next)=>{
   let token

   if(req.headers.authorization && req.headers.authorization.startsWith('Bearer') ){
    try{
        //Get token from header
        //token starts with 'Bearer space then token' so we split it with space so it become array and bearer bewcomes 0 and token becomes 1 so we want token so we get by position 1
    token=req.headers.authorization.split(' ')[1]
    //Verify token
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    console.log(decoded)
    
    //gET USER
        req.user = await User.findById(decoded.id).select('-password') //select('-password') this will not look for password
        
        next()
   
    }catch(err){
      res.status(401)
      throw new Error('Not authorised')
    }
   }

   if(!token){
       res.status(401)
       throw new Error('Not authorised,No token')
   }
})




module.exports={protect}





// req.headers.authorization HAS THE TOKEN WITH FORMAT BEARER TOKEN
//next?
//Next simply allows the next route handler in line to handle the request. In this case, if the user id exists, it will likely use res.send to complete the request. If it doesn't exist, there is likely another handler that will issue an error and complete the request then.
//It passes control to the next matching route.