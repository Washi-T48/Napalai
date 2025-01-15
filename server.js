const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./models/index');
const passport = require('passport');

const authRoutes = require('./routes/AuthRoutes'); // ตรวจสอบว่าเส้นทางถูกต้อง
const initializePassport = require('./config/passport-config');

const cameraRoutes = require('./routes/CameraRoutes');  // เชื่อมต่อกับ routes
const forgottenRoutes = require('./routes/ForgottenItemRoute')

const app = express();
app.use(bodyParser.json());
// Initialize Passport
initializePassport(passport);

require('dotenv').config();
// Middleware
app.use(express.json());
const session = require('express-session');
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes);
app.use('/api', cameraRoutes); 
app.use('/api', forgottenRoutes);

// Sync database and start server
sequelize.sync({ force: true }).then(() => {
//sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
});

