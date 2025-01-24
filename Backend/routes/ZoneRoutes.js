const express = require('express');
const router = express.Router();

const getAllZones = require('../controllers/GetAllZoneController');
const getCamerasByZone = require('../controllers/GetCameraByZoneController');
const addZone = require('../controllers/AddZoneController');
const deleteZone = require('../controllers/DeleteZoneController');
const editZone  = require('../controllers/EditZoneController');

router.get('/getAllZones', getAllZones);// Get all zones
router.get('/getCameraByZone/:id', getCamerasByZone); // get all cameras in zone by id
router.post('/addZone', addZone);// Add a new zone
router.delete('/deleteZone/:id', deleteZone);// Delete zone by ID
router.put('/editZones/:id', editZone);// Edit zone by ID

module.exports = router;
