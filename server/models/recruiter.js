const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const recruiterSchema = mongoose.Schema(
  {
    userId: { type: String, default: () => uuidv4(), unique: true },
    name: { type: String, required: true },
    contactNumber: {
      type: String,
      validate: function (v) {
        return v !== "" ? /\+\d{1,3}\d{10}/.test(v) : true;
      },
      msg: "Contact Number is invalid",
    },
    bio: String,
  },
  {
    collation: { locale: "en" },
  }
);

module.exports = mongoose.model("Recruiter", recruiterSchema);
