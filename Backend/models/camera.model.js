import pool from "../config/db.js";

const createCamera = async (camera) => {
    const { zone_id, name, location, onvif_ip, onvif_port, onvif_path, onvif_username, onvif_password, rtsp_url, rtsp_username, rtsp_password } = camera;
    const rows = await pool.query('INSERT INTO camera (zone_id, name, location, onvif_ip, onvif_port, onvif_path, onvif_username, onvif_password, rtsp_url, rtsp_username, rtsp_password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *', [zone_id, name, location, onvif_ip, onvif_port, onvif_path, onvif_username, onvif_password, rtsp_url, rtsp_username, rtsp_password]);
    return rows;
};

const getCameraById = async (id) => {
    const rows = await pool.query('SELECT * FROM camera WHERE id = $1', [id]);
    return rows;
};

const getAllCameras = async () => {
    const rows = await pool.query('SELECT * FROM camera');
    return rows;
};

const updateCamera = async (id, camera) => {
    const { zone_id, name, location, onvif_ip, onvif_port, onvif_path, onvif_username, onvif_password, rtsp_url, rtsp_username, rtsp_password } = camera;
    const rows = await pool.query('UPDATE camera SET zone_id = $1, name = $2, location = $3, onvif_ip = $4, onvif_port = $5, onvif_path = $6, onvif_username = $7, onvif_password = $8, rtsp_url = $9, rtsp_username = $10, rtsp_password = $11 WHERE id = $12 RETURNING *', [zone_id, name, location, onvif_ip, onvif_port, onvif_path, onvif_username, onvif_password, rtsp_url, rtsp_username, rtsp_password, id]);
    return rows;
};

const renameCamera = async (id, camera) => {
    const { name } = camera;
    const rows = await pool.query('UPDATE camera SET name = $1 WHERE id = $2 RETURNING id, name', [name, id]);
    return rows;
};

const deleteCamera = async (id) => {
    const rows = await pool.query('DELETE FROM camera WHERE id = $1 RETURNING *', [id]);
    return rows;
};

const getCameraByZoneID = async (zone_id) => {
    const rows = await pool.query('SELECT * FROM camera WHERE zone_id = $1', [zone_id]);
    return rows;
};

export {
    createCamera,
    getCameraById,
    getAllCameras,
    updateCamera,
    renameCamera,
    deleteCamera,
    getCameraByZoneID,
};