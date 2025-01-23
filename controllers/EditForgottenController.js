const ForgottenItemEvent = require('../models/ForgottenItemEvent');

const returnItem = async (req, res) => {
  try {
    const { id } = req.params; 
    const { ownerName, timeReturn } = req.body; // รับ ownerName และ timeReturn จาก body

    // ตรวจสอบว่า ownerName หรือ timeReturn ถูกส่งมาหรือไม่
    if (!ownerName && !timeReturn) {
      return res.status(400).json({
        message: 'At least one of ownerName or timeReturn must be provided.',
      });
    }

    // ค้นหา ForgottenItemEvent ที่ต้องการแก้ไข
    const event = await ForgottenItemEvent.findByPk(id);
    if (!event) {
      return res.status(404).json({
        message: 'Forgotten item event not found.',
      });
    }

    // อัปเดตข้อมูล ownerName และ/หรือ timeReturn
    if (ownerName) event.ownerName = ownerName;
    if (timeReturn) event.timeReturn = timeReturn;

    // บันทึกการเปลี่ยนแปลง
    await event.save();

    res.status(200).json({
      message: 'Forgotten item event updated successfully!',
      data: event,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to update forgotten item event.',
      error: error.message,
    });
  }
};

module.exports = returnItem;
