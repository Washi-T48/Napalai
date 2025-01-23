const express = require('express');
const router = express.Router();

<<<<<<< Updated upstream
const returnItem = require('../controllers/ReturnItemController')
const addForgottenItemEvent = require('../controllers/ReturnItemController')

router.post('/add-forgotten-item', addForgottenItemEvent);
router.put('/forgotten-item/:id/return', returnItem); //update ข้อมูล forgotten item
=======
const editForgottenItem = require('../controllers/EditForgottenController')
const addForgottenItem = require('../controllers/AddForgottenItemController')

router.post('/addForgottenItem', addForgottenItem);
router.put('/editForgottenItem/:id', editForgottenItem); //update ข้อมูล forgotten item
>>>>>>> Stashed changes

module.exports = router;