import pool from "../config/db.js";

const createZone = async (zone) => {
    const { name, location } = zone;
    const rows = await pool.query('INSERT INTO zone (name, location) VALUES ($1, $2) RETURNING *', [name, location]);
    return rows;
};

const getAllZones = async () => {
    const rows = await pool.query('SELECT * FROM zone');
    return rows;
};

const getZoneById = async (id) => {
    const rows = await pool.query('SELECT * FROM zone WHERE id = $1', [id]);
    return rows;
};

const updateZone = async (zone) => {
    const { name, location } = zone;
    const rows = await pool.query('UPDATE zone SET name = $1, location = $2 WHERE id = $3 RETURNING *', [name, location]);
    return rows;
};

const renameZone = async (id, name) => {
    const rows = await pool.query('UPDATE zone SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
    return rows;
};

const deleteZone = async (id) => {
    const rows = await pool.query('DELETE FROM zone WHERE id = $1 RETURNING *', [id]);
    return rows;
};

export {
    createZone,
    getAllZones,
    getZoneById,
    updateZone,
    renameZone,
    deleteZone,
};