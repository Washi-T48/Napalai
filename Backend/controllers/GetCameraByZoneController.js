const Camera = require('../models/Camera'); 

const getCamerasByZone = async (req, res) => {
  try {
    const cameras = await Camera.findAll({ where: { zone_id: req.params.id } });
    res.json(cameras);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = getCamerasByZone;
