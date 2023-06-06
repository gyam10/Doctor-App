const express = require("express");
const router = express.Router();
const {
  login,
  register,
  authController,
  applyDoctor,
  getAllNotification,
  deleteAllNotification,
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

module.exports = router;
