const express = require('express');
const router = express.Router();

const returnItem = require('../controllers/ReturnItemController')
const addForgottenItemEvent = require('../controllers/ReturnItemController')

router.post('/add-forgotten-item', addForgottenItemEvent);
router.put('/forgotten-item/:id/return', returnItem); 

module.exports = router;