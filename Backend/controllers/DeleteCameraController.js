const Camera = require('../models/Camera'); 

const deleteCameraById = async (req, res) => {
    const { id } = req.params; 

    try {
      const camera = await Camera.findByPk(id); 
      if (!camera) {
        return res.status(404).json({ message: 'Camera not found' }); 
      }

      await camera.destroy(); 
      res.status(200).json({ message: `Camera with ID ${id} deleted successfully` });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete camera', error: error.message });
    }
};

module.exports = deleteCameraById;
