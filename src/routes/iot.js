const express = require("express");
const { authenticate } = require("../middleware/auth");
const { Alert, Doctor } = require("../models");

const router = express.Router();

// Define thresholds for alert generation
const THRESHOLDS = {
    heartRate: { min: 60, max: 100 },
    oxygenLevel: { min: 95, max: 100 },
    temperature: { min: 36.0, max: 37.5 },
};

// Function to classify alert severity
const getAlertSeverity = (metric, value) => {
    if (metric === "heartRate") {
        if (value < 50 || value > 120) return "Critical";
        if (value < 60 || value > 100) return "Warning";
    }
    if (metric === "oxygenLevel") {
        if (value < 85) return "Critical";
        if (value < 95) return "Warning";
    }
    if (metric === "temperature") {
        if (value < 35.0 || value > 39.0) return "Critical";
        if (value < 36.0 || value > 37.5) return "Warning";
    }
    return "Normal";
};

// Function to check abnormalities
const checkAbnormalities = (data) => {
    const alerts = [];

    Object.keys(THRESHOLDS).forEach((metric) => {
        const value = data[metric];
        const severity = getAlertSeverity(metric, value);
        if (severity !== "Normal") {
            alerts.push({
                alertType: metric,
                alertSeverity: severity,
                alertMessage: `Abnormal ${metric}: ${value}`,
            });
        }
    });

    return alerts;
};

// Simulate IoT data
const generateIoTData = () => ({
    heartRate: Math.floor(Math.random() * (130 - 40) + 40), // Random between 40-130
    oxygenLevel: Math.floor(Math.random() * (100 - 80) + 80), // Random between 80-100
    temperature: (Math.random() * (40 - 34) + 34).toFixed(1), // Random between 34-40
});

// Endpoint to simulate IoT data
router.get("/simulate", authenticate, async (req, res) => {
    try {
        if (req.user.role !== "patient") {
            return res.status(403).json({ message: "Only patients can submit IoT data" });
        }

        const simulatedData = { patientId: req.user.id, ...generateIoTData() };

        // Send data to FHIR
        // const fhirResponse = await sendToFHIR(simulatedData);

        // Check for abnormalities
        const alerts = checkAbnormalities(simulatedData);
        if (alerts.length > 0) {
            const doctor = await Doctor.findOne(); // Assign to any available doctor
            if (doctor) {
                for (const alert of alerts) {
                    await Alert.create({
                        patientId: req.user.id,
                        doctorId: doctor.id,
                        alertTime: new Date(),
                        alertType: alert.alertType,
                        alertSeverity: alert.alertSeverity,
                        alertMessage: alert.alertMessage,
                        acknowledged: false,
                    });
                }
            }
        }

        res.json({ simulatedData, alerts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
