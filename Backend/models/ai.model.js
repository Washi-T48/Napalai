import pool from "../config/db.js";
import { spawn } from 'child_process';

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

const runAIScripts = (cameraId, streamUrl) => {
    const fullStreamUrl = `${streamUrl}/index.m3u8`;
    console.log(`Starting ${cameraId} : ${fullStreamUrl}`);

    const violenceDetection = spawn('python', [
        '../../Scripts/violence_detection.py',
        '--camera_id', cameraId.toString(),
        '--stream_url', fullStreamUrl
    ]);

    violenceDetection.stdout.on('data', (data) => {
        console.log(`Violence [${cameraId}]: ${data}`);
    });

    violenceDetection.stderr.on('data', (data) => {
        console.error(`Violence [${cameraId}] Err : ${data}`);
    });

    const forgottenItems = spawn('python', [
        '../../Scripts/forgotten_items.py',
        '--camera_id', cameraId.toString(),
        '--stream_url', fullStreamUrl
    ]);

    forgottenItems.stdout.on('data', (data) => {
        console.log(`Forgotten [${cameraId}]: ${data}`);
    });

    forgottenItems.stderr.on('data', (data) => {
        console.error(`Forgotten [${cameraId}]: ${data}`);
    });
};

export {
    newForgotten,
    newViolence,
    runAIScripts,
}