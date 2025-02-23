const { Sequelize } = require("sequelize");
const config = require("../database/database"); // Make sure the path is correct

const sequelize = new Sequelize(config.development);

const Patient = require("./patient")(sequelize, Sequelize);
const Doctor = require("./doctor")(sequelize, Sequelize);
const Alert = require("./alert")(sequelize, Sequelize);

const db = { sequelize, Sequelize, Patient, Doctor, Alert };

sequelize.sync({ alter: true }).then(() => console.log("Database synced"));

module.exports = db;
