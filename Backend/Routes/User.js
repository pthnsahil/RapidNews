const express=require('express');
const router=express.Router();

const Login=require('../Controllers/User/login.js');
const Register=require('../Controllers/User/register.js');

router.post('/login',Login);
router.post('/register',Register);

module.exports=router;