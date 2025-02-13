import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

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

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors({ credentials: true }));

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

app.use('/public', express.static('public'));
app.use('/protected', protectedFileMiddleware, express.static('protected'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});