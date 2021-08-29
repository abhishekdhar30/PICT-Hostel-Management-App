const mongoose = require("mongoose");

//structure of database
const userSchema = mongoose.Schema(
  {
    date: {
      type: String,
      default: Date.toString().substring(0, 15),
    },
    attendance:{type:Map,default:{}},
    // details:[]
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model("Attendance", userSchema);

module.exports = Attendance;
