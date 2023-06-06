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
module.exports = { getDoctorInfo };
