const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./models/index');
const passport = require('passport');
const cors = require('cors'); 
const session = require('express-session');

const authRoutes = require('./routes/AuthRoutes'); 
const initializePassport = require('./config/passport-config');
const cameraRoutes = require('./routes/CameraRoutes'); 
const forgottenRoutes = require('./routes/ForgottenItemRoute');
const zoneRoutes = require('./routes/ZoneRoutes')

const app = express();
require('dotenv').config();

// Middleware
app.use(bodyParser.json());

// ตั้งค่า CORS
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true, 
}));

// Initialize Passport
initializePassport(passport);

// ตั้งค่า Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // ใช้ false ถ้าไม่ได้ใช้ https (development environment)
    httpOnly: true,
  },
}));

app.use(passport.initialize());
app.use(passport.session());

// เส้นทาง API
app.use('/api', authRoutes);
app.use('/api', cameraRoutes);
app.use('/api', forgottenRoutes);
app.use('/api',zoneRoutes)
// Sync database and start server
sequelize.sync({ force: true }).then(() => {
  // sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
});
