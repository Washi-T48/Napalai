import express from 'express';

import {
    createCamera,
    getCameraById,
    getAllCameras,
    updateCamera,
    deleteCamera
} from '../models/camera.model.js';

const cameraRouter = express.Router();

cameraRouter.get('/', async (req, res) => {
    try {
        const cameras = await getAllCameras();
        res.status(200).json(cameras.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

cameraRouter.post('/', async (req, res) => {
    try {
        const camera = req.body;
        const newCamera = await createCamera(camera);
        res.status(201).json(newCamera.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

cameraRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const camera = await getCameraById(id);
        res.status(200).json(camera.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

cameraRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const camera = req.body;
        const updatedCamera = await updateCamera(id, camera);
        res.status(200).json(updatedCamera.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

cameraRouter.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const camera = req.body;
        const updatedCamera = await renameCamera(id, camera);
        res.status(200).json(updatedCamera.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

cameraRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCamera = await deleteCamera(id);
        res.status(200).json(deletedCamera.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default cameraRouter;