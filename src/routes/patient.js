const express = require("express");
const { Patient } = require("../models");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

// CREATE a new patient
router.post("/", async (req, res) => {
    try {
        const patient = await Patient.create(req.body);
        res.status(201).json(patient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// READ all patients (Protected Route)
router.get("/", authenticate, async (req, res) => {
    try {
        const patients = await Patient.findAll();
        res.json(patients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// READ a single patient by ID (Protected Route)
router.get("/:id", authenticate, async (req, res) => {
    try {
        const patient = await Patient.findByPk(req.params.id);
        if (!patient) return res.status(404).json({ message: "Patient not found" });
        res.json(patient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE a patient (Protected Route)
router.put("/:id", authenticate, async (req, res) => {
    try {
        const patient = await Patient.findByPk(req.params.id);
        if (!patient) return res.status(404).json({ message: "Patient not found" });

        await patient.update(req.body);
        res.json(patient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE a patient (Protected Route)
router.delete("/:id", authenticate, async (req, res) => {
    try {
        const patient = await Patient.findByPk(req.params.id);
        if (!patient) return res.status(404).json({ message: "Patient not found" });

        await patient.destroy();
        res.json({ message: "Patient deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
