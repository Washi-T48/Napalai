const Camera = require('../models/Camera');  

const addCamera = async (req, res) => {
  try {
    const camera = await Camera.create(req.body);
    res.status(201).json(camera);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = addCamera;
