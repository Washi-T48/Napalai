const Zone = require('../models/Zone');

const getAllZones = async (req, res) => {
  try {
    const zones = await Zone.findAll(); // ดึงข้อมูลทั้งหมด
    res.status(200).json(zones);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch zones', error: error.message });
  }
};

module.exports = getAllZones