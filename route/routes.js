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
const createPaymentController = require('../controller/createPayment');
const getAllPaymentsController = require('../controller/getAllPayment');
const getPaymentsByStudentController = require('../controller/getPaymentByStudent');
const updatePaymentStatusController = require('../controller/updatePaymentStatus');
 
 

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
router.put('/update-batches/:batchId',authToken,updateBatchController);
router.delete('/delete-batches/:batchId',authToken,deleteBatchController);



// payment--router

router.post('/payment', authToken,createPaymentController);
router.get('/all-payments',authToken,getAllPaymentsController);
router.get('/payments/students/:studentId',authToken,getPaymentsByStudentController);
router.put('/payment/:paymentId',authToken,updatePaymentStatusController);





module.exports = router;