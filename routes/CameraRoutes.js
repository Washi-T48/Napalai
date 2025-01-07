const express = require('express');
const router = express.Router();

const getCamerasByZone = require('../controllers/GetCameraByZoneController');
const addCamera = require('../controllers/AddCameraController');


router.post('/cameras', addCamera);
router.get('/zones/:id/cameras', getCamerasByZone);

module.exports = router;