const mongoose = require("mongoose");

//structure of database
const userSch = mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      // required: true,
    },
    room: {
      type: String,
    },
    fathersemail: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    contact: {
      type: String,
    },
    fatherscontact: {
      type: String,
    },
    count: {
      type: Number,
      default: 0,
    },
    address: {
      type: String,
    },
    fee: {
      type: Number,
    },
    amountpaid: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSch);

module.exports = User;
