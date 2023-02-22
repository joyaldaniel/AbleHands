const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const otpSchema = new Schema(
  {
    number: {
      type: Number,
      require: true,
    },
    otp: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Otp = mongoose.model("otp", otpSchema);
module.exports = Otp;
