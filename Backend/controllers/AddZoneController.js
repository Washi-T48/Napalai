const Zone = require('../models/Zone');
const addZone = async (req, res) => {
    const { name, description } = req.body;
  
    try {
      const newZone = await Zone.create({ name, description });
      res.status(201).json({ message: 'Zone created successfully', zone: newZone });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create zone', error: error.message });
    }
};

module.exports = addZone;