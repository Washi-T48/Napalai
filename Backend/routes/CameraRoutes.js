const express = require('express');
const router = express.Router();

const addCamera = require('../controllers/AddCameraController');
const deleteCameraById = require('../controllers/DeleteCameraController')
const editCameraById = require('../controllers/EditCameraController')
const getAllCameras = require('../controllers/GetAllCameraController'); 
const getCameraById = require('../controllers/GetCameraByIdController');  

router.post('/addCamera', addCamera);
router.delete('/deleteCamera/:id', deleteCameraById); //delete camera by id
router.put('/editCamera/:id', editCameraById); //update camera by id
router.get('/getAllCameras', getAllCameras);
router.get('/getCameraById/:id', getCameraById);

module.exports = router;