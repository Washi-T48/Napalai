import pool from "../config/db.js";
import { spawn } from 'child_process';

const newForgotten = async (forgotten) => {
    try {
        const { camera_id, position, image, video, item_type } = forgotten;
        const type = "forgotten";
        const result = await pool.query(
            `WITH new_event AS (INSERT INTO event (camera_id, type, position, image, video) VALUES ($1, $2, $3, $4, $5) RETURNING *)
            INSERT INTO forgotten(event_id, item_type) VALUES((SELECT id FROM new_event), $6) RETURNING *;
            `, [camera_id, type, position, image, video, item_type]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error in newForgotten:", error);
        throw error;
    }
}

const newViolence = async (violence) => {
    try {
        const { camera_id, position, image, video, violence_type } = violence;
        const type = "violence";
        const result = await pool.query(
            `WITH new_event AS (INSERT INTO event (camera_id, type, position, image, video) VALUES ($1, $2, $3, $4, $5) RETURNING *)
            INSERT INTO violence(event_id, violence_type) VALUES((SELECT id FROM new_event), $6) RETURNING *;
            `, [camera_id, type, position, image, video, violence_type]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error in newViolence:", error);
        throw error;
    }
}

const runAIScripts = (cameraId, streamUrl) => {
    try {
        const fullStreamUrl = `${streamUrl}/index.m3u8`;
        console.log(`Starting ${cameraId} : ${fullStreamUrl}`);

        const violenceDetection = spawn('python3.12', [
            '../Script/violence.py',
            fullStreamUrl,
            cameraId.toString(),
        ]);

        violenceDetection.stdout.on('data', (data) => {
            console.log(`Violence [${cameraId}]: ${data}`);
        });

        violenceDetection.stderr.on('data', (data) => {
            console.error(`Violence [${cameraId}] Err : ${data}`);
        });

        const forgottenItems = spawn('python3.12', [
            '../Script/forgotten.py',
            fullStreamUrl,
            cameraId.toString(),
        ]);

        forgottenItems.stdout.on('data', (data) => {
            console.log(`Forgotten [${cameraId}]: ${data}`);
        });

        forgottenItems.stderr.on('data', (data) => {
            console.error(`Forgotten [${cameraId}]: ${data}`);
        });
    } catch (error) {
        console.error("Error in runAIScripts:", error);
    }
};

export {
    newForgotten,
    newViolence,
    runAIScripts,
}