const Camera = require('../models/Camera');  

const getCameraById = async (req, res) => {
    const { id } = req.params;

    try {
        const camera = await Camera.findByPk(id);
        
        if (!camera) {
            return res.status(404).json({ message: `ไม่พบกล้องที่มี ID: ${id}` });
        }

        res.status(200).json(camera);
    } catch (error) {
        res.status(500).json({
            message: 'ไม่สามารถดึงข้อมูลกล้องได้',
            error: error.message,
        });
    }
};

module.exports = getCameraById;
