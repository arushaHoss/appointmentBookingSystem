var express = require("express");
var router = express.Router();

const { validateApiData, verifyToken } = require("../middleware/token.middleware");

const {
    bookAppointment,
    viewAppointmentDetails,
    viewAppointmentsByDoctor,
    cancelAppointment,
    modifyAppointment,
} = require("../controllers/api/appointmentController");

const {
    appointmentBookingValidate,
    appointmentModificationValidate,
    appointmentCancellationValidate,
    appointmentByPatientViewValidate,
    appointmentByDoctorViewValidate
} = require("../middleware/appointment.validator");

// Define appointment-related routes
router.post('/book', verifyToken, appointmentBookingValidate, validateApiData, bookAppointment);
router.get('/appointmentsByPatient', verifyToken, appointmentByPatientViewValidate, validateApiData, viewAppointmentDetails);
router.get('/appointmentsByDoctor/:id', verifyToken, appointmentByDoctorViewValidate, validateApiData, viewAppointmentsByDoctor);
router.delete('/cancel', verifyToken, appointmentCancellationValidate, validateApiData, cancelAppointment);
router.put('/modify', verifyToken, appointmentModificationValidate, validateApiData, modifyAppointment);

module.exports = router;
