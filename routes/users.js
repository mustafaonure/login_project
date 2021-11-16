const express = require('express');
const router = express.Router();



//Login Page
router.get('/login',(_req,res)=> res.render('login'));
//Register Page
router.get('/register',(_req,res)=> res.render('register'));

//Register Handle

const usersController = require('../controllers/users');
const User = require('../models/User');
router.post('/register', usersController.postSignup);

router.post('/login', usersController.postLogin);



module.exports = router;