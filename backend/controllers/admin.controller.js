const DoctorModel = require("../models/doctor.model");
const UserModel = require("../models/user.model");

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).send({
      success: true,
      msg: "User fetched successfully",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      msg: "Error while fetching the users",
      error,
      success: false,
    });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await DoctorModel.find({});

    res.status(200).send({
      msg: "Doctors fetched Successfully.",
      success: true,
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      msg: "Error while fetching the doctor",
      success: false,
      error,
    });
  }
};

// doctor status change
const changeAccountStatus = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await DoctorModel.findByIdAndUpdate(doctorId, { status });
    const user = await UserModel.findOne({ _id: doctor.userId });

    const notification = user.notification;
    notification.push({
      type: "doctor-account-request-updated",
      msg: `Your Doctor Account Request has ${status}`,
      onClickPath: "/notification",
    });
    user.isDoctor = status === "approved" ? true : false;
    await user.save();
    res.status(200).send({
      success: true,
      msg: "Account Status Changed",
      data: doctor,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      msg: "Erroe in Changing Status",
      err,
    });
  }
};

module.exports = { getAllUsers, getAllDoctors, changeAccountStatus };
