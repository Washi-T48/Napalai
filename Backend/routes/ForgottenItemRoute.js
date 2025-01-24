const express = require('express');
const router = express.Router();

const editForgottenItem = require('../controllers/EditForgottenController')
const addForgottenItem = require('../controllers/AddForgottenItemController')

router.post('/addForgottenItem', addForgottenItem);
router.put('/editForgottenItem/:id', editForgottenItem); //update ข้อมูล forgotten item

module.exports = router;