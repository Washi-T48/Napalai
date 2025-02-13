import express from "express";

import {
    createForgotten,
    getAllForgottens,
    getForgottenById,
    updateForgotten,
    deleteForgotten,
} from '../models/forgotten.model.js';

const forgottenRouter = express.Router();

forgottenRouter.get('/', async (req, res) => {
    try {
        const forgottens = await getAllForgottens();
        res.status(200).json(forgottens.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

forgottenRouter.post('/', async (req, res) => {
    try {
        const forgotten = req.body;
        const newForgotten = await createForgotten(forgotten);
        res.status(201).json(newForgotten.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

forgottenRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const forgotten = await getForgottenById(id);
        res.status(200).json(forgotten.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

forgottenRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const forgotten = req.body;
        const updatedForgotten = await updateForgotten(id, forgotten);
        res.status(200).json(updatedForgotten.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

forgottenRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedForgotten = await deleteForgotten(id);
        res.status(200).json(deletedForgotten.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default forgottenRouter;