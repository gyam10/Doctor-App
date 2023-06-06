const express = require("express");
const router = express();
const auth_middleware = require("../middlewares/auth.middleware");
const {
  getAllUsers,
  getAllDoctors,
  changeAccountStatus,
} = require("../controllers/admin.controller");
// get users
router.get("/getAllUsers", auth_middleware, getAllUsers);

// get doctors
router.get("/getAllDoctors", auth_middleware, getAllDoctors);

// account status change
router.post("/changeAccountStatus", auth_middleware, changeAccountStatus);

module.exports = router;
