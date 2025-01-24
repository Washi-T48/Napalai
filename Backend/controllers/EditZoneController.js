const Zone = require('../models/Zone');
const editZone = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
  
    try {
      const zone = await Zone.findByPk(id);
      if (!zone) {
        return res.status(404).json({ message: 'Zone not found' });
      }
  
      zone.name = name || zone.name;
      zone.description = description || zone.description;
      await zone.save();
  
      res.status(200).json({ message: `Zone with ID ${id} updated successfully`, zone });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update zone', error: error.message });
    }
  };
module.exports = editZone;