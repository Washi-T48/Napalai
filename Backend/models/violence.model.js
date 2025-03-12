import pool from "../config/db.js";

const createViolence = async (violence) => {
    const { event_id, description, violence_type, status } = violence;
    const rows = await pool.query('INSERT INTO violence (event_id, description, violence_type, status) VALUES ($1, $2, $3, $4) RETURNING *', [event_id, description, violence_type, status]);
    return rows;
};

const getAllViolences = async () => {
    const rows = await pool.query('SELECT * FROM violence');
    return rows;
};

const getViolenceById = async (id) => {
    const rows = await pool.query('SELECT * FROM violence WHERE id = $1', [id]);
    return rows;
};

const updateViolence = async (id, violence) => {
    const { event_id, description, violence_type, status } = violence;
    const rows = await pool.query('UPDATE violence SET event_id = $1, description = $2, violence_type = $3, status = $4 WHERE id = $5 RETURNING *', [event_id, description, violence_type, status, id]);
    return rows;
};

const deleteViolence = async (id) => {
    const rows = await pool.query('DELETE FROM violence WHERE id = $1 RETURNING *', [id]);
    return rows;
};

const updateViolenceImage = async (id, image) => {
    const rows = await pool.query('UPDATE event SET image = $1 WHERE event.id = (SELECT violence.event_id FROM violence WHERE violence.id = $2) RETURNING *', [image, id]);
    return rows;
}

const updateViolenceVideo = async (id, video) => {
    const rows = await pool.query('UPDATE event SET video = $1 WHERE event.id = (SELECT violence.event_id FROM violence WHERE violence.id = $2) RETURNING *', [video, id]);
    return rows;
}

export {
    createViolence,
    getAllViolences,
    getViolenceById,
    updateViolence,
    deleteViolence,
    updateViolenceImage,
    updateViolenceVideo,
};