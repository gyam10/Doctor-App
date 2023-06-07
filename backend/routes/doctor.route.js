const express = require("express");
const router = express();
const auth_middleware = require("../middlewares/auth.middleware");
const {
  getDoctorInfo,
  updateProfile,
  getDoctorById,
  doctorAppointment,
  updateAppointmentStatus,
} = require("../controllers/doctor.controller");

// get doctor info
router.post("/getDoctorInfo", auth_middleware, getDoctorInfo);

// update profile
router.post("/updateProfile", auth_middleware, updateProfile);

// getDoctor By id
router.post("/getDoctorById", auth_middleware, getDoctorById);

//get appointmnets doctor
router.get("/doctor-appointments", auth_middleware, doctorAppointment);

// update appointment status
router.post("/updateStatus", auth_middleware, updateAppointmentStatus);
module.exports = router;
