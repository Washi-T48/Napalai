import pool from "../config/db.js";

const createForgotten = async (forgotten) => {
    const { event_id, description, item_type, status } = forgotten;
    const rows = await pool.query('INSERT INTO forgotten (event_id, description, item_type, status) VALUES ($1, $2, $3, $4) RETURNING *', [event_id, description, item_type, status]);
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
    const { event_id, description, item_type, status } = forgotten;
    const rows = await pool.query('UPDATE forgotten SET event_id = $1, description = $2, item_type = $3, status = $4 WHERE id = $5 RETURNING *', [event_id, description, item_type, status, id]);
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