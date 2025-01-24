const ForgottenItemEvent = require('../models/ForgottenItemEvent');

const addForgottenItemEvent = async (req, res) => {
  try {
    const { itemName, item_description } = req.body;

    if (!itemName) {
      return res.status(400).json({ message: 'itemName is required.' });
    }

    // สร้างข้อมูลใหม่ในตาราง ForgottenItemEvent
    const newEvent = await ForgottenItemEvent.create({
      itemName,
      item_description, // อนุญาตให้เป็น null ได้
    });

    res.status(201).json({
      message: 'Forgotten item event added successfully!',
      data: newEvent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add forgotten item event.', error: error.message });
  }
};

module.exports = addForgottenItemEvent;
