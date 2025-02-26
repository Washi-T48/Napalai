import express from 'express';

import {
    createViolence,
    getAllViolences,
    getViolenceById,
    updateViolence,
    deleteViolence,
} from '../models/violence.model.js';

const violenceRouter = express.Router();

violenceRouter.get('/', async (req, res) => {
    try {
        const violences = await getAllViolences();
        res.status(200).json(violences.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

violenceRouter.post('/', async (req, res) => {
    try {
        const violence = req.body;
        const newViolence = await createViolence(violence);
        res.status(201).json(newViolence.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

violenceRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const violence = await getViolenceById(id);
        res.status(200).json(violence.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

violenceRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const violence = req.body;
        const updatedViolence = await updateViolence(id, violence);
        res.status(200).json(updatedViolence.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

violenceRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedViolence = await deleteViolence(id);
        res.status(200).json(deletedViolence.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default violenceRouter;