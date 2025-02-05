import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import { testConnection } from './config/db.js';
testConnection();

import cameraRouter from './routes/camera.routes.js';
import zoneRouter from './routes/zone.routes.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.all('/', (req, res) => {
    res.sendStatus(200);
});

app.use('/cameras', cameraRouter);
app.use('/zones', zoneRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});