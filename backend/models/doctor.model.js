const mongoose = require("mongoose");
const DoctorSchemaDef = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "first name is required"],
    },
    lastName: {
      type: String,
      required: [true, "last  name is required"],
    },
    phone: {
      type: String,
      required: [true, "phone number is requied"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    website: String,
    address: {
      type: String,
      required: [true, "address is required"],
    },
    specialization: {
      type: String,
      required: [true, "Specialization is required"],
    },
    experience: {
      type: String,
      required: [true, "Experience is required"],
    },
    feesPerConsultation: {
      type: Number,
      required: [true, "fees is required"],
    },
    status: {
      type: String,
      default: "pending",
    },
    timings: {
      type: Object,
      required: [true, "Work timing is required"],
    },
  },
  {
    timestamps: true,
  }
);

const DoctorModel = mongoose.model("Doctor", DoctorSchemaDef);
module.exports = DoctorModel;
