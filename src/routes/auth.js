const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const { Patient, Doctor } = require("../models");
const { generateToken } = require("../middleware/auth");
require("dotenv").config();

const router = express.Router();

// Patient & Doctor Login
router.post(
    "/login",
    [
        body("email").isEmail(),
        body("password").isLength({ min: 6 }),
        body("role").isIn(["patient", "doctor"]),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password, role } = req.body;
        let user;

        try {
            if (role === "patient") {
                user = await Patient.findOne({ where: { email } });
            } else {
                user = await Doctor.findOne({ where: { email } });
            }

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            const token = generateToken(user);
            return res.json({ token, user });
        } catch (error) {
            return res.status(500).json({ message: "Server error" });
        }
    }
);

// Patient Registration
router.post(
    "/register/patient",
    [
        body("firstName").notEmpty(),
        body("lastName").notEmpty(),
        body("email").isEmail(),
        body("password").isLength({ min: 6 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { firstName, lastName, email, password, gender } = req.body;

        try {
            let patient = await Patient.findOne({ where: { email } });
            if (patient) {
                return res.status(400).json({ message: "Email already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            patient = await Patient.create({ firstName, lastName, email, password: hashedPassword, gender });

            const token = generateToken(patient);
            return res.status(201).json({ token, patient });
        } catch (error) {
            return res.status(500).json({ message: "Server error" });
        }
    }
);

// Doctor Registration
router.post(
    "/register/doctor",
    [
        body("firstName").notEmpty(),
        body("lastName").notEmpty(),
        body("email").isEmail(),
        body("password").isLength({ min: 6 }),
        body("specialty").notEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { firstName, lastName, email, password, specialty } = req.body;

        try {
            let doctor = await Doctor.findOne({ where: { email } });
            if (doctor) {
                return res.status(400).json({ message: "Email already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            doctor = await Doctor.create({ firstName, lastName, email, password: hashedPassword, specialty });

            const token = generateToken(doctor);
            return res.status(201).json({ token, doctor });
        } catch (error) {
            return res.status(500).json({ message: "Server error" });
        }
    }
);

module.exports = router;
