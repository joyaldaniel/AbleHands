const mongoose = require("mongoose");

const expertSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    gender: {
      type: Array,
    },
    state: {
      type: Array,
    },
    experience: {
      type: String,
    },
    city: {
      type: Array,
    },
    service: {
      type: String,
    },
    description: {
      type: String,
    },
    block: {
      type: Boolean,
      default: false,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    availableDate: {
      type: Date,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
    },
    number: {
      type: Number,
    },
    address: {
      type: String,
    },
    otpExpiration: {
       type: Date
       }
  },
  { timestamps: true }
);

const expertmodel = mongoose.model("Experts", expertSchema);
module.exports = expertmodel;
