const { body, param } = require("express-validator");

const appointmentBookingValidate = [
    body("firstName")
        .isString()
        .exists({ checkFalsy: true })
        .withMessage("User first name Required"),
    body("lastName")
        .isString()
        .exists({ checkFalsy: true })
        .withMessage("User lastName name Required"),
    body("email")
        .exists({ checkFalsy: true })
        .withMessage("User email Required")
        .isEmail()
        .withMessage("Please provide valid email id"),
    body("doctorId")
        .exists({ checkFalsy: true })
        .withMessage("Doctor ID is required"),
    body("timeSlot")
        .exists({ checkFalsy: true })
        .matches(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z) - (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)$/)
        .withMessage("Appointment time must be in the format 'YYYY-MM-DDTHH:mm:ss.sssZ - YYYY-MM-DDTHH:mm:ss.sssZ' (e.g., '2024-11-21T10:00:00.000Z - 2024-11-21T11:00:00.000Z')")

];

const appointmentByPatientViewValidate = [
    body("email")
        .exists({ checkFalsy: true })
        .withMessage("User email Required")
        .isEmail()
        .withMessage("Please provide valid email id"),
];

const appointmentCancellationValidate = [
    body("email")
        .exists({ checkFalsy: true })
        .withMessage("User email Required")
        .isEmail()
        .withMessage("Please provide valid email id"),
    body("timeSlot")
        .exists({ checkFalsy: true })
        .matches(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z) - (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)$/)
        .withMessage("Appointment time must be in the format 'YYYY-MM-DDTHH:mm:ss.sssZ - YYYY-MM-DDTHH:mm:ss.sssZ' (e.g., '2024-11-21T10:00:00.000Z - 2024-11-21T11:00:00.000Z')")
];

const appointmentModificationValidate = [
    body("email")
        .exists({ checkFalsy: true })
        .withMessage("User email Required")
        .isEmail()
        .withMessage("Please provide valid email id"),
    body("originalTimeSlot")
        .exists({ checkFalsy: true })
        .withMessage("Original time slot is required"),
    body("newTimeSlot")
        .exists({ checkFalsy: true })
        .withMessage("New time slot is required"),
    body("doctorId")
        .exists({ checkFalsy: true })
        .withMessage("Doctor ID is required"),
];

const appointmentByDoctorViewValidate = [
    param('id')
        .isInt({ min: 1 }).withMessage('ID must be a positive integer.'),
];

module.exports = {
    appointmentBookingValidate,
    appointmentCancellationValidate,
    appointmentModificationValidate,
    appointmentByPatientViewValidate,
    appointmentByDoctorViewValidate
};
