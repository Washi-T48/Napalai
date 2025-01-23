const Camera = require('../models/Camera'); 

const getAllCameras = async (req, res) => {
    try {
        const cameras = await Camera.findAll();
        
        if (cameras.length === 0) {
            return res.status(404).json({ message: 'ไม่มีกล้องในระบบ' });
        }
        res.status(200).json(cameras);
    } catch (error) {
        res.status(500).json({
            message: 'ไม่สามารถดึงข้อมูลกล้องได้',
            error: error.message,
        });
    }
};

module.exports = getAllCameras;
