const express = require('express');
const router = express.Router();
const{registerUser,logInUser ,getMe}=require('../Controoler/userController')
const{protect}=require('../middleware/authmiddleware')



router.post('/',registerUser);
router.post('/login', logInUser);
router.get('/me', protect,getMe);
module.exports=router;