const DoctorModel = require("../models/doctor.model");
const AppointmentModel = require("../models/appointment.model");
const UserModel = require("../models/user.model");

const getDoctorInfo = async (req, res) => {
  try {
    const doctor = await DoctorModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      msg: "Doctor Info fetched Successfully.",
      data: doctor,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Error while fetching doctor info",
      error,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const doctor = await DoctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );

    res.status(200).send({
      success: true,
      msg: "Doctor profile updated Successfully",
      data: doctor,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Doctor profile update error",
      error,
    });
  }
};
const getDoctorById = async (req, res) => {
  try {
    const doctor = await DoctorModel.findOne({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      msg: "Doctor Successfully fetched",
      data: doctor,
    });
  } catch (error) {
    res.status(500).send({
      msg: "Error fetching the doctor",
      error,
      status: false,
    });
  }
};

const doctorAppointment = async (req, res) => {
  try {
    const doctor = await DoctorModel.findOne({ userId: req.body.userId });
    const appointment = await AppointmentModel.find({
      doctorId: doctor._id,
    });
    res.status(200).send({
      success: true,
      msg: "Doctor appointment fetched successfully.",
      data: appointment,
    });
  } catch (error) {
    res.status(500).send({
      msg: "Error fetching the appointments of doctor.",
      error,
      success: false,
    });
  }
};

const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const appointment = await AppointmentModel.findByIdAndUpdate(
      appointmentId,
      { status }
    );
    const user = await UserModel.findOne({ _id: appointment.userId });
    const notification = user.notification;
    notification.push({
      type: "status-updated",
      msg: `Your appointment has beeen updated ${status}`,
      onClickPath: "/doctor-appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      msg: "Appointment updated successfully.",
    });
  } catch (err) {
    res.status(500).send({
      err,
      success: false,
      msg: "Error updating status.",
    });
  }
};

module.exports = {
  getDoctorInfo,
  updateProfile,
  getDoctorById,
  doctorAppointment,
  updateAppointmentStatus,
};
