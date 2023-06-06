const express = require("express");
const router = express.Router();
const {
  login,
  register,
  authController,
  applyDoctor,
  getAllNotification,
  deleteAllNotification,
  getAllDoctors,
  bookAppointment,
  bookAvailability,
  userAppointment,
} = require("../controllers/user.controller");
const auth_middleware = require("../middlewares/auth.middleware");
// routes
// login route
router.post("/login", login);
// register route
router.post("/register", register);

// Auth
router.post("/getUserData", auth_middleware, authController);

// apply doctor
router.post("/apply-doctor", auth_middleware, applyDoctor);

// notification
router.post("/get-all-notification", auth_middleware, getAllNotification);
router.post("/delete-all-notification", auth_middleware, deleteAllNotification);

// getallDoctors
router.post("/getAllDoctors", auth_middleware, getAllDoctors);

// Appointment Booking
router.post("/book-appointment", auth_middleware, bookAppointment);

// booking available
router.post("/book-available", auth_middleware, bookAvailability);

// Appointmnet list
router.get("/user-appointment", auth_middleware, userAppointment);

module.exports = router;
