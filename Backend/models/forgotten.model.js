import pool from "../config/db.js";

const createForgotten = async (forgotten) => {
    const { event_id, description, item_type, item_name, status } = forgotten;
    const rows = await pool.query('INSERT INTO forgotten (event_id, description, item_type, item_name, status) VALUES ($1, $2, $3, $4, $5) RETURNING *', [event_id, description, item_type, item_name, status]);
    return rows;
};

const getAllForgottens = async () => {
    const rows = await pool.query('SELECT * FROM forgotten');
    return rows;
};

const getForgottenById = async (id) => {
    const rows = await pool.query('SELECT * FROM forgotten WHERE id = $1', [id]);
    return rows;
};

const updateForgotten = async (id, forgotten) => {
    const { event_id, description, item_type, item_name, status } = forgotten;
    const rows = await pool.query('UPDATE forgotten SET event_id = $1, description = $2, item_type = $3, item_name = $4, status = $5 WHERE id = $6 RETURNING *', [event_id, description, item_type, item_name, status, id]);
    return rows;
};

const deleteForgotten = async (id) => {
    const rows = await pool.query('DELETE FROM forgotten WHERE id = $1 RETURNING *', [id]);
    return rows;
};

export {
    createForgotten,
    getAllForgottens,
    getForgottenById,
    updateForgotten,
    deleteForgotten,
};