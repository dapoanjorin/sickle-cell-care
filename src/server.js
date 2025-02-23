const express = require('express');
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patient');
const doctorRoutes = require("./routes/doctor");
const iotRoutes = require("./routes/iot");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(passport.initialize());

// Load Passport Strategy
require('./middleware/auth');

// Database connection
const sequelize = new Sequelize(process.env.POSTGRES_URI, {
    dialect: 'postgres',
    logging: false,
});

sequelize.authenticate()
    .then(() => console.log('PostgreSQL connected with Sequelize'))
    .catch(err => console.log('Error: ' + err));

// Routes
app.use('/api/auth', authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/iot", iotRoutes);

app.get('/', (req, res) => {
    res.send('SickleCell API is running');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});