import express from 'express';

import {
    newForgotten,
    newViolence
} from '../models/ai.model.js';

const aiRouter = express.Router();

aiRouter.post('/forgotten', async (req, res) => {
    try {
        const forgotten = req.body;
        const newForgottenEvent = await newForgotten(forgotten);
        res.status(201).json(newForgottenEvent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

aiRouter.post('/violence', async (req, res) => {
    try {
        const violence = req.body;
        const newViolenceEvent = await newViolence(violence);
        res.status(201).json(newViolenceEvent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default aiRouter;