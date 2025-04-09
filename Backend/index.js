import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';

import { testConnection } from './config/db.js';
testConnection();

import { authMiddleware, protectedFileMiddleware } from './middlewares/auth.middleware.js';

import cameraRouter from './routes/camera.routes.js';
import zoneRouter from './routes/zone.routes.js';
import eventRouter from './routes/event.routes.js';
import forgottenRouter from './routes/forgotten.routes.js';
import violenceRouter from './routes/violence.routes.js';
import utilsRouter from './routes/utils.routes.js';
import authRouter from './routes/auth.routes.js';
import aiRouter from './routes/ai.routes.js';
import uploadRouter from './routes/upload.routes.js';
import { addAllCameraFromDatabase, updateAllCameraDBPath } from './models/mtx.model.js';
import { runAIScripts } from './models/ai.model.js';

dotenv.config();
const PORT = process.env.PORT || 443;

const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'https://cloud.phraya.net'
    ],
    credentials: true
}));

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.socket.remoteAddress} ${req.url}`);
    next();
});

app.all('/', (req, res) => {
    res.sendStatus(200);
});

app.use('/cameras', cameraRouter);
app.use('/zones', zoneRouter);
app.use('/events', eventRouter);
app.use('/forgotten', forgottenRouter);
app.use('/violence', violenceRouter);
app.use('/utils', utilsRouter);
app.use('/auth', authRouter);
app.use('/ai', aiRouter);
app.use('/upload', uploadRouter);

app.use('/public', express.static(path.resolve('public')));
app.use('/protected', protectedFileMiddleware, express.static(path.resolve('protected')));

try {
    await addAllCameraFromDatabase();
    await updateAllCameraDBPath();
    await runAIScripts(140, "https://cloud9.phraya.net:8888/140");
} catch (err) {
    console.log("error ")
}

http.createServer(app).listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`);
});

// const options = {
//     key: fs.readFileSync(process.env.KEY_PATH),
//     cert: fs.readFileSync(process.env.CERT_PATH),
// };

// https.createServer(options, app).listen(PORT, () => {
//     console.log(`Server is running on port {PORT}`);
// });