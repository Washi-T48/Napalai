import express from "express";

import {
    createEvent,
    getallEvents,
    getEventById,
    updateEvent,
    deleteEvent,
} from "../models/event.model.js";

const eventRouter = express.Router();

eventRouter.get('/', async (req, res) => {
    try {
        const events = await getallEvents();
        res.status(200).json(events.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

eventRouter.post('/', async (req, res) => {
    try {
        const event = req.body;
        const newEvent = await createEvent(event);
        res.status(201).json(newEvent.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

eventRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const event = await getEventById(id);
        res.status(200).json(event.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

eventRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const event = req.body;
        const updatedEvent = await updateEvent(id, event);
        res.status(200).json(updatedEvent.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

eventRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedEvent = await deleteEvent(id);
        res.status(200).json(deletedEvent.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

eventRouter.get('/:id/lists', async (req, res) => {
    try {
        const id = req.params.id;
        const events = await getEventLists(id);
        res.status(200).json(events.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default eventRouter;