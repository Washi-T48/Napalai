import express from 'express';
import {
    forgottenImageUpload,
    // forgottenVideoUpload,
    forgottenReturnUpload,
    violenceImageUpload,
    // violenceVideoUpload,
    profilePictureUpload,
} from '../models/upload.model.js';
import { updateForgottenImage, updateForgottenReturn, updateForgottenVideo } from '../models/forgotten.model.js';
import { updateViolenceImage, updateViolenceVideo } from '../models/violence.model.js';
import { updateProfilePicture } from '../models/user.model.js';
import { getLatestRecording } from '../models/mtx.model.js';
import { getEventById } from '../models/event.model.js';

const ROOT_URL = process.env.ROOT_URL + "/";

const uploadRouter = express.Router();

uploadRouter.post('/forgotten/image', forgottenImageUpload.single('file'), async (req, res) => {
    try {
        const id = req.body.id;
        const path = ROOT_URL + req.file.path;
        const event_id = ((await updateForgottenImage(id, path)).rows[0].id);
        const videoPath = (await getLatestRecording((await getEventById(event_id)).rows[0].camera_id))
        await updateForgottenVideo(id, videoPath);
        res.status(200).send((path + videoPath));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// uploadRouter.post('/forgotten/video', forgottenVideoUpload.single('file'), async (req, res) => {
//     try {
//         const id = req.body.id;
//         const path = ROOT_URL + req.file.path;
//         updateForgottenVideo(id, path);
//         res.status(200).send(path);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

uploadRouter.post('/forgotten/return', forgottenReturnUpload.single('file'), async (req, res) => {
    try {
        const id = req.body.id;
        const path = ROOT_URL + req.file.path;
        updateForgottenReturn(id, path);
        res.status(200).send(path);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

uploadRouter.post('/violence/image', violenceImageUpload.single('file'), async (req, res) => {
    try {
        const id = req.body.id;
        const path = ROOT_URL + req.file.path;
        const event_id = ((await updateViolenceImage(id, path)).rows[0].id);
        const videoPath = (await getLatestRecording((await getEventById(event_id)).rows[0].camera_id))
        await updateViolenceVideo(id, videoPath);
        res.status(200).send((path + videoPath));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// uploadRouter.post('/violence/video', violenceVideoUpload.single('file'), async (req, res) => {
//     try {
//         const id = req.body.id;
//         const path = ROOT_URL + req.file.path;
//         updateViolenceVideo(id, path);
//         res.status(200).send(path);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

uploadRouter.post('/profile', profilePictureUpload.single('file'), async (req, res) => {
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