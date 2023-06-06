const DoctorModel = require("../models/doctor.model");

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

module.exports = { getDoctorInfo, updateProfile };
