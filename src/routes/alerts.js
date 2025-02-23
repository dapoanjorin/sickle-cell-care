const express = require("express");
const { authenticateJWT } = require("../middleware/auth");
const { Alert } = require("../models");

const router = express.Router();

// Fetch alerts for a doctor
router.get("/", authenticateJWT, async (req, res) => {
    try {
        if (req.user.role !== "doctor") {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const alerts = await Alert.findAll({
            where: { doctorId: req.user.id, read: false },
            order: [["createdAt", "DESC"]],
        });

        res.json({ alerts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mark alert as read
router.post("/mark-read/:id", authenticateJWT, async (req, res) => {
    try {
        if (req.user.role !== "doctor") {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const alert = await Alert.findByPk(req.params.id);
        if (!alert || alert.doctorId !== req.user.id) {
            return res.status(404).json({ message: "Alert not found" });
        }

        alert.read = true;
        await alert.save();

        res.json({ message: "Alert marked as read" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
