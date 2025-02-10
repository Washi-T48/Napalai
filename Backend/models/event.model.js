import pool from "../config/db.js";

const createEvent = async (event) => {
    const { camera_id, type, position, first_detected, last_seen, warning_triggered } = event;
    const rows = await pool.query('INSERT INTO event (camera_id, type, position, first_detected, last_seen, warning_triggered) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [camera_id, type, position, first_detected, last_seen, warning_triggered]);
    return rows;
};

const getallEvents = async () => {
    const rows = await pool.query('SELECT * FROM event');
    return rows;
};

const getEventById = async (id) => {
    const rows = await pool.query('SELECT * FROM event WHERE id = $1', [id]);
    return rows;
};

const updateEvent = async (id, event) => {
    const { camera_id, type, position, first_detected, last_seen, warning_triggered } = event;
    const rows = await pool.query('UPDATE event SET camera_id = $1, type = $2, position = $3, first_detected = $4, last_seen = $5, warning_triggered = $6 WHERE id = $7 RETURNING *', [camera_id, type, position, first_detected, last_seen, warning_triggered, id]);
    return rows;
};

const deleteEvent = async (id) => {
    const rows = await pool.query('DELETE FROM event WHERE id = $1 RETURNING *', [id]);
    return rows;
};


//SPECIAL
const getEventLists = async (id) => {
    const violenceRows = await pool.query('SELECT * FROM event WHERE id = $1', [id]);
    const forgottenRows = await pool.query('SELECT * FROM event WHERE id = $1', [id]);
    return { violence: violenceRows, forgotten: forgottenRows };
};

export {
    createEvent,
    getallEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    getEventLists,
};