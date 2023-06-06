const express = require("express");
const router = express();
const auth_middleware = require("../middlewares/auth.middleware");
const {
  getDoctorInfo,
  updateProfile,
} = require("../controllers/doctor.controller");

// get doctor info
router.post("/getDoctorInfo", auth_middleware, getDoctorInfo);

// update profile
router.post("/updateProfile", auth_middleware, updateProfile);

module.exports = router;
