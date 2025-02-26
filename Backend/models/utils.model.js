import pool from "../config/db.js";

const getForgottenList = async () => {
    const rows = await pool.query('SELECT *, camera.name AS cameraName, zone.name AS zoneName, forgotten.id as forgottenID, forgotten.created as createdTime FROM forgotten LEFT JOIN event ON forgotten.event_id = event.id LEFT JOIN camera ON event.camera_id = camera.id LEFT JOIN zone ON camera.zone_id = zone.id');
    return rows;
};

const getForgottenById = async (id) => {
    const rows = await pool.query('SELECT *, camera.name AS cameraName, zone.name AS zoneName, forgotten.id as forgottenID, forgotten.created as createdTime FROM forgotten LEFT JOIN event ON forgotten.event_id = event.id LEFT JOIN camera ON event.camera_id = camera.id LEFT JOIN zone ON camera.zone_id = zone.id WHERE forgotten.id = $1', [id]);
    return rows;
};

const getViolenceList = async () => {
    const rows = await pool.query('SELECT *, camera.name AS cameraName, zone.name AS zoneName, violence.id as violenceID, violence.created as createdTime FROM violence LEFT JOIN event ON violence.event_id = event.id LEFT JOIN camera ON event.camera_id = camera.id LEFT JOIN zone ON camera.zone_id = zone.id');
    return rows;
};

const getViolenceById = async (id) => {
    const rows = await pool.query('SELECT *, camera.name AS cameraName, zone.name AS zoneName, violence.id as violenceID, violence.created as createdTime FROM violence LEFT JOIN event ON violence.event_id = event.id LEFT JOIN camera ON event.camera_id = camera.id LEFT JOIN zone ON camera.zone_id = zone.id WHERE violence.id = $1', [id]);
    return rows;
};

export {
    getForgottenList,
    getForgottenById,
    getViolenceList,
    getViolenceById
};