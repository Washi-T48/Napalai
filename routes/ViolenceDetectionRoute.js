const express = require('express');
const router = express.Router();

const editViolence = require('../controllers/EditViolenceController.js')
const addViolence = require('../controllers/AddViolenceController')

router.post('/addViolence', addViolence);
router.put('/editViolence/:id', editViolence);

module.exports = router;