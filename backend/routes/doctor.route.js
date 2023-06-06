const express = require("express");
const router = express();
const auth_middleware = require("../middlewares/auth.middleware");
const { getDoctorInfo } = require("../controllers/doctor.controller");

// get doctor info
router.post("/getDoctorInfo", auth_middleware, getDoctorInfo);

module.exports = router;
