const Camera = require('../models/Camera');

const editCameraById = async (req, res) => {
    const { id } = req.params;
    const { name, url, location, onvifuser, onvifpass, status, zone_id } = req.body;

    try {
        // ค้นหา Camera ด้วย ID
        const camera = await Camera.findByPk(id);
        if (!camera) {
            return res.status(404).json({ message: 'Camera not found' });
        }

        // อัปเดต property ที่มีอยู่ใน req.body
        camera.name = name || camera.name;
        camera.url = url || camera.url;
        camera.location = location || camera.location;
        camera.onvifuser = onvifuser || camera.onvifuser;
        camera.onvifpass = onvifpass || camera.onvifpass;
        camera.status = status || camera.status;
        camera.zone_id = zone_id || camera.zone_id;

        // บันทึกการเปลี่ยนแปลงลงในฐานข้อมูล
        await camera.save();

        res.status(200).json({
            message: `Camera with ID ${id} updated successfully`,
            camera,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to update camera',
            error: error.message,
        });
    }
};

module.exports = editCameraById;
