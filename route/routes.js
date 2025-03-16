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
const getAllBatchesController = require('../controller/allBatch');
const getBatchByIdController = require('../controller/getBatchById');
const updateBatchController = require('../controller/updateBatch');
const deleteBatchController = require('../controller/deleteBatch');
 
 

//User--router
router.post('/user/register', userRegisterController);
router.post('/user/login',userLoginController);
router.get('/user/profile', authToken, getUserProfileController)
router.put('/user/profile/update',authToken,updateUserProfileController);
router.get('/user/students',authToken,getAllStudentsController);
router.get('/user/accountants',authToken,getAllAccountantsController);


// Batch--router

router.post('/batches',authToken,createBatchController);
router.get('/all-batches',authToken,getAllBatchesController);
router.get('/batches/:batchId',authToken,getBatchByIdController);
router.put('/batches/:batchId',authToken,updateBatchController);
router.delete('/delete-batches/:batchId',authToken,deleteBatchController);






module.exports = router;