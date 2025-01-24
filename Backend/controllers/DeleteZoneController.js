const Zone = require('../models/Zone');
const deleteZone = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedZone = await Zone.destroy({ where: { id } }); // ลบ zone ตาม id
      if (deletedZone) {
        res.status(200).json({ message: `Zone with ID ${id} deleted successfully` });
      } else {
        res.status(404).json({ message: 'Zone not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete zone', error: error.message });
    }
  }

module.exports = deleteZone