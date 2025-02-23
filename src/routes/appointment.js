const express = require("express");
const {authenticate} = require("../middleware/auth");
const {Appointment, Patient, Doctor} = require("../models");

const router = express.Router();

/**
 * @route GET /api/appointments
 * @desc Fetch appointments for a patient or doctor
 * @access Protected
 */
router.get("/", authenticate, async (req, res) => {
    try {
        let appointments;

        // if (req.user.role === "patient") {
        //     appointments = await Appointment.findAll({
        //         where: { patientId: req.user.id },
        //         include: [{ model: Doctor, attributes: ["id", "firstName", "lastName", "specialty"] }],
        //         order: [["appointmentDate", "ASC"]],
        //     });
        // } else if (req.user.role === "doctor") {
        //     appointments = await Appointment.findAll({
        //         where: { doctorId: req.user.id },
        //         include: [{ model: Patient, attributes: ["id", "firstName", "lastName", "email"] }],
        //         order: [["appointmentDate", "ASC"]],
        //     });
        // } else {
        //     return res.status(403).json({ message: "Unauthorized" });
        // }

        appointments = await Appointment.findAll({
            order: [["appointmentDate", "ASC"]],
        });

        res.json({appointments});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

/**
 * @route POST /api/appointments
 * @desc Create a new appointment
 * @access Protected (Patients only)
 */
router.post("/", authenticate, async (req, res) => {
    try {
        if (req.user.role !== "patient") {
            return res.status(403).json({message: "Only patients can book appointments"});
        }

        const {doctorId, appointmentDate, notes} = req.body;

        if (!doctorId || !appointmentDate) {
            return res.status(400).json({message: "Doctor ID and appointment date are required"});
        }

        const newAppointment = await Appointment.create({
            patientId: req.user.id,
            doctorId,
            appointmentDate,
            status: "Scheduled",
            notes,
        });

        res.status(201).json({message: "Appointment created successfully", appointment: newAppointment});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

/**
 * @route PUT /api/appointments/:id
 * @desc Update an appointment status
 * @access Protected (Doctors only)
 */
router.put("/:id", authenticate, async (req, res) => {
    try {
        if (req.user.role !== "doctor") {
            return res.status(403).json({message: "Only doctors can update appointment status"});
        }

        const {status} = req.body;
        const appointment = await Appointment.findByPk(req.params.id);

        if (!appointment) {
            return res.status(404).json({message: "Appointment not found"});
        }

        if (appointment.doctorId !== req.user.id) {
            return res.status(403).json({message: "Unauthorized"});
        }

        appointment.status = status || appointment.status;
        await appointment.save();

        res.json({message: "Appointment updated successfully", appointment});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

/**
 * @route DELETE /api/appointments/:id
 * @desc Cancel an appointment
 * @access Protected (Patients only)
 */
router.delete("/:id", authenticate, async (req, res) => {
    try {
        if (req.user.role !== "patient") {
            return res.status(403).json({message: "Only patients can cancel appointments"});
        }

        const appointment = await Appointment.findByPk(req.params.id);

        if (!appointment) {
            return res.status(404).json({message: "Appointment not found"});
        }

        if (appointment.patientId !== req.user.id) {
            return res.status(403).json({message: "Unauthorized"});
        }

        await appointment.destroy();
        res.json({message: "Appointment cancelled successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

module.exports = router;
