const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formSchema = new Schema(
  {
    Expertemail: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    fromAddress: {
      type: String,
      required: true,
    },
    pinnumber: {
      type: Number,
      required: true,
    },
    person: {
      type: String,
      required: true,
    },
    luggage: {
      type: String,
      required: true,
    },
    journeyDate: {
      type: Date,
      required: true,
    },
    journeyTime: {
      type: String,
      required: true,
    },
    textarea: {
      type: String,
    },
    paymentOpt: {
      type: String,
    },
    userId: {
      type: String,
    },
    status:{
     type:String
      
    }
    
  },
  { timestamps: true }
);

const order = mongoose.model("order", formSchema);

module.exports = order;


