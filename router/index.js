var express = require("express");
var router = express.Router();

const usersRoutes = require("./user.route");
const appointmentsRoutes = require("./appointment.route");


router.use('/users', usersRoutes);
router.use('/appointments', appointmentsRoutes);

module.exports = router;
