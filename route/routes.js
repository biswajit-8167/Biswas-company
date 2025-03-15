const express = require('express');
const router = express.Router();

const userRegisterController = require('../controller/register');
const userLoginController = require('../controller/userLogin');
const getUserProfileController = require('../controller/userProfile');
 const authToken = require('../middilware/authToken');
const updateUserProfileController = require('../controller/updateUserProfile');
const getAllStudentsController = require('../controller/allStudents');
 

//User--router
router.post('/user/register', userRegisterController);
router.post('/user/login',userLoginController);
router.get('/user/profile', authToken, getUserProfileController)
router.put('/user/profile/update',authToken,updateUserProfileController);
router.get('/user/students',authToken,getAllStudentsController);


module.exports = router;