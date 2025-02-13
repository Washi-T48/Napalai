import express from 'express';

import {
    createZone,
    getAllZones,
    getZoneById,
    updateZone,
    renameZone,
    deleteZone,
} from '../models/zone.model.js';

import {
    getCameraByZoneID
} from '../models/camera.model.js';

const zoneRouter = express.Router();

zoneRouter.get('/', async (req, res) => {
    try {
        const zones = await getAllZones();
        res.status(200).json(zones.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

zoneRouter.post('/', async (req, res) => {
    try {
        const zone = req.body;
        const newZone = await createZone(zone);
        res.status(201).json(newZone.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

zoneRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const zone = await getZoneById(id);
        res.status(200).json(zone.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

zoneRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const zone = req.body;
        const updatedZone = await updateZone(id, zone);
        res.status(200).json(updatedZone.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

zoneRouter.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { name } = req.body;
        const updatedZone = await renameZone(id, name);
        res.status(200).json(updatedZone.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

zoneRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedZone = await deleteZone(id);
        res.status(200).json(deletedZone.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

zoneRouter.get('/:id/cameras', async (req, res) => {
    try {
        const id = req.params.id;
        const cameras = await getCameraByZoneID(id);
        res.status(200).json(cameras.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default zoneRouter;