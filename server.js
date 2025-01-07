const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./models/index');
const User = require('./models/User');
const Zone = require('./models/Zone');
const Camera = require('./models/Camera');
const ViolenceDetectionEvent = require('./models/ViolenceDetectionEvent');
const ForgottenItemEvent = require('./models/ForgottenItemEvent');

const cameraRoutes = require('./routes/CameraRoutes');  // เชื่อมต่อกับ routes

const app = express();
app.use(bodyParser.json());


// Create a Violence Detection Event
app.post('/violence-events', async (req, res) => {
  try {
    const event = await ViolenceDetectionEvent.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create a Forgotten Item Event
app.post('/forgotten-item-events', async (req, res) => {
  try {
    const event = await ForgottenItemEvent.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.use('/api', cameraRoutes); 

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
});

