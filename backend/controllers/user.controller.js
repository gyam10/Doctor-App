const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const DoctorModel = require("../models/doctor.model");

const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({ msg: "User Not Found", success: false });
    }
    const passwordCheck = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordCheck) {
      return res
        .status(200)
        .send({ msg: "Invalid Email or Password", success: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ msg: "Login Successfull", success: true, token });
  } catch (err) {
    res.status(500).send({ msg: "Error in login controller" });
  }
};

const register = async (req, res, next) => {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ msg: "User already exist ", success: false });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10); //no 10 determines the no of time required to hash
    const hashPassword = await bcrypt.hash(password, salt);
    req.body.password = hashPassword;
    const newUser = new UserModel(req.body);
    await newUser.save();
    res.status(201).send({ msg: "Registered successfully", success: true });
  } catch (err) {
    res.status(500).send({ success: false, msg: `Register failed ${err.msg}` });
  }
};

const authController = async (req, res) => {
  try {
    const user = await UserModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      res.status(200).send({
        msg: "User Not Found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (err) {
    console.log(err);

    res.status(500).send({
      msg: "Auth error",
      success: false,
      err,
    });
  }
};

const applyDoctor = async (req, res) => {
  try {
    const newDoctor = await DoctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await UserModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-doctor-request",
      msg: `${newDoctor.firstName} ${newDoctor.lastName} has applied for doctor account.`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/doctors",
      },
    });

    await UserModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      msg: "Doctor Account Applied Successfully.",
    });
  } catch (error) {
    res.status(500).send({
      msg: "Error applying doctor",
      status: false,
      error,
    });
  }
};

const getAllNotification = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.body.userId });
    const seeNotification = user.seeNotification;
    const notification = user.notification;
    seeNotification.push(...notification);
    user.notification = [];
    user.seeNotification = notification;
    const updateUser = await user.save();
    res.status(200).send({
      success: true,
      msg: "All notification marked read",
      data: updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      msg: "Error in notificaiton",
      success: true,
      error,
    });
  }
};

const deleteAllNotification = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seeNotification = [];
    const updateUser = await user.save();
    updateUser.password = undefined;
    res.status(200).send({
      success: true,
      msg: "Notification Deleted Successfully",
      data: updateUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      msg: "Unable to delete the notification",
      success: false,
      err,
    });
  }
};

module.exports = {
  login,
  register,
  authController,
  applyDoctor,
  getAllNotification,
  deleteAllNotification,
};
