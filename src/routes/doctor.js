const express = require("express");
const { Doctor } = require("../models");
const { authenticate} = require("../middleware/auth");

const router = express.Router();

// CREATE a new doctor
router.post("/", async (req, res) => {
    try {
        const doctor = await Doctor.create(req.body);
        res.status(201).json(doctor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// READ all doctors (Protected Route)
router.get("/", authenticate, async (req, res) => {
    try {
        const doctors = await Doctor.findAll();
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// READ a single doctor by ID (Protected Route)
router.get("/:id", authenticate, async (req, res) => {
    try {
        const doctor = await Doctor.findByPk(req.params.id);
        if (!doctor) return res.status(404).json({ message: "Doctor not found" });
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE a doctor (Protected Route)
router.put("/:id", authenticate, async (req, res) => {
    try {
        const doctor = await Doctor.findByPk(req.params.id);
        if (!doctor) return res.status(404).json({ message: "Doctor not found" });

        await doctor.update(req.body);
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE a doctor (Protected Route)
router.delete("/:id", authenticate, async (req, res) => {
    try {
        const doctor = await Doctor.findByPk(req.params.id);
        if (!doctor) return res.status(404).json({ message: "Doctor not found" });

        await doctor.destroy();
        res.json({ message: "Doctor deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
