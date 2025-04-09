import axios from 'axios';
import dotenv from 'dotenv';
import { getAllCameras, updateCameraStreamURL } from './camera.model.js';
dotenv.config();

const MTX_API = process.env.MTX_API
const MTX_STREAM_PATH = process.env.MTX_STREAM_PATH
const AUTH = { username: process.env.MTX_USER, password: process.env.MTX_PASS }

const getGlobalConfig = async () => {
    const url = `${MTX_API}/config/global/get`
    const result = await axios.get(url, { auth: AUTH });
    return result.data;
};

const getAllPaths = async () => {
    const url = `${MTX_API}/paths/list`
    const result = await axios.get(url, { auth: AUTH });
    return result.data;
};

const getAllPathsItems = async () => {
    const url = `${MTX_API}/paths/list`
    const result = await axios.get(url, { auth: AUTH });
    return result.data.items;
};

const getAllPathConfig = async () => {
    const url = `${MTX_API}/config/paths/list`
    const result = await axios.get(url, { auth: AUTH });
    return result.data;
};

const getPathConfig = async (path) => {
    const url = `${MTX_API}/config/paths/get/${path}`
    const result = await axios.get(url, { auth: AUTH });
    return result.data;
};

const addPathConfig = async (path, config) => {
    const url = `${MTX_API}/config/paths/add/${path}`
    const result = await axios.post(url, config, { auth: AUTH });
    return result.data;
};

const editPathConfig = async (path, config) => {
    const url = `${MTX_API}/config/paths/patch/${path}`
    const result = await axios.patch(url, config, { auth: AUTH });
    return result.data;
};

const deletePathConfig = async (path) => {
    const url = `${MTX_API}/config/paths/delete/${path}`
    const result = await axios.delete(url, { auth: AUTH });
    return result.data;
};

const getCameraByPath = async (path) => {
    const url = `${MTX_API}/paths/get/${path}`
    const result = await axios.get(url, { auth: AUTH });
    return result.data;
};

const addAllCameraPath = async (paths) => {
    paths.forEach(async (path) => {
        try {
            await addPathConfig(
                path.name,
                {
                    "name": path.name,
                    "source": path.source
                }
            );
        } catch (error) {
            console.error(`Failed to add path config for path ${path.name}:`, error.message);
        }
    });
};

const addAllCameraFromDatabase = async () => {
    const dbCameras = (await getAllCameras()).rows;
    dbCameras.forEach(async (camera) => {
        const path = camera.id;
        if (!camera.rtsp_username || !camera.rtsp_password || !camera.rtsp_url) return;
        const complete_url = `rtsp://${camera.rtsp_username}:${camera.rtsp_password}@${camera.rtsp_url}`;
        try {
            await addPathConfig(
                path,
                {
                    "name": path,
                    "source": complete_url,
                }
            );
        } catch (error) {
            console.error(`Failed to add path config for camera ${camera.id}:`, error.message);
        }
    });
};

const updateAllCameraDBPath = async () => {
    try {
        const mtxCameras = await getAllPathsItems();
        mtxCameras.forEach(async (mtxCamera) => {
            try {
                await updateCameraStreamURL(mtxCamera.name, `${MTX_STREAM_PATH}/${mtxCamera.name}`);
            } catch (error) {
                console.error(`Failed to update camera stream URL for ${mtxCamera.name}:`, error.message);
            }
        });
    } catch (err) {
        console.log(err);
    }
};

const getCameraRecordings = async (cameraId) => {
    const url = `${MTX_API}/recordings/get/${cameraId}`;
    const result = await axios.get(url, { auth: AUTH });
    return result.data.segments.reverse();
};

const convertTimetoFileName = (timestamp) => {
    if (!timestamp || typeof timestamp !== 'string') {
        throw new Error('Invalid timestamp provided');
    }
    const [date, time] = timestamp.replace('Z', '').split('T');
    const formattedTime = time.replace(/:/g, '-').replace('.', '-');
    const filename = `${date}_${formattedTime}.mp4`;
    return filename;
};

const get2LatestRecording = (cameraId) => {
    getCameraRecordings(cameraId).then((recordings) => {
        const latestRecordings = recordings.slice(0, 2);
        const formattedRecordings = latestRecordings.map(recording => {
            return {
                filename: convertTimetoFileName(recording.start),
            };
        });
        console.log(formattedRecordings);
        return formattedRecordings;
    });
};

export {
    getGlobalConfig,
    getAllPaths,
    getAllPathConfig,
    getPathConfig,
    addPathConfig,
    editPathConfig,
    deletePathConfig,
    getCameraByPath,
    addAllCameraPath,
    addAllCameraFromDatabase,
    updateAllCameraDBPath,
    getCameraRecordings,
    convertTimetoFileName,
    get2LatestRecording,
};