const db = require('../../model');
const Appointments = db.appointments;
const Users = db.users;

const bookAppointment = async (req, res) => {
    try {
        const { firstName, lastName, email, doctorId, timeSlot } = req.body;

        const patient = await Users.findOne({ where: { email, userRole: 'patient' } });

        if (!patient) {
            return res.status(400).send({
                success: false,
                message: "Patient Not found",
                data: [],
            });
        }

        const doctor = await Users.findOne({ where: { id: doctorId, userRole: 'doctor' } });

        if (!doctor) {
            return res.status(400).send({
                success: false,
                message: "Doctor Not found",
                data: [],
            });
        }

        // Check if the time slot is already booked
        const existingAppointment = await Appointments.findOne({
            where: {
                doctorId,
                timeSlot, 
            },
        });

        if (existingAppointment) {
            return res.status(400).send({
                success: false,
                message: "Time slot already booked for this doctor on the selected date",
                data: [],
            });
        }

        // Create new appointment
        const appointment = await Appointments.create({ patientId: patient.id, doctorId, timeSlot });

        const appointmentDetails = await Appointments.findOne({
            where: { id: appointment.id },
            include: [
                {
                    model: Users,
                    as: 'Patient',
                    attributes: ['firstName', 'lastName', 'email'], // Only include relevant fields
                },
                {
                    model: Users,
                    as: 'Doctor',
                    attributes: ['firstName', 'lastName', 'email'], // Only include relevant fields
                },
            ],
        });

        res.status(201).send({
            success: true,
            message: "Appointment booked successfully",
            data: appointmentDetails,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

const viewAppointmentDetails = async (req, res) => {
    try {
        const { email } = req.body;

        // Fetch patient details
        const patient = await Users.findOne({ where: { email } });
        if (!patient) {
            return res.status(404).send({
                success: false,
                message: "Patient not found",
                data: [],
            });
        }

        // Fetch appointment details
        const appointments = await Appointments.findAll({
            where: { patientId: patient.id },
            include: [
                { model: Users, as: 'Doctor', attributes: ['firstName', 'lastName', 'email'] },
                {model: Users, as: 'Patient', attributes: ['firstName', 'lastName', 'email'] },
            ],
        });

        res.status(200).send({
            success: true,
            data: appointments,
            message: "Appointments fetched successfully",
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

const viewAppointmentsByDoctor = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch patient details
        const doctor = await Users.findOne({ where: { id } });
        if (!doctor) {
            return res.status(404).send({
                success: false,
                message: "Doctor not found",
                data: [],
            });
        }

        // Fetch appointments for the doctor
        const appointments = await Appointments.findAll({
            where: { doctorId: id },
            include: [
                { model: Users, as: 'Patient', attributes: ['firstName', 'lastName', 'email'] },
            ],
        });

        res.status(200).send({
            success: true,
            data: appointments,
            message: "Appointments fetched successfully",
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

const cancelAppointment = async (req, res) => {
    try {
        const { email, timeSlot } = req.body;

        // Fetch patient details
        const patient = await Users.findOne({ where: { email } });
        if (!patient) {
            return res.status(404).send({
                success: false,
                message: "Patient not found",
                data: [],
            });
        }

        // Cancel appointment
        const sss = await Appointments.findOne({ where: { patientId: patient.id }});
        const result = await Appointments.destroy({ where: { patientId: patient.id, timeSlot } });

        if (!result) {
            return res.status(404).send({
                success: false,
                message: "Appointment not found",
                data: [],
            });
        }

        res.status(200).send({
            success: true,
            message: "Appointment cancelled successfully",
            data: [],
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

const modifyAppointment = async (req, res) => {
    try {
        const { email, originalTimeSlot, newTimeSlot, doctorId } = req.body;

        const patient = await Users.findOne({ where: { email } });
        if (!patient) {
            return res.status(404).send({
                success: false,
                message: "Patient not found",
                data: [],
            });
        }

        // Check if the new time slot is already booked
        const existingAppointment = await Appointments.findOne({
            where: { timeSlot: newTimeSlot, doctorId },
        });

        if (existingAppointment) {
            return res.status(400).send({
                success: false,
                message: "New time slot already booked",
                data: [],
            });
        }

        // Update appointment
        const result = await Appointments.update(
            { timeSlot: newTimeSlot },
            { where: { patientId: patient.id, timeSlot: originalTimeSlot, doctorId } }
        );

        if (!result[0]) {
            return res.status(404).send({
                success: false,
                message: "Appointment not found",
                data: [],
            });
        }

        const updatedAppointment = await Appointments.findOne({
            where: { patientId: patient.id, timeSlot: newTimeSlot, doctorId },
            include: [
                { model: Users, as: 'Patient', attributes: ['firstName', 'lastName', 'email'] },
            ],
        });

        res.status(200).send({
            success: true,
            data: updatedAppointment,
            message: "Appointments updated successfully",
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

module.exports = {
    bookAppointment,
    viewAppointmentDetails,
    viewAppointmentsByDoctor,
    cancelAppointment,
    modifyAppointment,
};
