import express from 'express';

import {
    getForgottenList,
    getForgottenById,
    getViolenceList,
    getViolenceById
} from '../models/utils.model.js';

const utilsRouter = express.Router();

utilsRouter.get('/forgotten', async (req, res) => {
    try {
        const forgottenList = await getForgottenList();
        res.status(200).json(forgottenList.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

utilsRouter.get('/forgotten/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const forgotten = await getForgottenById(id);
        res.status(200).json(forgotten.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

utilsRouter.get('/violence', async (req, res) => {
    try {
        const violenceList = await getViolenceList();
        res.status(200).json(violenceList.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

utilsRouter.get('/violence/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const violence = await getViolenceById(id);
        res.status(200).json(violence.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default utilsRouter;