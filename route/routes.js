const express = require('express');
const router = express.Router();

const userRegisterController = require('../controller/register');
const userLoginController = require('../controller/userLogin');
const getUserProfileController = require('../controller/userProfile');
 const authToken = require('../middilware/authToken');
const updateUserProfileController = require('../controller/updateUserProfile');
const getAllStudentsController = require('../controller/allStudents');
const getAllAccountantsController = require('../controller/allAccountants');
const createBatchController = require('../controller/createBatch');
 
 

//User--router
router.post('/user/register', userRegisterController);
router.post('/user/login',userLoginController);
router.get('/user/profile', authToken, getUserProfileController)
router.put('/user/profile/update',authToken,updateUserProfileController);
router.get('/user/students',authToken,getAllStudentsController);
router.get('/user/accountant',authToken,getAllAccountantsController);

// Batch--router

router.post('/batches',authToken,createBatchController);


module.exports = router;