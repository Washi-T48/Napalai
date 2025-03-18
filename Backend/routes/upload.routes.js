import express from 'express';
import {
    forgottenImageUpload,
    forgottenVideoUpload,
    forgottenReturnUpload,
    violenceImageUpload,
    violenceVideoUpload,
    profilePictureUpload,
} from '../models/upload.model.js';
import { updateForgottenImage, updateForgottenReturn, updateForgottenVideo } from '../models/forgotten.model.js';
import { updateViolenceImage, updateViolenceVideo } from '../models/violence.model.js';
import { updateProfilePicture } from '../models/user.model.js';

const ROOT_URL = process.env.ROOT_URL + "/";

const uploadRouter = express.Router();

uploadRouter.post('/forgotten/image', forgottenImageUpload.single('image'), async (req, res) => {
    try {
        const id = req.body.id;
        const path = ROOT_URL + req.file.path;
        updateForgottenImage(id, path);
        res.status(200).send(path);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

uploadRouter.post('/forgotten/video', forgottenVideoUpload.single('video'), async (req, res) => {
    try {
        const id = req.body.id;
        const path = ROOT_URL + req.file.path;
        updateForgottenVideo(id, path);
        res.status(200).send(path);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

uploadRouter.post('/forgotten/return', forgottenReturnUpload.single('return'), async (req, res) => {
    try {
        const id = req.body.id;
        const path = ROOT_URL + req.file.path;
        updateForgottenReturn(id, path);
        res.status(200).send(path);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

uploadRouter.post('/violence/image', violenceImageUpload.single('image'), async (req, res) => {
    try {
        const id = req.body.id;
        const path = ROOT_URL + req.file.path;
        updateViolenceImage(id, path);
        res.status(200).send(path);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

uploadRouter.post('/violence/video', violenceVideoUpload.single('video'), async (req, res) => {
    try {
        const id = req.body.id;
        const path = ROOT_URL + req.file.path;
        updateViolenceVideo(id, path);
        res.status(200).send(path);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

uploadRouter.post('/profile', profilePictureUpload.single('image'), async (req, res) => {
    try {
        const id = req.body.id;
        const path = ROOT_URL + req.file.path;
        updateProfilePicture(id, path);
        res.status(200).send(path);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default uploadRouter;