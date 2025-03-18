import pool from "../config/db.js";

const newForgotten = async (forgotten) => {
    const { camera_id, position, image, video, item_type } = forgotten;
    const type = "forgotten";
    const result = await pool.query(
        `WITH new_event AS (INSERT INTO event (camera_id, type, position, image, video) VALUES ($1, $2, $3, $4, $5) RETURNING *)
        INSERT INTO forgotten(event_id, item_type) VALUES((SELECT id FROM new_event), $6) RETURNING *;
        `, [camera_id, type, position, image, video, item_type]
    );
    return result.rows[0];
}

const newViolence = async (violence) => {
    const { camera_id, position, image, video, violence_type } = violence;
    const type = "violence";
    const result = await pool.query(
        `WITH new_event AS (INSERT INTO event (camera_id, type, position, image, video) VALUES ($1, $2, $3, $4, $5) RETURNING *)
        INSERT INTO violence(event_id, violence_type) VALUES((SELECT id FROM new_event), $6) RETURNING *;
        `, [camera_id, type, position, image, video, violence_type]
    );
    return result.rows[0];
}

export {
    newForgotten,
    newViolence
}